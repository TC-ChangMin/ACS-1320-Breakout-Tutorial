// eslint-disable-next-line import/extensions
import CONSTANTS from './constants.js';

export default class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = CONSTANTS.BALL_RADIUS;
    this.dx = 2;
    this.dy = -2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  // Update ball position
  updatePosition() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
