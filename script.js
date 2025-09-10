import { counterLevels, startInterval } from "./functions.js";
/****************************************/
/*          Platform movement           */
/****************************************/
window.addEventListener("keydown", function (event) {
    try {
        // get platform info
        const platform = document.getElementById("platform");
        if (!platform)
            return;
        const platformWidth = platform.offsetWidth;
        let currentOffsetLeft = platform.offsetLeft;
        // get window info
        const screenWidth = window.screen.availWidth;
        const step = screenWidth / 50;
        // go left or right within window bounds
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
    }
    catch (error) {
        console.error("Error in keydown event:", error);
    }
});
/****************************************/
/*            Game flo start            */
/****************************************/
// start at level 1
counterLevels.increment();
// start moving the target
window.onload = function () {
    startInterval();
};
