/* eslint-disable import/extensions */
import Sprite from './Sprite';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants';

export default class Brick extends Sprite {
  status: number;

  constructor(x: number, y: number, color: string = 'blue') {
    super(x, y, BRICK_WIDTH, BRICK_HEIGHT, color);
    this.status = 1;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.status === 1) {
      super.render(ctx);
    }
  }
}
