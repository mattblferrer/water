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

// Function to update the date in the 'current-date' element
function updateDate() {
    const dateElement = document.getElementById("current-date");
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options).toLowerCase();
    dateElement.textContent = formattedDate;
}

// Function to update the week in the 'current-week' element
function updateWeek() {
    const weekElement = document.getElementById("current-week");
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };

    // get start of week (Sunday) and end of week (Saturday)
    let startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek = startOfWeek.toLocaleDateString('en-US', options).toLowerCase();
    let endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek = endOfWeek.toLocaleDateString('en-US', options).toLowerCase();
    weekElement.textContent = startOfWeek + " to " + endOfWeek;
}

function displayWeeklyGraph() {
    // display weekly graph of water intake
    let weeklyData = [0, 0, 0, 0, 0, 0, 0];  // array to hold water intake for each day of the week
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let startOfWeek = new Date(currentDate.getTime() - (currentDay * 24 * 60 * 60 * 1000));
    let endOfWeek = new Date(currentDate.getTime() + ((6 - currentDay) * 24 * 60 * 60 * 1000));
    let totalWaterIntake = 0;
    let totalDays = 0;
    let weeklyContainer = document.getElementById("weekly-graph");
    let waterIntakeHistory = JSON.parse(localStorage.getItem("waterIntakeHistory")) || {};
    weeklyContainer.innerHTML = ""; // clear previous graph

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);

    for (let time in waterIntakeHistory) {
        let date = new Date(parseInt(time));

        if (date >= startOfWeek && date <= endOfWeek) {
            totalWaterIntake += waterIntakeHistory[time];
            totalDays++;
            let day = date.getDay();
            weeklyData[day] += waterIntakeHistory[time];
        }
    }
    let maxWaterIntake = Math.max(...Object.values(weeklyData));
    for (let day in weeklyData) {
        let bar = document.createElement("div");
        bar.className = "weekly-bar";
        bar.style.height = (weeklyData[day] / maxWaterIntake * 100) + "%";
        bar.innerHTML = `${weeklyData[day]}`;
        weeklyContainer.appendChild(bar);
    }
}

// Function to update the month in the 'current-month' element
function updateMonth() {
    const monthElement = document.getElementById("current-month");
    const today = new Date();
    const options = { month: 'long', year: 'numeric' };
    const formattedMonth = today.toLocaleDateString('en-US', options).toLowerCase();
    monthElement.textContent = formattedMonth;
}

function displayMonthlyGraph() {
    let monthlyData = Array(32).fill(0);  // array to hold water intake for each day of the month
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let totalWaterIntake = 0;
    let totalDays = 0;
    let monthlyContainer = document.getElementById("monthly-graph");
    let waterIntakeHistory = JSON.parse(localStorage.getItem("waterIntakeHistory")) || {};
    monthlyContainer.innerHTML = "";  // clear previous graph
    for (let time in waterIntakeHistory) {
        let date = new Date(parseInt(time));

        if (date.getMonth() === currentMonth) {
            totalWaterIntake += waterIntakeHistory[time];
            totalDays++;
            let day = date.getDate();
            monthlyData[day] += waterIntakeHistory[time];
        }
    }
    let maxWaterIntake = Math.max(...Object.values(monthlyData));
    for (let day in monthlyData) {
        let bar = document.createElement("div");
        bar.className = "monthly-bar";
        bar.style.height = (monthlyData[day] / maxWaterIntake * 100) + "%";
        bar.innerHTML = `${monthlyData[day]}`;
        monthlyContainer.appendChild(bar);
    }
}