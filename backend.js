/**
 * BERNARDO, Jonathan
 * FERRER, Matt
 */

// variable declarations
let selectedBottle = 0;
let waterAmount = 0;
let targetAmount = 3000;
var currentTime, reminderTime, lastTime;

// runs when any page loads (except for the splash screen)
window.onload = function() {
    // splash screen fade in effect
    setTimeout(function() {  
        document.getElementById("fadein").remove();
    },1000);

    // get current water amount from local storage
    waterAmount = localStorage.getItem("waterAmount");
    if (waterAmount == null) {
        waterAmount = 0;
    }
    changeWaterLevel(waterAmount);
};

// timer function runs every 100 milliseconds
setInterval(function() {
     // get time since last reminder from local storage
    lastTime = localStorage.getItem("lastTime");
    reminderTime = localStorage.getItem("reminderTime");
    if (lastTime == null) {
        lastTime = new Date().getTime();
    }
    timer = Math.floor((currentTime - lastTime) / 1000);
    if (timer != 0 || timer != null) {
        currentTime = new Date().getTime();
        timer = Math.floor((reminderTime - (currentTime - lastTime)) / 1000);
        if (reminderTime > 0 && timer >= reminderTime) {
            alert("Time to drink water!");
        }
    }
    let hr = Math.floor(timer / 3600);
    let min = Math.floor(timer / 60) % 60;
    let sec = timer % 60;
    document.getElementById("timer-text").innerHTML = (hr < 10 ? "0" : "") + hr + ":" + 
        (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}, 100);

// backend functions
function getWaterInput() {
    inputAmount = parseFloat(document.getElementById("water-input-amount").value);
    currentAmount = parseFloat(document.getElementById("water-amount").innerHTML);
    changeWaterLevel(inputAmount + currentAmount);
    localStorage.setItem("waterAmount", inputAmount + currentAmount);
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

function setReminder(reminderTime) {
    localStorage.setItem("lastTime", currentTime);
    localStorage.setItem("reminderTime", reminderTime);
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
