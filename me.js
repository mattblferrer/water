window.onload = function() {  // for me page
    // get total water intake from local storage
    totalWaterIntake = localStorage.getItem("totalWaterIntake");
    if (totalWaterIntake == null || isNaN(totalWaterIntake)) {
        totalWaterIntake = 0;
    }
    document.getElementById("total-intake").innerHTML = totalWaterIntake;
}