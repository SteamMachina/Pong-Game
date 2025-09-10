export let cibleDx = 1;
export let cibleDy = 1;

export let intervalId: number | null = null;

// makes the cible move faster or slower depending on the level
export function startInterval() {
    if (!intervalId) {
        const cible = document.getElementById("cible");
        // change difficulty depending on level
        const currentLevel = counterLevels.getValue();
        interface Level {
            step : number,
            time : number,
        }
        const levels:Level[]=[
            {step:4, time:10},
            {step:5, time:10},
            {step:7, time:10},
        ]
        const levelsCopy = [...levels];
        const [level1, level2, level3] = levelsCopy;
        switch (currentLevel) {
            case 1:
                if (cible) {cible.style.backgroundColor = "#00FFF9";}
                intervalId = setInterval(() => moveCible(level1.step), level1.time);
                break;
            case 2:
                if (cible) {cible.style.backgroundColor = "#00B8FF";}
                intervalId = setInterval(() => moveCible(level2.step), level2.time);
                break;
            case 3:
                if (cible) {cible.style.backgroundColor = "#4900FF";}
                intervalId = setInterval(() => moveCible(level3.step), level3.time);
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
export function sign(x: number): number {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

export function createCounter() {
  let counter = 0;

  return {
    increment: function() {
      counter++;
    },
    getValue: function() {
      return counter;
    },
    reset: function() {
      counter = 0;
    }
  };
}



export function moveCible(step) {
    // takes information of the different elements
    const cible = document.getElementById("cible");
    const platforme = document.getElementById("platforme");
    const fosse = document.getElementById("fosse");
    if (!cible) return;

    let currentOffsetTop = parseInt(cible.style.top) || 0;
    let currentOffsetLeft = parseInt(cible.style.left) || 0;

    // Move according to the random direction and predefined spead
    let nextTop = currentOffsetTop + step * cibleDy;
    let nextLeft = currentOffsetLeft + step * cibleDx;

    // Set next position for collision check
    cible.style.top = nextTop + "px";
    cible.style.left = nextLeft + "px";

    // Check for collisions with platform
    let bounced = false;
    if (platforme && isCollidingWithElement(cible, platforme)) {
        // change of direction
        cibleDx = getRandomDirection();
        cibleDy = -sign(cibleDy)*(2-Math.abs(cibleDx));
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
                    if (counterLevels.getValue() > 3){
                        stopInterval();
                        const winText = document.getElementById("winText");
                        if (winText){winText.classList.remove("hidden");}
                        setTimeout(function() {
                            alert("You won! The game will restart.");
                            window.location.reload();
                        }, 3000);
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
    if (fosse && isCollidingWithElement(cible, fosse)) {
    // Show notification and reload the page
    alert("Game over! The ball fell into the pit. The game will restart.");
    window.location.reload();
    }

    // Check for collisions with screen borders
    const rect = cible.getBoundingClientRect();
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
export function isCollidingWithElement(a: HTMLElement, b: HTMLElement): boolean {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    return !(
        rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom
    );
}

// Checks for collisions with screen
export function isCollidingWithScreen(cible: HTMLElement): boolean {
    const rect = cible.getBoundingClientRect();
    return (
        rect.left <= 0 ||
        rect.right >= window.innerWidth ||
        rect.top <= 0 ||
        rect.bottom >= window.innerHeight
    );
}

