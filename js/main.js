/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import Brick from './brick.js';
import CONSTANTS from './constants.js';

const {
  BALL_RADIUS, PADDLE_HEIGHT, PADDLE_WIDTH,
  BRICK_ROW_COUNT, BRICK_COLUMN_COUNT,
  BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING,
  BRICK_OFFSET_TOP, BRICK_OFFSET_LEFT,
} = CONSTANTS;

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
let rightPressed = false;
let leftPressed = false;

let interval = 0;

let score = 0;
let bricks = [];

for (let c = 0; c < BRICK_COLUMN_COUNT; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < BRICK_ROW_COUNT; r += 1) {
    const brickX = r * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
    const brickY = c * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
    bricks[c][r] = new Brick(brickX, brickY);
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - PADDLE_WIDTH / 2;
  }
}
function collisionDetection() {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c += 1) {
    for (let r = 0; r < BRICK_ROW_COUNT; r += 1) {
      let b = bricks[c][r]; // This is currently a plain object
      if (b.status == 1) {
        if (
          x > b.x
          && x < b.x + BRICK_WIDTH
          && y > b.y
          && y < b.y + BRICK_HEIGHT
        ) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score == BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c += 1) {
    for (let r = 0; r < BRICK_ROW_COUNT; r += 1) {
      if (bricks[c][r].status == 1) {
        bricks[c][r].render(ctx);
      }
    }
  }
}
function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  // eslint-disable-next-line prefer-template
  ctx.fillText('Score: ' + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
    dx = -dx;
  }
  if (y + dy < BALL_RADIUS) {
    dy = -dy;
  } else if (y + dy > canvas.height - BALL_RADIUS) {
    if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
      dy = -dy;
    } else {
      alert('GAME OVER');
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

function startGame() {
  interval = setInterval(draw, 10);
}

document.getElementById('runButton').addEventListener('click', () => {
  startGame();
});
