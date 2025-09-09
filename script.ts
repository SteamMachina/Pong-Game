/* 
    This moves the platform right and left within the bounds 
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

/*
    This will animate the circle, randomly changing 
    direction with each collision
*/
function moveCible(step) {
    // get target info
    const cible = document.getElementById("cible");
    console.log("ici");
    if (!cible) return;
    
    let currentOffsetTop = parseInt(cible.style.top) || 0;
    const cibleHeight = cible.offsetHeight;

    const windowHeight = window.innerHeight;

    if (currentOffsetTop + cibleHeight < windowHeight) {
        currentOffsetTop += step;
    } else {
        currentOffsetTop = 0;
    }
    cible.style.top = currentOffsetTop + "px";
}

let intervalId: number | null = null;

function startInterval() {
    if (!intervalId) {
        const levelElement = document.getElementById("level");
        // change difficulty depending on level
        if (levelElement){
            const currentLevel = levelElement.innerHTML;
            interface Level {
                step : number,
                time : number
            }
            const levels:Level[]=[
                {step:5, time:25},
                {step:5, time:15},
                {step:5, time:5},
            ]
            const [level1, level2, level3] = levels;
            switch (currentLevel){
                case "Level 1":
                    intervalId = setInterval(() => moveCible(level1.step), level1.time);
                    break;
                case "Level 2":
                    intervalId = setInterval(() => moveCible(level2.step), level2.time);
                    break;
                case "Level 3":
                    intervalId = setInterval(() => moveCible(level3.step), level3.time);
                    break;
            }
            
        };
    }
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Démarre le mouvement au chargement
window.onload = function() { startInterval(); };