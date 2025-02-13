/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import {
  BALL_RADIUS,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  BRICK_ROW_COUNT,
  BRICK_COLUMN_COUNT,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_OFFSET_TOP,
  BRICK_OFFSET_LEFT,
} from './constants';
import Brick from './Brick';
import Ball from './Ball';
import Paddle from './Paddle';
import Label from './Label';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let interval: any = 0;

let score = 0;
let bricks:Brick[][] = [];

// making instances
const ball = new Ball(canvas.width / 2, canvas.height - 30);
const scoreLabel = new Label(8, 20, '16px Arial', 'blue');
const paddle = new Paddle(
  (canvas.width - PADDLE_WIDTH) / 2,
  canvas.height - PADDLE_HEIGHT,
  '#0095DD',
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
);

for (let c = 0; c < BRICK_COLUMN_COUNT; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < BRICK_ROW_COUNT; r += 1) {
    const brickX = r * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
    const brickY = c * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
    bricks[c][r] = new Brick(brickX, brickY); // Ensure new Brick object is created
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e: KeyboardEvent) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e: MouseEvent) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - PADDLE_WIDTH / 2;
  }
}

function collisionDetection() {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c += 1) {
    for (let r = 0; r < BRICK_ROW_COUNT; r += 1) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          ball.x > b.x
          && ball.x < b.x + BRICK_WIDTH
          && ball.y > b.y
          && ball.y < b.y + BRICK_HEIGHT
        ) {
          ball.dy = -ball.dy;
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

function drawPaddle() {
  paddle.render(ctx);
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
  scoreLabel.text = 'Score: ' + score;
  scoreLabel.render(ctx);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render(ctx);
  drawBricks();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - BALL_RADIUS || ball.x + ball.dx < BALL_RADIUS) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < BALL_RADIUS) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - BALL_RADIUS) {
    if (ball.x > paddle.x && ball.x < paddle.x + PADDLE_WIDTH) {
      ball.dy = -ball.dy;
    } else {
      alert('GAME OVER');
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed && paddle.x < canvas.width - PADDLE_WIDTH) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.updatePosition();
}

function startGame() {
  interval = setInterval(draw, 10);
}

document.getElementById('runButton').addEventListener('click', () => {
  startGame();
});
