// Generate a 5x8 grid dynamically
const grid = document.getElementById("grid");
const sprite = document.getElementById("sprite");
const cols = 8;
const rows = 5;
grid.innerHTML = "";
for (let i = 0; i < cols * rows; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  grid.appendChild(cell);
}

// Set penguin size to half a tile and update on resize
function setPenguinSize() {
  const gridRect = grid.getBoundingClientRect();
  const tileW = gridRect.width / cols;
  const tileH = gridRect.height / rows;
  sprite.style.width = tileW / 2 + "px";
  sprite.style.height = tileH / 2 + "px";
}
window.addEventListener("resize", setPenguinSize);
setTimeout(setPenguinSize, 100);
window.addEventListener("DOMContentLoaded", setPenguinSize);
