import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';
import { store } from './utils/index.js';

const data = store.getData();

const model = new Model(data);
model.on('change', (state) => store.save(state));

const view = new View();

new Controller(model, view);