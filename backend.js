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
};

// variable declarations
const bottles = new Map();

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
