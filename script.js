window.addEventListener("keydown", function (event) {
    var direction = event.key;
    var penguin = document.getElementById("penguin");
    var currentOffsetTop = penguin.offsetTop;
    var currentOffsetLeft = penguin.offsetLeft;
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var step = 10;
    var penguinHeight = penguin.offsetHeight;
    switch (direction) {
        case "ArrowUp":
            console.log(currentOffsetTop);
            if (currentOffsetTop > 0) {
                currentOffsetTop -= step;
            }
            else {
                alert("Can't go further up");
            }
            break;
        case "ArrowDown":
            if (currentOffsetTop + penguinHeight < windowHeight) {
                currentOffsetTop += step;
            }
            else {
                alert("Can't go further down");
            }
            break;
        case "ArrowLeft":
            if (currentOffsetLeft > 0) {
                currentOffsetLeft -= step;
            }
            else {
                alert("Can't go further left");
            }
            break;
        case "ArrowRight":
            if (currentOffsetLeft + penguinHeight < windowWidth) {
                currentOffsetLeft += step;
            }
            else {
                alert("Can't go further right");
            }
    }
    penguin.style.top = currentOffsetTop + "px";
    penguin.style.left = currentOffsetLeft + "px";
});
