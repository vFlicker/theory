import { framework } from './framework.js';

class InputController {
  message = 'Hello World!';
  message2 = 'Hello!';
}

const myInputController = framework.controller('InputController', InputController);
framework.controller('InputController2', InputController);

window.onButtonClick = () => {
  myInputController.message = 'Clicked!';
};