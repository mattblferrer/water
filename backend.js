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
    document.getElementById("splash").remove();
    },3000);
    setTimeout(function() {
    document.getElementById("splash-bottom").remove();
    },3000);
};

// variable declarations
const bottles = new Map();
let waterAmount = 0;
let bottleAmount = 3000;

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
