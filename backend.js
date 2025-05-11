/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// splash screen fade in effect
window.onload = function() {
    setTimeout(function() {
        document.getElementById("fadein").remove();
    },1000);
};

// manual add water input - modal screen
const modal = document.getElementById("inputModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => {
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

// variable declarations
const bottles = new Map();
let waterAmount = 0;
let targetAmount = 3000;

// backend functions
function getWaterInput() {
    inputAmount = parseFloat(document.getElementById("water-input-amount").value);
    currentAmount = parseFloat(document.getElementById("water-amount").innerHTML);
    changeWaterLevel(inputAmount + currentAmount);
}

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
    document.getElementById("water").style.height = Math.min(70, (waterAmount / targetAmount * 70)) + "%";
    document.getElementById("water-amount").innerHTML = waterAmount;
    document.getElementById("wave").style.top = Math.max(0, ((0.7 - (0.7 * waterAmount / targetAmount)) * 100)) + "%";
}
