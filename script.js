const canvas = document.querySelector("canvas"); // Makes the canvas variable the canvas element
canvas.width = canvas.clientWidth; // Sets the canvas width to the client width and the canvas height to the client height
canvas.height = canvas.clientHeight;

const c = canvas.getContext("2d"); // Sets the variable c to being able to draw on the canvas

// Info about the grid
let grid = {
  width: 4,
  height: 4,
  squareSize: 150,
  pixels: {
    x: 50,
    y: undefined, // These are undefined because they are calculated later
    width: undefined,
    height: undefined,
    lineWidth: 7,
  },
};
let mouse = {
  x: undefined,
  y: undefined,
  type: undefined,
};
let keys = {
  key: "up",
};

// Calculates the values with expressions
grid.pixels.y = 0.5 * canvas.height - (grid.squareSize * grid.height) / 2;
grid.pixels.width = grid.width * grid.squareSize;
grid.pixels.height = grid.height * grid.squareSize;

let scroll = {
  x: 0,
  y: 0,
  speed: 10,
};
// TODO: Make false when done testing
let inGame = true;

function drawTitleScreen(titleSize) {
  c.fillStyle = "rgb(0, 51, 0)";
  c.textAlign = "center";
  c.font = `${titleSize}px Lucida Console`;
  c.fillText(
    "Utopia Archiect",
    0.5 * canvas.width - titleSize / 2,
    titleSize + 30
  );
}

function drawGrid(xPos, yPos) {
  c.lineWidth = grid.pixels.lineWidth * 2;
  // Draws the outline of the grid and the background
  c.fillStyle = "yellowgreen";
  c.rect(xPos, yPos, grid.pixels.width, grid.pixels.height);
  c.stroke();
  c.fill();

  c.lineWidth = grid.pixels.lineWidth;

  // Draws the vertical lines of the grid
  for (let i = 1; i < grid.width; i++) {
    c.beginPath();
    c.moveTo(xPos + i * grid.squareSize, yPos);
    c.lineTo(xPos + i * grid.squareSize, yPos + grid.pixels.height);
    c.stroke();
  }
  for (let i = 1; i < grid.height; i++) {
    c.beginPath();
    c.moveTo(xPos, yPos + i * grid.squareSize);
    c.lineTo(xPos + grid.pixels.height, yPos + i * grid.squareSize);
    c.stroke();
  }
}

function keysMove(action, keysInput) {
  // * ex MoveKeys(x += 5, ["w", "ArrowUp"])
  if (keysInput.includes(keys.key)) {
    eval(`scroll.${action}`);
    // console.log(true);
  }
}

// Sets the mouse coordinates
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // mouse.move.x.push([mouse.x, mouse.y])
});

window.addEventListener("resize", function (event) {
  // Sets the canvas width to the client width and the canvas height to the client height, when the window is resized
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
});

// Moves the camera on key press
window.addEventListener("keydown", function (event) {
  /* if (event.key === "w") {
    scrollY += 50;
  }
  if (event.key === "a") {
    scrollX += 50;
  }
  if (event.key === "s") {
    scrollY -= 50;
  }
  if (event.key === "d") {
    scrollX -= 50;
  } */
  keys.key = event.key;
});

window.addEventListener("keyup", function () {
  keys.key = "up";
});

window.addEventListener("mousedown", function (event) {
  event.preventDefault();
  if (event.button == 0) {
    mouse.type = "left";
  }
  if (event.button == 1) {
    mouse.type = "middle";
  }
  if (event.type == 2) {
    mouse.type = "right";
  }
  // console.log(mouse.type);
});
window.addEventListener("mouseup", function (event) {
  mouse.type = "up";
});
function loop() {
  requestAnimationFrame(loop);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // Input
  keysMove(`y += ${scroll.speed}`, ["w", "ArrowUp"]);
  keysMove(`x += ${scroll.speed}`, ["a", "ArrowLeft"]);
  keysMove(`y -= ${scroll.speed}`, ["s", "ArrowDown"]);
  keysMove(`x -= ${scroll.speed}`, ["d", "ArrowRight"]);

  // Drawing
  if (!inGame) {
    drawTitleScreen(75);
  } else {
    drawGrid(scroll.x, scroll.y);
  }
  // console.log(keys.key);
}
loop();
