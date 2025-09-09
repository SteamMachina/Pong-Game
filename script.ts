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

function startInterval(step, time) {
    if (!intervalId) {
        intervalId = setInterval(() => moveCible(step), time);
    }
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Démarre le mouvement au chargement
window.onload = function() { startInterval(5, 10); };