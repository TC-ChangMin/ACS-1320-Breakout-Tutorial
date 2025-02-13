/* eslint-disable import/extensions */
import { BALL_RADIUS } from './constants';
import Sprite from './Sprite';

export default class Ball extends Sprite {
  radius: number;
  dx: number;
  dy: number;
  x: number;
  y: number;

  constructor(x: number, y: number, radius = BALL_RADIUS) {
    super(x, y, radius * 2, radius * 2);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  render(ctx: CanvasRenderingContext2D) {
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
