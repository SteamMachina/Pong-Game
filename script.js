import { counterLevels, startInterval, } from "./functions.js";
/*
    This section moves the platform right and left within the bounds
    of the screen by pushing directional keys
*/
window.addEventListener("keydown", function (event) {
    // get platform info
    const platform = document.getElementById("platform");
    if (!platform)
        return;
    const platformWidth = platform.offsetWidth;
    let currentOffsetLeft = platform.offsetLeft;
    // get window info
    const screenWidth = window.screen.availWidth;
    const step = screenWidth / 50;
    // go left or right
    let direction = event.key;
    switch (direction) {
        case "ArrowRight":
            if (currentOffsetLeft + platformWidth + step < screenWidth) {
                currentOffsetLeft += step;
            }
            break;
        case "ArrowLeft":
            if (currentOffsetLeft - step > 0) {
                currentOffsetLeft -= step;
            }
            break;
    }
    platform.style.left = currentOffsetLeft + "px";
});
counterLevels.increment();
window.onload = function () { startInterval(); console.log(1); };
