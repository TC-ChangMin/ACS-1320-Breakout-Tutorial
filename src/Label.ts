/* eslint-disable import/extensions */
import Sprite from './Sprite';

export default class Label extends Sprite {

  text: string;
  color: string;
  x: number;
  y: number;

  constructor(x: number, y: number, text: string, color: string) {
    super(x, y, 0, 0, color);
    this.text = text;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = '16px Arial';
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}
