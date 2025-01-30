// eslint-disable-next-line import/extensions
import CONSTANTS from './constants.js';

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.color = '#0095DD';
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, CONSTANTS.BRICK_WIDTH, CONSTANTS.BRICK_HEIGHT);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Brick;
