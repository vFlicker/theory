import { createElement, EventEmitter } from './utils/index.js';

const ButtonText = {
  CHANGE: 'Change',
  DELETE: 'Delete',
  SAVE: 'Save',
};

export class View extends EventEmitter {
  #input = document.querySelector('#add-input');
  #list = document.querySelector('#todo-list');

  constructor() {
      super();

      document
        .querySelector('#todo-form')
        .addEventListener('submit', this.#handleFormSubmit);
  }

  renderItems(todos) {
    for (const todo of todos) {
      const listItem = this.#createListItem(todo);
      this.#list.appendChild(listItem);
    }
  }

  addItem(todo) {
      this.#input.value = '';

      const listItem = this.#createListItem(todo);
      this.#list.appendChild(listItem);
  }

  toggleItem({ completed, id }) {
      const listItem = this.#findItem(id);
      const checkbox = listItem.querySelector('.checkbox');

      checkbox.checked = completed;

      if (completed) {
          listItem.classList.add('completed');
      } else {
          listItem.classList.remove('completed');
      }
  }

  editItem({ id, title }) {
    const itemElement = this.#findItem(id);
    const labelElement = itemElement.querySelector('.title');
    const editButtonElement = itemElement.querySelector('button.edit');

    labelElement.textContent = title;
    editButtonElement.textContent = ButtonText.CHANGE;
    itemElement.classList.remove('editing');
  }

  removeItem(id) {
    const itemElement = this.#findItem(id);
    this.#list.removeChild(itemElement);
  }

  #createListItem({ completed, title, id }) {
    const checkboxElement = createElement(
      'input',
      {
        type: 'checkbox',
        className: 'checkbox',
        checked: completed ? 'checked' : '',
      },
    );

    const labelElement = createElement(
      'label',
      {
        className: 'title',
      },
      title,
    );

    const editInputElement = createElement(
      'input',
      {
        type: 'text',
        className: 'textfield',
      },
    );

    const editButtonElement = createElement(
      'button',
      {
        className: 'edit',
      },
      ButtonText.CHANGE,
    );

    const deleteButtonElement = createElement(
      'button',
      {
        className: 'remove',
      },
      ButtonText.DELETE,
    );

    const itemElement = createElement(
      'li',
      {
        className: `todo-item${completed ? ' completed': ''}`,
        'data-id': id
      },
      checkboxElement,
      labelElement,
      editInputElement,
      editButtonElement,
      deleteButtonElement,
    );

    return this.#itemAddEventListeners(itemElement);
  }

  #findItem(id) {
    return this.#list.querySelector(`[data-id="${id}"]`);
  }

  #itemAddEventListeners(item) {
    const checkboxElement = item.querySelector('.checkbox');
    const editButtonElement = item.querySelector('button.edit');
    const removeButtonElement = item.querySelector('button.remove');

    checkboxElement.addEventListener('change', this.#handleCheckboxToggle);
    editButtonElement.addEventListener('click', this.#handleEditButtonClick);
    removeButtonElement.addEventListener('click', this.#handleRemoveButtonClick);

    return item;
  }

  #handleFormSubmit = (evt) => {
    evt.preventDefault();

    const value = this.#input.value;

    if (!value) {
      alert('Please, enter the name of the task.');
      return;
    }

    this.emit('add', value);
  }

  #handleCheckboxToggle = ({ target }) => {
    const itemElement = target.parentNode;
    const id = itemElement.getAttribute('data-id');
    const completed = target.checked;

    this.emit('toggle', { id, completed });
  }

  #handleEditButtonClick = ({ target }) => {
    const itemElement = target.parentNode;
    const inputElement = itemElement.querySelector('.textfield')
    const isEditing = itemElement.classList.contains('editing');

    if (isEditing) {
      const id = itemElement.getAttribute('data-id');
      const title = inputElement.value;

      this.emit('edit', { id, title });
    } else {
      const labelElement = itemElement.querySelector('.title');
      const editButtonElement = itemElement.querySelector('button.edit');

      inputElement.value = labelElement.textContent;
      editButtonElement.textContent = ButtonText.SAVE;
      itemElement.classList.add('editing');
    }
  }

  #handleRemoveButtonClick = ({ target }) => {
    const id = target.parentNode.getAttribute('data-id');
    this.emit('remove', id);
  }
}
