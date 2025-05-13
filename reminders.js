// variable declarations
let selectedBottle = 0;
let waterAmount = 0;
let targetAmount = 3000;
let totalWaterIntake = 0;
var currentTime, reminderTime, lastTime, timer = 0;

window.onload = function() {  // for home page
    // get current water amount from local storage
    waterAmount = localStorage.getItem("waterAmount");
    if (waterAmount == null || isNaN(waterAmount)) {
        waterAmount = 0;
    }
    // get target water amount from local storage
    targetAmount = localStorage.getItem("targetAmount");
    if (targetAmount == null || isNaN(targetAmount)) {
        targetAmount = 3000;
    }
    // get total water intake from local storage
    totalWaterIntake = localStorage.getItem("totalWaterIntake");
    if (totalWaterIntake == null || isNaN(totalWaterIntake)) {
        totalWaterIntake = 0;
    }
    changeWaterLevel(waterAmount);
};

// timer function runs every 100 milliseconds
setInterval(function() {
     // get time since last reminder from local storage
    lastTime = localStorage.getItem("lastTime");
    reminderTime = localStorage.getItem("reminderTime");
    if (lastTime == null || isNaN(lastTime)) {
        lastTime = new Date().getTime();
    }
    if (reminderTime == null || isNaN(reminderTime)) {
        reminderTime = 0;
    }
    if (timer != 0 || timer != null) {
        currentTime = new Date().getTime();
        timer = Math.floor((reminderTime - (currentTime - lastTime)) / 1000);
        if (reminderTime > 0 && timer <= 0) {
            document.getElementById("timer-text").style.color = "red";
        }
    }
    if (timer < 0) {
        timer = 0;
    }
    let hr = Math.floor(timer / 3600);
    let min = Math.floor(timer / 60) % 60;
    let sec = timer % 60;
    document.getElementById("timer-text").innerHTML = (hr < 10 ? "0" : "") + hr + ":" + 
        (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}, 100);

function setReminder() {
    reminderTime = parseInt(document.getElementById("reminder-time-input").value) * 60000;
    if (reminderTime < 0) {
        reminderTime = 0;
    }
    document.getElementById("timer-text").style.color = "black";
    localStorage.setItem("lastTime", currentTime);
    localStorage.setItem("reminderTime", reminderTime);
}

function changeWaterLevel(newAmount) {
    waterAmount = newAmount;
    document.getElementById("water").style.height = Math.min(65, (waterAmount / targetAmount * 65)) + "vh";
    document.getElementById("wave").style.top = Math.max(0, ((0.65 - (0.65 * waterAmount / targetAmount)) * 100)) + "vh";
}

function toggleReminder() {
    const img = document.getElementById("reminder-toggle");

    if (img.src.includes("button_on.svg")) {
        img.src = "images/button_off.svg";
    } else {
        img.src = "images/button_on.svg";
    }
}
