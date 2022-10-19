import { InputValidator } from './input-validator.js';

const buttonElement = document.querySelector('#validate');
const emailInputElement = document.querySelector('#email');
const passwordInputElement = document.querySelector('#password');

const emailInput = new InputValidator(emailInputElement, {
  rules: {
    required: true,
    min: 5,
    max: 20,
    match: 'email'
  },
});

const passwordInput = new InputValidator(passwordInputElement, {
  rules: {
    required: true,
    password: true
  },
  messages: {
    password: 'Wrong password'
  },
  customMethods: {
    password({ data }) {
      return data.toLowerCase() === 'pass';
    },
  },
});

buttonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  emailInput.validate();
  passwordInput.validate();
});
