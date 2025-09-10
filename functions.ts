export let targetDx: number = 1;
export let targetDy: number = 1;

export let intervalId: number | null = null;

interface Level {
    step: number;
    time: number;
}

// makes the target move faster or slower depending on the level
export function startInterval(): void {
    try {
        if (!intervalId) {
            const target: HTMLElement | null = document.getElementById("target");
            // change difficulty depending on level
            const currentLevel: number = counterLevels.getValue();
            const levels: Level[] = [
                { step: 4, time: 10 },
                { step: 5, time: 10 },
                { step: 7, time: 10 },
            ];
            const levelsCopy: Level[] = [...levels];
            const [level1, level2, level3]: Level[] = levelsCopy;
            switch (currentLevel) {
                case 1:
                    if (target) { target.style.backgroundColor = colors.targetLevel1; }
                    intervalId = window.setInterval(() => moveTarget(level1.step), level1.time);
                    break;
                case 2:
                    if (target) { target.style.backgroundColor = colors.targetLevel2; }
                    intervalId = window.setInterval(() => moveTarget(level2.step), level2.time);
                    break;
                case 3:
                    if (target) { target.style.backgroundColor = colors.targetLevel3; }
                    intervalId = window.setInterval(() => moveTarget(level3.step), level3.time);
                    break;
            }
        }
    } catch (error) {
        console.error('Error in startInterval:', error);
    }
}

export function stopInterval(): void {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Démarre le mouvement au chargement
export const counterLevels: Counter = createCounter();
export const counterPoints: Counter = createCounter();

// Returns a random float between -1.5 and 1.5
export function getRandomDirection(): number {
    return Math.random() * 3 - 1.5;
}

// returns sign of number
export function sign(x: number): number {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

interface Counter {
    increment: () => void;
    getValue: () => number;
    reset: () => void;
}

export function createCounter(): Counter {
    let counter: number = 0;

    return {
        increment: function(): void {
            counter++;
        },
        getValue: function(): number {
            return counter;
        },
        reset: function(): void {
            counter = 0;
        }
    };
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function moveTarget(step: number): Promise<void> {
    try {
        // takes information of the different elements
        const target: HTMLElement | null = document.getElementById("target");
        const platform: HTMLElement | null = document.getElementById("platform");
        const pit: HTMLElement | null = document.getElementById("pit");
        if (!target) return;

        let currentOffsetTop: number = parseInt(target.style.top) || 0;
        let currentOffsetLeft: number = parseInt(target.style.left) || 0;

        // Move according to the random direction and predefined spead
        let nextTop: number = currentOffsetTop + step * targetDy;
        let nextLeft: number = currentOffsetLeft + step * targetDx;

        // Set next position for collision check
        target.style.top = nextTop + "px";
        target.style.left = nextLeft + "px";

        // Check for collisions with platform
        let bounced: boolean = false;
        if (platform && isCollidingWithElement(target, platform)) {
            // change of direction
            targetDx = getRandomDirection();
            targetDy = -sign(targetDy) * (2 - Math.abs(targetDx));
            // add point and handle level up
            const pointsElement: HTMLElement | null = document.getElementById("pointsValue");
            if (pointsElement) {
                // Get the current points as a number
                counterPoints.increment();
                if (counterPoints.getValue() >= 10) {
                    // increment level
                    const levelElement: HTMLElement | null = document.getElementById("levelValue");
                    if (levelElement) {
                        // Get the current points as a number
                        counterLevels.increment();
                        if (counterLevels.getValue() > 3) {
                            stopInterval();
                            const winText: HTMLElement | null = document.getElementById("winText");
                            if (winText) { winText.classList.remove("hidden"); }
                            await sleep(2000);
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
        const rect: DOMRect = target.getBoundingClientRect();
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
    } catch (error) {
        console.error('Error in moveTarget:', error);
    }
}

// Checks for collisions with elements pit and platform
export function isCollidingWithElement(a: HTMLElement, b: HTMLElement): boolean {
    const rectA: DOMRect = a.getBoundingClientRect();
    const rectB: DOMRect = b.getBoundingClientRect();
    return !(
        rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom
    );
}

// Checks for collisions with screen
export function isCollidingWithScreen(target: HTMLElement): boolean {
    const rect: DOMRect = target.getBoundingClientRect();
    return (
        rect.left <= 0 ||
        rect.right >= window.innerWidth ||
        rect.top <= 0 ||
        rect.bottom >= window.innerHeight
    );
}

// Interface pour gérer les couleurs
export interface Colors {
    targetLevel1: string;
    targetLevel2: string;
    targetLevel3: string;
    platform: string;
    pit: string;
    points: string;
    level: string;
    winText: string;
    background: string;
}

export const colors: Colors = {
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

