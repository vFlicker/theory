import { DataValidator } from './data-validator.js';

const defaultSettings = {
  rules: {},
  messages: {
    required: 'This field is required!',
    min: 'This field must contain at least %rule% characters. %data% value is not suitable',
    max: 'This field must contain a maximum of %rule% characters. %data% value is not suitable',
    match: 'This field must contain an email address. %data% value is not suitable',
  },
};

const createMessage = (message, settings) => {
  for (const [key, value] of Object.entries(settings)) {
    message = message.replace(`%${key}%`, value);
  }

  return message;
}

export class InputValidator {
  #element = null;
  #settings = null;
  #dataValidator = null;

  constructor(element, settings) {
    this.#element = element;
    this.#settings = this.#setSettings(settings);

    this.#dataValidator = new DataValidator(settings.customMethods);
  }

  validate() {
    const results = this.#dataValidator.init(
      this.#element.value,
      this.#settings.rules
    );

    if (!results.valid) {
      const [failed] = results.failed;
      const messageTemplate = this.#settings.messages[failed.rule];
  
      const message = createMessage(messageTemplate, {
        data: results.data,
        rule: failed.param
      });

      this.#onError(message);
    } else {
      this.#onSuccess();
    }
  }

  #setSettings({ rules, messages, customMethods }) {
    return {
      rules: { ...defaultSettings.rules, ...rules },
      messages: { ...defaultSettings.messages, ...messages },
      customMethods,
    };
  }

  #onError(message) {
    const element = this.#element.parentNode;
    element.classList.add('has-error');
    element.classList.remove('has-success');
    element.querySelector('.help-block').textContent = `Error: ${message}`;
  };
  
  #onSuccess() {
    const element = this.#element.parentNode;
    element.classList.add('has-success');
    element.classList.remove('has-error');
    element.querySelector('.help-block').textContent = 'Yippee! Everything went well, your data is completely valid.';
  };
}
