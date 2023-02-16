import { ScreenSize } from '../constants.js';
import { getRandomValue } from '../utils.js';

export class Raindrop {
  constructor() {
    this._reset();
  }

  #isOffscreen() {
    return this.y > ScreenSize.HEIGHT + this.size
      || this.x > ScreenSize.WIDTH + this.size
      || this.x < -this.size;
  }

  render(ctx) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y - this.size)
    ctx.closePath();
    ctx.stroke();
  };

  update() {
    this.x += this.hVelocity;
    this.y += this.velocity;

    if (this.#isOffscreen()) this._reset();
  };

  _reset() {
    this.size = getRandomValue(1, 6);

    this.x = getRandomValue(-ScreenSize.WIDTH * 0.3, ScreenSize.WIDTH * 1.6);
    this.y = getRandomValue(0, ScreenSize.HEIGHT);

    this.velocity = this.size;
    this.hVelocity = -this.size / 3;
  };
}
