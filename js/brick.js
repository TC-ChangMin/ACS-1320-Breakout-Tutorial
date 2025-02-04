/* eslint-disable import/extensions */
import Sprite from './Sprite.js';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants.js';

export default class Brick extends Sprite {
  constructor(x, y, color = 'blue') {
    super(x, y, BRICK_WIDTH, BRICK_HEIGHT, color);
    this.status = 1;
  }

  render(ctx) {
    if (this.status === 1) {
      super.render(ctx);
    }
  }
}
