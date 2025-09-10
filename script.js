/*
    This section moves the platform right and left within the bounds
    of the screen by pushing directional keys
*/
window.addEventListener("keydown", function (event) {
    // get platform info
    var platforme = document.getElementById("platforme");
    if (!platforme)
        return;
    var platformeWidth = platforme.offsetWidth;
    var currentOffsetLeft = platforme.offsetLeft;
    // get window info
    var screenWidth = window.screen.availWidth;
    var step = screenWidth / 50;
    // go left or right
    var direction = event.key;
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
var cibleDx = 1;
var cibleDy = 1;
// Returns a random float between -1.5 and 1.5
function getRandomDirection() {
    return Math.random() * 3 - 1.5;
}
// returns sign of number
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
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
    var nextTop = currentOffsetTop + step * cibleDy;
    var nextLeft = currentOffsetLeft + step * cibleDx;
    // Set next position for collision check
    cible.style.top = nextTop + "px";
    cible.style.left = nextLeft + "px";
    // Check for collisions with platform
    var bounced = false;
    if (platforme && isCollidingWithElement(cible, platforme)) {
        // change of direction
        cibleDx = getRandomDirection();
        cibleDy = -sign(cibleDy) * (2 - Math.abs(cibleDx));
        // add point and handle level up
        var pointsElement = document.getElementById("points");
        if (pointsElement) {
            // Get the current points as a number
            var pointsText = pointsElement.innerHTML;
            // "Points : 5" => ["Points ", " 5"]
            var parts = pointsText.split(":");
            var points = 0;
            if (parts.length > 1) {
                points = parseInt(parts[1]);
                if (isNaN(points))
                    points = 0;
            }
            points = points + 1;
            if (points >= 10) {
                // increment level
                var levelElement = document.getElementById("level");
                if (levelElement) {
                    var levelText = levelElement.innerHTML;
                    var levelParts = levelText.split(":");
                    var level = 1;
                    if (levelParts.length > 1) {
                        level = parseInt(levelParts[1]);
                        if (isNaN(level))
                            level = 1;
                    }
                    level = level + 1;
                    if (level > 3) {
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
                    levelElement.innerHTML = "Level : " + level;
                }
                points = 0;
                // Restart interval for new level
                pointsElement.innerHTML = "Points : " + points;
                stopInterval();
                startInterval();
            }
            pointsElement.innerHTML = "Points : " + points;
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
        cibleDx = -cibleDx;
        bounced = true;
    }
    if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        cibleDy = -cibleDy;
        bounced = true;
    }
    // If bounced, move away from collision
    if (bounced) {
        nextTop = currentOffsetTop + step * cibleDy;
        nextLeft = currentOffsetLeft + step * cibleDx;
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
var intervalId = null;
// makes the cible move faster or slower depending on the level
function startInterval() {
    if (!intervalId) {
        var levelElement = document.getElementById("level");
        var cible = document.getElementById("cible");
        // change difficulty depending on level
        if (levelElement) {
            var currentLevel = levelElement.innerHTML;
            var levels = [
                { step: 4, time: 10 },
                { step: 5, time: 10 },
                { step: 7, time: 10 },
            ];
            var level1_1 = levels[0], level2_1 = levels[1], level3_1 = levels[2];
            switch (currentLevel) {
                case "Level : 1":
                    if (cible) {
                        cible.style.backgroundColor = "#00FFF9";
                    }
                    intervalId = setInterval(function () { return moveCible(level1_1.step); }, level1_1.time);
                    break;
                case "Level : 2":
                    if (cible) {
                        cible.style.backgroundColor = "#00B8FF";
                    }
                    intervalId = setInterval(function () { return moveCible(level2_1.step); }, level2_1.time);
                    break;
                case "Level : 3":
                    if (cible) {
                        cible.style.backgroundColor = "#4900FF";
                    }
                    intervalId = setInterval(function () { return moveCible(level3_1.step); }, level3_1.time);
                    break;
            }
        }
        ;
    }
}
function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
// Démarre le mouvement au chargement
window.onload = function () { startInterval(); };
