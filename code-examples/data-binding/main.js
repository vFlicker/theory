const output = document.querySelector('#output');
const input = document.querySelector('#input');
const reset = document.querySelector('#reset');

const data = {
  _value: '',

  get value() {
    return this._value;
  },

  set value(newValue) {
    this._value = newValue;
    input.value = newValue;
    output.textContent = newValue;
  }
}

input.addEventListener('input', (evt) => {
  data.value = evt.target.value;
});

reset.addEventListener('click', () => {
  data.value = "hello world!";
});