import {
    createCounter,
    moveCible,
    isCollidingWithElement,
    isCollidingWithScreen,
    getRandomDirection,
    sign,
    counterLevels,
    counterPoints,
    startInterval,
    stopInterval,
    cibleDx,
    cibleDy
} from "./functions.js";

/* 
    This section moves the platform right and left within the bounds 
    of the screen by pushing directional keys
*/
window.addEventListener("keydown", function(event) {
    // get platform info
    const platforme = document.getElementById("platforme");
    if (!platforme) return;
    const platformeWidth = platforme.offsetWidth;
    let currentOffsetLeft = platforme.offsetLeft;

    // get window info
    const screenWidth = window.screen.availWidth;
    const step = screenWidth / 50;

    // go left or right
    let direction = event.key;
    switch (direction) {
        case "ArrowRight":
            if (currentOffsetLeft + platformeWidth + step < screenWidth) {
                currentOffsetLeft += step;
            }
            break;
        case "ArrowLeft":
            if (currentOffsetLeft - step > 0) {
                currentOffsetLeft -= step;
            }
            break;
    }
    platforme.style.left = currentOffsetLeft + "px";
});

/*
    This section will animate the circle, randomly changing 
    direction with each collision
*/
// Direction state for cible

counterLevels.increment();
window.onload = function() { startInterval(); };