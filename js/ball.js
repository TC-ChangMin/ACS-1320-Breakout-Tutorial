/* eslint-disable import/extensions */
import { BALL_RADIUS } from './constants.js';
import Sprite from './Sprite.js';

export default class Ball extends Sprite {
  constructor(x, y, radius = BALL_RADIUS) {
    super(x, y, radius * 2, radius * 2);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'tomato';
    ctx.fill();
    ctx.closePath();
  }

  updatePosition() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
