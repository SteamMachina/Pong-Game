import { counterLevels, startInterval } from "./functions.js";

/****************************************/
/*          Platform movement           */
/****************************************/
window.addEventListener("keydown", function (event: KeyboardEvent): void {
  try {
    // get platform info
    const platform: HTMLElement | null = document.getElementById("platform");
    if (!platform) return;
    const platformWidth: number = platform.offsetWidth;
    let currentOffsetLeft: number = platform.offsetLeft;

    // get window info
    const screenWidth: number = window.screen.availWidth;
    const step: number = screenWidth / 50;

    // go left or right within window bounds
    let direction: string = event.key;
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
  } catch (error) {
    console.error("Error in keydown event:", error);
  }
});

/****************************************/
/*            Game flo start            */
/****************************************/
// start at level 1
counterLevels.increment();

// start moving the target
window.onload = function (): void {
  startInterval();
};
