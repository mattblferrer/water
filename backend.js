/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// HTML elements
window.onload = function() {
    setTimeout(function() {
        document.getElementById("fadein").remove();
    },1000);
    setTimeout(function() {
        window.location.href = "home.html";
    },3000);
};

// variable declarations
const bottles = new Map();
let waterAmount = 0;
let targetAmount = 3000;

// backend functions
function addBottle(bottleName, bottleWeight) {
    bottles.set(bottleName, bottleWeight);
}

function removeBottle(bottleName) {
    return bottles.delete(bottleName);
}

function computeWaterVolume(beforeWeight, afterWeight) {
    return Math.max(0, beforeWeight - afterWeight);
}

function changeWaterLevel(newAmount) {
    waterAmount = newAmount;
    document.getElementById("water").style.height = (waterAmount / targetAmount * 100) + "%";
    document.getElementById("water-amount").innerHTML = waterAmount + " mL";
    document.getElementById("wave").style.top = ((0.7 - (0.7 * waterAmount / targetAmount)) * 100) + "%";
}
