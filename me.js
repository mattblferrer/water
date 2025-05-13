/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// variable declarations
let waterAmount = 0;
let targetAmount = 3000;
let totalWaterIntake = 0;

window.onload = function() {  // for me page
    // get total water intake from local storage
    totalWaterIntake = localStorage.getItem("totalWaterIntake");
    if (totalWaterIntake == null || isNaN(totalWaterIntake)) {
        totalWaterIntake = 0;
    }
    document.getElementById("total-intake").innerHTML = totalWaterIntake;
}

function changeWaterLevel(newAmount) {
    waterAmount = newAmount;
    document.getElementById("water").style.height = Math.min(65, (waterAmount / targetAmount * 65)) + "vh";
    document.getElementById("wave").style.top = Math.max(0, ((0.65 - (0.65 * waterAmount / targetAmount)) * 100)) + "vh";
}

function setTargetAmount() {
    let setAmount = parseFloat(document.getElementById("input-intake").value);
    
    if (isNaN(setAmount) || setAmount <= 0) {
        alert("Please enter a valid target amount.");
        return;
    }
    targetAmount = setAmount;
    localStorage.setItem("targetAmount", setAmount);
}

function resetWaterIntake() {
    totalWaterIntake = 0;
    localStorage.setItem("totalWaterIntake", totalWaterIntake);
    targetAmount = 3000;
    localStorage.setItem("targetAmount", targetAmount);
    document.getElementById("total-intake").innerHTML = totalWaterIntake;
    waterAmount = 0;
    localStorage.setItem("waterAmount", waterAmount);
    changeWaterLevel(waterAmount);
}