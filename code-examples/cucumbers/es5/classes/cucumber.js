import { getRandomValue } from '../utils.js';
import { Raindrop } from './raindrop.js';

export class Cucumber extends Raindrop {
  render(ctx) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.size,
      this.size * 3,
      this.angle,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath();
    ctx.fill();
  }

  update() {
    super.update();
    this.angle += 0.01;
  };

  _reset() {
    super._reset();
    this.angle = getRandomValue(0, Math.PI * 2);
  };
};