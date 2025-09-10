"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterPoints = exports.counterLevels = exports.intervalId = exports.cibleDy = exports.cibleDx = void 0;
exports.startInterval = startInterval;
exports.stopInterval = stopInterval;
exports.getRandomDirection = getRandomDirection;
exports.sign = sign;
exports.createCounter = createCounter;
exports.moveCible = moveCible;
exports.isCollidingWithElement = isCollidingWithElement;
exports.isCollidingWithScreen = isCollidingWithScreen;
exports.cibleDx = 1;
exports.cibleDy = 1;
exports.intervalId = null;
// makes the cible move faster or slower depending on the level
function startInterval() {
    if (!exports.intervalId) {
        var cible = document.getElementById("cible");
        // change difficulty depending on level
        var currentLevel = exports.counterLevels.getValue();
        var levels = [
            { step: 4, time: 10 },
            { step: 5, time: 10 },
            { step: 7, time: 10 },
        ];
        var levelsCopy = __spreadArray([], levels, true);
        var level1_1 = levelsCopy[0], level2_1 = levelsCopy[1], level3_1 = levelsCopy[2];
        switch (currentLevel) {
            case 1:
                if (cible) {
                    cible.style.backgroundColor = "#00FFF9";
                }
                exports.intervalId = setInterval(function () { return moveCible(level1_1.step); }, level1_1.time);
                break;
            case 2:
                if (cible) {
                    cible.style.backgroundColor = "#00B8FF";
                }
                exports.intervalId = setInterval(function () { return moveCible(level2_1.step); }, level2_1.time);
                break;
            case 3:
                if (cible) {
                    cible.style.backgroundColor = "#4900FF";
                }
                exports.intervalId = setInterval(function () { return moveCible(level3_1.step); }, level3_1.time);
                break;
        }
    }
}
function stopInterval() {
    if (exports.intervalId) {
        clearInterval(exports.intervalId);
        exports.intervalId = null;
    }
}
// Démarre le mouvement au chargement
exports.counterLevels = createCounter();
exports.counterPoints = createCounter();
// Returns a random float between -1.5 and 1.5
function getRandomDirection() {
    return Math.random() * 3 - 1.5;
}
// returns sign of number
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
function createCounter() {
    var counter = 0;
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
function moveCible(step) {
    // takes information of the different elements
    var cible = document.getElementById("cible");
    var platforme = document.getElementById("platforme");
    var fosse = document.getElementById("fosse");
    if (!cible)
        return;
    var currentOffsetTop = parseInt(cible.style.top) || 0;
    var currentOffsetLeft = parseInt(cible.style.left) || 0;
    // Move according to the random direction and predefined spead
    var nextTop = currentOffsetTop + step * exports.cibleDy;
    var nextLeft = currentOffsetLeft + step * exports.cibleDx;
    // Set next position for collision check
    cible.style.top = nextTop + "px";
    cible.style.left = nextLeft + "px";
    // Check for collisions with platform
    var bounced = false;
    if (platforme && isCollidingWithElement(cible, platforme)) {
        // change of direction
        exports.cibleDx = getRandomDirection();
        exports.cibleDy = -sign(exports.cibleDy) * (2 - Math.abs(exports.cibleDx));
        // add point and handle level up
        var pointsElement = document.getElementById("pointsValue");
        if (pointsElement) {
            // Get the current points as a number
            exports.counterPoints.increment();
            if (exports.counterPoints.getValue() >= 10) {
                // increment level
                var levelElement = document.getElementById("levelValue");
                if (levelElement) {
                    // Get the current points as a number
                    exports.counterLevels.increment();
                    if (exports.counterLevels.getValue() > 3) {
                        stopInterval();
                        var winText = document.getElementById("winText");
                        if (winText) {
                            winText.classList.remove("hidden");
                        }
                        setTimeout(function () {
                            alert("You won! The game will restart.");
                            window.location.reload();
                        }, 3000);
                    }
                    levelElement.innerHTML = "".concat(exports.counterLevels.getValue());
                }
                exports.counterPoints.reset();
                // Restart interval for new level
                pointsElement.innerHTML = "".concat(exports.counterPoints.getValue());
                stopInterval();
                startInterval();
            }
            pointsElement.innerHTML = "".concat(exports.counterPoints.getValue());
        }
        bounced = true;
    }
    // check if collision with pit
    if (fosse && isCollidingWithElement(cible, fosse)) {
        // Show notification and reload the page
        alert("Game over! The ball fell into the pit. The game will restart.");
        window.location.reload();
    }
    // Check for collisions with screen borders
    var rect = cible.getBoundingClientRect();
    if (rect.left <= 0 || rect.right >= window.innerWidth) {
        exports.cibleDx = -exports.cibleDx;
        bounced = true;
    }
    if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        exports.cibleDy = -exports.cibleDy;
        bounced = true;
    }
    // If bounced, move away from collision
    if (bounced) {
        nextTop = currentOffsetTop + step * exports.cibleDy;
        nextLeft = currentOffsetLeft + step * exports.cibleDx;
        cible.style.top = nextTop + "px";
        cible.style.left = nextLeft + "px";
    }
}
// Checks for collisions with elements fosse and platforme
function isCollidingWithElement(a, b) {
    var rectA = a.getBoundingClientRect();
    var rectB = b.getBoundingClientRect();
    return !(rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom);
}
// Checks for collisions with screen
function isCollidingWithScreen(cible) {
    var rect = cible.getBoundingClientRect();
    return (rect.left <= 0 ||
        rect.right >= window.innerWidth ||
        rect.top <= 0 ||
        rect.bottom >= window.innerHeight);
}
