class Wizard {
  constructor(name) {
    this.name = name;
  }

  selectHandler(evt) {
    evt.target.textContent += this.name;
  }
}

const headers = document.querySelectorAll('h1');
const wizards = ['Саурон', 'Радагаст', 'Пендальф']
  .map((name) => new Wizard(name));

/**
 * Контекст буде втрачено, бо замість `this`
 * буле дорівнювати значенню `evt.currentTarget`.
 */
const contextWillBeLost = () => {
  for (let index = headers.length; index--;) {
    headers[index].addEventListener('click', wizards[index].selectHandler);
  };
};

/**
 * Так як `var` має функціональну область видимості,
 * під час кліку на будь-який елемент, ми отримаємо
 * першого чародія.
 * 
 * Можна уявити, що `var wizard = wizards[i];`
 * створюється за межами циклу, тому коли спрацює
 * listener, ми завжди будемо мати `wizards[0];`.
 */
const indexWillBeTheSame = () => {
  for (let index = headers.length; index--;) {
    var wizard = wizards[index];

    headers[index].addEventListener('click', (evt) => {
      wizard.selectHandler(evt);
    });
  };
}

/**
 * Після кліку на кожен елемент будемо мати правильну
 * назву чародія, тому що `index` буде запам'ятований
 * у LexicalEnvironment функції IIFE.
 */
const allWillBeCorrectBecauseClosure1 = () => {
  for (let index = headers.length; index--;) {
    ((currentIndex) => {
      headers[currentIndex].addEventListener('click', (evt) => {
        var wizard = wizards[currentIndex];

        wizard.selectHandler(evt);
      });
    })(index);
  };
}

/**
 * Після кліку на кожен елемент будемо мати правильну
 * назву чародія, тому що `index` буде запам'ятований
 * у LexicalEnvironment функції `listen`.
 */
const allWillBeCorrectBecauseClosure2 = () => {
  const listen = (currentIndex) => {
    var wizard = wizards[currentIndex];

    headers[currentIndex].addEventListener('click', (evt) => {
      wizard.selectHandler(evt);
    })
  }
  
  for (let index = headers.length; index--;) {
    listen(index);
  };
}

/**
 * Після кліку на кожен елемент будемо мати правильну
 * назву чародія, тому що `bind` поверне нову функцію
 * де `this` буде вказувати на об'єкт `wizard`.
 */
const allWillBeCorrectBecauseBind = () => {
  for (let index = headers.length; index--;) {
    var wizard = wizards[index];
  
    headers[index].addEventListener('click', wizard.selectHandler.bind(wizard));
  };
};

/**
 * Після кліку на кожен елемент будемо мати правильну
 * назву чародія, тому `index` буде зберігатися
 * для кожної нової ітерації циклу.
 */
 const allWillBeCorrectLet = () => {
  for (let index = headers.length; index--;) {
    let wizard = wizards[index];
  
    headers[index].addEventListener('click', (evt) => {
      wizard.selectHandler(evt);
    });
  };
};

// contextWillBeLost();
// indexWillBeTheSame();
// allWillBeCorrectBecauseClosure1();
// allWillBeCorrectBecauseClosure2();
// allWillBeCorrectBecauseBind();
allWillBeCorrectLet();