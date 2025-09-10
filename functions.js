var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let targetDx = 1;
export let targetDy = 1;
export let intervalId = null;
// makes the target move faster or slower depending on the level
export function startInterval() {
    if (!intervalId) {
        const target = document.getElementById("target");
        // change difficulty depending on level
        const currentLevel = counterLevels.getValue();
        const levels = [
            { step: 4, time: 10 },
            { step: 5, time: 10 },
            { step: 7, time: 10 },
        ];
        const levelsCopy = [...levels];
        const [level1, level2, level3] = levelsCopy;
        switch (currentLevel) {
            case 1:
                if (target) {
                    target.style.backgroundColor = "#00FFF9";
                }
                intervalId = window.setInterval(() => moveTarget(level1.step), level1.time);
                break;
            case 2:
                if (target) {
                    target.style.backgroundColor = "#00B8FF";
                }
                intervalId = window.setInterval(() => moveTarget(level2.step), level2.time);
                break;
            case 3:
                if (target) {
                    target.style.backgroundColor = "#4900FF";
                }
                intervalId = window.setInterval(() => moveTarget(level3.step), level3.time);
                break;
        }
    }
}
export function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
// Démarre le mouvement au chargement
export const counterLevels = createCounter();
export const counterPoints = createCounter();
// Returns a random float between -1.5 and 1.5
export function getRandomDirection() {
    return Math.random() * 3 - 1.5;
}
// returns sign of number
export function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
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
        }
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function moveTarget(step) {
    return __awaiter(this, void 0, void 0, function* () {
        // takes information of the different elements
        const target = document.getElementById("target");
        const platform = document.getElementById("platform");
        const pit = document.getElementById("pit");
        if (!target)
            return;
        let currentOffsetTop = parseInt(target.style.top) || 0;
        let currentOffsetLeft = parseInt(target.style.left) || 0;
        // Move according to the random direction and predefined spead
        let nextTop = currentOffsetTop + step * targetDy;
        let nextLeft = currentOffsetLeft + step * targetDx;
        // Set next position for collision check
        target.style.top = nextTop + "px";
        target.style.left = nextLeft + "px";
        // Check for collisions with platform
        let bounced = false;
        if (platform && isCollidingWithElement(target, platform)) {
            // change of direction
            targetDx = getRandomDirection();
            targetDy = -sign(targetDy) * (2 - Math.abs(targetDx));
            // add point and handle level up
            const pointsElement = document.getElementById("pointsValue");
            if (pointsElement) {
                // Get the current points as a number
                counterPoints.increment();
                if (counterPoints.getValue() >= 10) {
                    // increment level
                    const levelElement = document.getElementById("levelValue");
                    if (levelElement) {
                        // Get the current points as a number
                        counterLevels.increment();
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
                    counterPoints.reset();
                    // Restart interval for new level
                    pointsElement.innerHTML = `${counterPoints.getValue()}`;
                    stopInterval();
                    startInterval();
                }
                pointsElement.innerHTML = `${counterPoints.getValue()}`;
            }
            bounced = true;
        }
        // check if collision with pit
        if (pit && isCollidingWithElement(target, pit)) {
            // Show notification and reload the page
            alert("Game over! The ball fell into the pit. The game will restart.");
            window.location.reload();
        }
        // Check for collisions with screen borders
        const rect = target.getBoundingClientRect();
        if (rect.left <= 0 || rect.right >= window.innerWidth) {
            targetDx = -targetDx;
            bounced = true;
        }
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
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
    });
}
// Checks for collisions with elements pit and platform
export function isCollidingWithElement(a, b) {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    return !(rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom);
}
// Checks for collisions with screen
export function isCollidingWithScreen(target) {
    const rect = target.getBoundingClientRect();
    return (rect.left <= 0 ||
        rect.right >= window.innerWidth ||
        rect.top <= 0 ||
        rect.bottom >= window.innerHeight);
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
    background: "black"
};
