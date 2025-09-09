window.addEventListener("keydown", (event) => {
  let direction = event.key;
  var penguin = document.getElementById("penguin");
  let currentOffsetTop = penguin.offsetTop;
  let currentOffsetLeft = penguin.offsetLeft;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const step = 10;
  const penguinHeight = penguin.offsetHeight;

  switch (direction) {
    case "ArrowUp":
      console.log(currentOffsetTop);
      if (currentOffsetTop > 0) {
        currentOffsetTop -= step;
      } else {
        alert("Can't go further up");
      }
      break;
    case "ArrowDown":
      if (currentOffsetTop + penguinHeight < windowHeight) {
        currentOffsetTop += step;
      } else {
        alert("Can't go further down");
      }
      break;
    case "ArrowLeft":
      if (currentOffsetLeft > 0) {
        currentOffsetLeft -= step;
      } else {
        alert("Can't go further left");
      }
      break;
    case "ArrowRight":
      if (currentOffsetLeft + penguinHeight < windowWidth) {
        currentOffsetLeft += step;
      } else {
        alert("Can't go further right");
      }
  }
  penguin.style.top = currentOffsetTop + "px";
  penguin.style.left = currentOffsetLeft + "px";
});
