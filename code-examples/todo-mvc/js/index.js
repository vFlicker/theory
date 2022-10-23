import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';
import { save, load } from './helpers.js';

const state = load();

const model = new Model(state);
model.on('change', state => save(state));

const view = new View();

new Controller(model, view);