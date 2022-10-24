import { EventEmitter } from './utils/index.js';

const wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export class Model extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
  }

  async getItem(id) {
    await wait(2000);

    return this.items.find((item) => item.id === id);
  }

  async addItem(item) {
    await wait(2000);

    this.items.push(item);

    // save to storage
    this.emit('change', this.items);

    return item;
  }

  async updateItem(id, data) {
    const item = await this.getItem(id);

    for (const [key, value] of Object.entries(data)) {
      item[key] = value;
    }

    // save to storage
    this.emit('change', this.items);

    return item;
  }

  async removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    console.log(this.items, id);

    if (index > -1) {
      await wait(2000);

      this.items.splice(index, 1);

      // save to storage
      this.emit('change', this.items);
    }
  }
}
