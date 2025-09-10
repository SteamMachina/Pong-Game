var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/****************************************/
/*                Interval              */
/****************************************/
export let intervalId = null;
// runs the moveTarget() according to level settings
export function startInterval() {
    try {
        if (!intervalId) {
            const target = document.getElementById("target");
            if (!target) {
                return;
            }
            // change difficulty depending on level
            const currentLevel = counterLevels.getValue();
            const levels = [
                { step: 4, time: 10 },
                { step: 5, time: 10 },
                { step: 7, time: 10 },
            ];
            const levelsCopy = [...levels]; // done only because of project requirements, otherwise useless
            const [level1, level2, level3] = levelsCopy;
            switch (currentLevel) {
                case 1:
                    target.style.backgroundColor = colors.targetLevel1;
                    intervalId = window.setInterval(() => moveTarget(level1.step), level1.time);
                    break;
                case 2:
                    target.style.backgroundColor = colors.targetLevel2;
                    intervalId = window.setInterval(() => moveTarget(level2.step), level2.time);
                    break;
                case 3:
                    target.style.backgroundColor = colors.targetLevel3;
                    intervalId = window.setInterval(() => moveTarget(level3.step), level3.time);
                    break;
            }
        }
    }
    catch (error) {
        console.error("Error in startInterval:", error);
    }
}
// stops interval
export function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
export function createCounter() {
    let counter = 0;
    return {
        increment: function () {
            counter++;
        },
        getValue: function () {
            return counter;
        },
        reset: function () {
            counter = 0;
        },
    };
}
// Starts counters
export const counterLevels = createCounter();
export const counterPoints = createCounter();
/****************************************/
/*     Moving target and game flow      */
/****************************************/
// Pauses app for n milliseconds
// Used right before the win alert
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// target position on x and y axis
export let targetDx = 1;
export let targetDy = 1;
// Returns a random float between -1.5 and 1.5
// witch mark the directin angle of the target
export function getRandomDirection() {
    return Math.random() * 3 - 1.5;
}
// returns sign of number
// used to modify target spead in moveTarget()
export function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
// Moves target according to level settings
export function moveTarget(step) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // takes information of the different elements
            const target = document.getElementById("target");
            const platform = document.getElementById("platform");
            const pit = document.getElementById("pit");
            // check if elements exist
            if (!platform || !pit || !target) {
                return;
            }
            let currentOffsetTop = parseInt(target.style.top) || 0;
            let currentOffsetLeft = parseInt(target.style.left) || 0;
            // Move according to the random direction and predefined spead
            let nextTop = currentOffsetTop + step * targetDy;
            let nextLeft = currentOffsetLeft + step * targetDx;
            // Set next position
            target.style.top = nextTop + "px";
            target.style.left = nextLeft + "px";
            // Check for collisions with platform
            let bounced = false; // if true, target direction changes
            if (isCollidingWithElement(target, platform)) {
                // change of direction
                targetDx = getRandomDirection();
                targetDy = -sign(targetDy) * (2 - Math.abs(targetDx)); // obj : |targetDx| + |targetDy| = 2
                // add point and handle level up
                const pointsElement = document.getElementById("pointsValue");
                if (pointsElement) {
                    // Get the current points as a number
                    counterPoints.increment();
                    // increment level if 10 points
                    if (counterPoints.getValue() >= 10) {
                        const levelElement = document.getElementById("levelValue");
                        if (levelElement) {
                            // Get the current points as a number
                            counterLevels.increment();
                            // stop game if level 3 cleared
                            if (counterLevels.getValue() > 3) {
                                stopInterval();
                                const winText = document.getElementById("winText");
                                if (winText) {
                                    winText.classList.remove("hidden");
                                }
                                yield sleep(2000);
                                alert("You won! The game will restart.");
                                window.location.reload();
                            }
                            levelElement.innerHTML = `${counterLevels.getValue()}`;
                        }
                        // Restart interval and reset points for new level
                        counterPoints.reset();
                        pointsElement.innerHTML = `${counterPoints.getValue()}`;
                        stopInterval();
                        startInterval();
                    }
                    pointsElement.innerHTML = `${counterPoints.getValue()}`;
                }
                bounced = true;
            }
            // check if collision with pit
            if (isCollidingWithElement(target, pit)) {
                // Show notification and reload the page
                stopInterval();
                alert("Game over! The ball fell into the pit. The game will restart.");
                window.location.reload();
                return;
            }
            // Check for collisions with screen borders
            const rect = target.getBoundingClientRect();
            // if collision on top
            if (rect.left <= 0 || rect.right >= window.innerWidth) {
                targetDx = -targetDx;
                bounced = true;
            }
            // if collision left or right
            if (rect.top <= 0) {
                targetDy = -targetDy;
                bounced = true;
            }
            // If bounced, move away from collision
            if (bounced) {
                nextTop = currentOffsetTop + step * targetDy;
                nextLeft = currentOffsetLeft + step * targetDx;
                target.style.top = nextTop + "px";
                target.style.left = nextLeft + "px";
            }
        }
        catch (error) {
            console.error("Error in moveTarget:", error);
        }
    });
}
// Checks for collisions with an elements
export function isCollidingWithElement(a, b) {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    return !(rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom);
}
export const colors = {
    targetLevel1: "#00FFF9",
    targetLevel2: "#00B8FF",
    targetLevel3: "#4900FF",
    platform: "#9600FF",
    pit: "#FF00C1",
    points: "#FF00C1",
    level: "#FF00C1",
    winText: "#FF00C1",
    background: "black",
};
