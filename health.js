/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// variable declarations
let waterAmount = 0;
let targetAmount = 3000;
let waterIntakeHistory = {};

window.onload = function() {  // for health page
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

    // get water intake history from local storage
    waterIntakeHistory = localStorage.getItem("waterIntakeHistory");
    if (waterIntakeHistory == null) {
        waterIntakeHistory = {};
    } 
    else {
        waterIntakeHistory = JSON.parse(waterIntakeHistory);
    }
    displayWaterIntakeHistory();
    changeWaterLevel(waterAmount);
}

function displayWaterIntakeHistory() {
    let historyContainer = document.getElementById("water-intake-history");
    historyContainer.innerHTML = ""; // Clear previous history

    for (let time in waterIntakeHistory) {
        let amount = waterIntakeHistory[time];
        let date = new Date(parseInt(time));
        let hours = date.getHours();
        let minutes = date.getMinutes();   
        let seconds = date.getSeconds();
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        let historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerHTML = `${formattedTime}, Amount: ${amount} ml`;
        historyContainer.appendChild(historyItem);
    }
}

function changeWaterLevel(newAmount) {
    waterAmount = newAmount;
    document.getElementById("water").style.height = Math.min(65, (waterAmount / targetAmount * 65)) + "vh";
    document.getElementById("wave").style.top = Math.max(0, ((0.65 - (0.65 * waterAmount / targetAmount)) * 100)) + "vh";
}