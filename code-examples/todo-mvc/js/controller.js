export class Controller {
  #model = null;
  #view = null;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    view.on('add', this.addTodo);
    view.on('toggle', this.toggleTodo);
    view.on('edit', this.editTodo);
    view.on('remove', this.removeTodo);

    view.renderItems(model.items);
  }

  addTodo = async (title) => {
    const item = await this.#model.addItem({
      id: Date.now().toString(),
      title,
      completed: false
    });

    this.#view.addItem(item);
  }

  toggleTodo = async ({ id, completed }) => {
    const item = await this.#model.updateItem(id, { completed });

    this.#view.toggleItem(item);
  }

  editTodo = async ({ id, title }) => {
      const item = await this.#model.updateItem(id, { title });

      this.#view.editItem(item);
  }

  removeTodo = async (id) => {
      await this.#model.removeItem(id);
      this.#view.removeItem(id);
  }
}
