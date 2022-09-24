import { Cucumber, Raindrop } from './classes/index.js';
import { ScreenSize } from './constants.js';

const cleanupFrame = (ctx) => {
  ctx.clearRect(0, 0, ScreenSize.WIDTH, ScreenSize.HEIGHT);
};

const renderFrame = (ctx, raindrops) => {
  cleanupFrame(ctx);

  raindrops.forEach((raindrop) => {
    raindrop.render(ctx);
    raindrop.update();
  });

  requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
};

const setup = () => {
  const DROPS = 600;
  const CUCUMBER_RATIO = 0.2;

  const canvas = document.querySelector('#playground');
  const ctx = canvas.getContext('2d');

  canvas.width = ScreenSize.WIDTH;
  canvas.height = ScreenSize.HEIGHT;

  const raindrops = new Array(DROPS * (1 - CUCUMBER_RATIO))
    .fill('')
    .map(() => new Raindrop())
    .concat(new Array(DROPS * CUCUMBER_RATIO)
      .fill('')
      .map(() => new Cucumber())
    );

  renderFrame(ctx, raindrops);
};

setup();