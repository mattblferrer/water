#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include "HX711.h"

// wi-fi credentials
const char* ssid = "";
const char* password = "";

const char* serverURL = "";

// calibration values
#define calibration -394.63 // load sensor calibration
#define water_difference 10 // 10 grams

// HX711 circuit wiring
const int loadcell_dout_pin = 4;
const int loadcell_sck_pin = 2;

// tact button wiring
#define wakeup_pin GPIO_NUM_33
const int button_power = 12;
const int button_gnd = 13;

// timing variables
long time_start;
#define time_cap 10000 // 10,000 ms

HX711 scale;

void setup() {

  // initialize serial communication
  Serial.begin(115200);
  
  // connecting to wi-fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println ("\nWiFi connected.");

  // initialize scale
  scale.begin(loadcell_dout_pin, loadcell_sck_pin);
  if (!scale.is_ready()) {
    Serial.println("HX711 not ready.");
  } else {
    Serial.println("HX711 ready.");

    scale.set_scale(calibration); // set calibration factor of the load cell
    scale.tare(); // reset to zero

    // getting initial weight
    long start_weight = scale.get_units(10);
    Serial.print("Initial weight: ");
    Serial.print(start_weight);
    Serial.println(" grams");

    float new_weight;
    int stable_count = 0;
    bool has_dropped = true;

    Serial.println("Waiting for weight to decrease...");
    time_start = millis(); // start timer

    // waiting for weight to lower for 10 s
    while (true) {
      
      delay(500);
      new_weight = scale.get_units(5);

      // testing purposes
      Serial.print("New weight: ");
      Serial.print(new_weight);
      Serial.println(" grams");
      
      // check if new weight has dropped significantly
      if (new_weight < start_weight - water_difference) {
        stable_count++;
      } else {
        stable_count = 0; // reset if unstable
      }

      if (stable_count >= 5) {
        stable_count = 0; 
        break; // weight lowered
      }

      if (millis() - time_start > time_cap) {
        has_dropped = false; 
        break;
      }

    }

    float last_weight = new_weight;
    
    // if user drank
    if (has_dropped) {
      
      // waiting for new lower weight to stabilize
      while (true) {
        
        new_weight = scale.get_units(5);
        if (abs(new_weight - last_weight) < 3 ) stable_count++; // 3 gram allowance
        else stable_count = 0;

        if (stable_count >= 10) break;

        last_weight = new_weight;
        delay(500);

      }

      float final_weight = abs(start_weight - new_weight);

      Serial.print("User drank ");
      Serial.print(final_weight);
      Serial.println(" mL of water.");

      WiFiClientSecure client;
      client.setInsecure();

      if (WiFi.status() == WL_CONNECTED) {
        HTTPClient https;
        https.begin(client, serverURL);
        https.addHeader("Content-Type", "application/json");

        String payload = "{\"weight\": " + String(final_weight, 2) + "}";
        int httpResponseCode = https.POST(payload);

        Serial.print("Payload: ");
        Serial.println(payload);

        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);

        if (httpResponseCode <= 0) {
          Serial.print("HTTP Error: ");
          Serial.println(https.errorToString(httpResponseCode));
        }

        https.end();
        
      } else {
        Serial.println("WiFi not connected!");
      }

    } else {
      Serial.println("User did not drink...");
    }
    
  }
  
  pinMode(wakeup_pin, INPUT_PULLUP);
  pinMode(button_power, OUTPUT);

  digitalWrite(button_power, HIGH);
  digitalWrite(button_gnd, LOW);
  esp_sleep_enable_ext0_wakeup(wakeup_pin, 0); // wakes up ESP32 on LOW

  Serial.println("Entering sleep mode...");
  delay(1000);
  esp_deep_sleep_start();

}

void loop() {

}
