/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// console log
console.log('backend.js script loaded');

function fetchWeight() {
    console.log('fetchWeight called');
    fetch('https://water-backend-arkq.onrender.com/api/data')
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            if (data.weight !== null) {
                weight = parseFloat(data.weight);
                currentAmount = parseFloat(document.getElementById("water-amount").innerHTML);
                changeWaterLevel(weight + currentAmount); // Call the water animation update
            }
        })
        .catch(error => {
            console.error('Error fetching weight:', error);
        });
}


if (document.readyState !== 'loading') {
    console.log('Document is already ready, calling fetchWeight()');
    fetchWeight();
    setInterval(fetchWeight, 10000);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded, calling fetchWeight()');
        fetchWeight();
        setInterval(fetchWeight, 10000);
    });
}


// variable declarations
let selectedBottle = 0;
let waterAmount = 0;
let targetAmount = 3000;
let totalWaterIntake = 0;
let waterIntakeHistory = {};
var currentTime, reminderTime, lastTime, timer = 0;

window.onload = function() {  // for home page
    // splash screen fade in effect
    setTimeout(function() {  
        document.getElementById("fadein").remove();
    },1000);

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
    // get water intake history from local storage
    waterIntakeHistory = localStorage.getItem("waterIntakeHistory");
    if (waterIntakeHistory == null) {
        waterIntakeHistory = {};
    }
    else {
        waterIntakeHistory = JSON.parse(waterIntakeHistory);
    }

    changeWaterLevel(waterAmount);
    document.getElementById("target-amount").innerHTML = targetAmount;
};

// backend functions
function getWaterInput() {
    inputAmount = parseFloat(document.getElementById("water-input-amount").value);
    currentAmount = parseFloat(document.getElementById("water-amount").innerHTML);
    changeWaterLevel(inputAmount + currentAmount);
    localStorage.setItem("waterAmount", inputAmount + currentAmount);
    totalWaterIntake = parseFloat(totalWaterIntake) + inputAmount;
    localStorage.setItem("totalWaterIntake", totalWaterIntake);
    lastTime = Date.now();
    localStorage.setItem("lastTime", lastTime);

    // update water intake history
    currentTime = Date.now();
    waterIntakeHistory[currentTime] = inputAmount;
    localStorage.setItem("waterIntakeHistory", JSON.stringify(waterIntakeHistory));
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
    document.getElementById("water").style.height = Math.min(65, (waterAmount / targetAmount * 65)) + "vh";
    document.getElementById("wave").style.top = Math.max(0, ((0.65 - (0.65 * waterAmount / targetAmount)) * 100)) + "vh";
    document.getElementById("water-amount").innerHTML = waterAmount;
}

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

// function to handle the dropdown menu
const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.dropdown-selected');
const list = dropdown.querySelector('.dropdown-list');
const items = dropdown.querySelectorAll('.dropdown-item');

selected.addEventListener('click', () => {
dropdown.classList.toggle('open');
});

items.forEach(item => {
item.addEventListener('click', () => {
    selected.textContent = item.textContent;
    dropdown.classList.remove('open');
});
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
}
});