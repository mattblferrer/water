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
    historyContainer.innerHTML = ""; // clear previous history

    for (let time in waterIntakeHistory) {
        let date = new Date(parseInt(time));
        if ((new Date().toDateString()) != date.toDateString()) continue;  // skip if not today

        // format the date to show only time
        let amount = waterIntakeHistory[time];
        let hours = date.getHours();
        let minutes = date.getMinutes();   
        let seconds = date.getSeconds();
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // create history item with delete button and entry info
        let historyItem = document.createElement("div");
        let historyItemAmount = document.createElement("div");
        let lineBreak1 = document.createElement("hr");
        let historyItemTime = document.createElement("div");
        let lineBreak2 = document.createElement("hr");
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "button";
        deleteButton.id = time;
        deleteButton.onclick = function() {
            delete waterIntakeHistory[time];
            localStorage.setItem("waterIntakeHistory", JSON.stringify(waterIntakeHistory));
            displayWaterIntakeHistory();
        }

        // set class names for styling
        historyItem.className = "history-item";
        historyItemAmount.className = "history-item-amount";
        historyItemTime.className = "history-item-time";

        // set inner HTML for history item
        historyItemAmount.innerHTML = `${amount} ML`;
        historyItemTime.innerHTML = formattedTime;
        historyItem.appendChild(historyItemAmount);
        historyItem.appendChild(lineBreak1);
        historyItem.appendChild(historyItemTime);
        historyItem.appendChild(lineBreak2);
        historyItem.appendChild(deleteButton);
        historyContainer.prepend(historyItem);
    }
}

// function to handle health tab
function showContent(sectionId, element) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } 
        else {
            section.style.display = 'none';
        }
    });

    const menuItems = document.querySelectorAll('.health-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

function changeWaterLevel(newAmount) {
    waterAmount = newAmount;
    document.getElementById("water").style.height = Math.min(65, (waterAmount / targetAmount * 65)) + "vh";
    document.getElementById("wave").style.top = Math.max(0, ((0.65 - (0.65 * waterAmount / targetAmount)) * 100)) + "vh";
}