import {
    counterLevels,
    startInterval,
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

counterLevels.increment();
window.onload = function() { startInterval(); console.log(1) };