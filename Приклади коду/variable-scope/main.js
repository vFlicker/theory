function Wizard(name) {
  this.name = name;
}

Wizard.prototype.selectHandler = function(evt) {
  evt.target.textContent += ': ' + this.name;
}

const headers = document.querySelectorAll('h1');

const wizards = ['Саурон', 'Радагаст', 'Пендальф'].map((name) => new Wizard(name));

// for (var i = headers.length; i--;) {
//   var header = headers[i];
//   header.addEventListener('click', wizards[i].selectHandler);
// };

// for (var i = headers.length; i--;) {
//   var header = headers[i];
//   var wizard = wizards[i];
//   header.addEventListener('click', function (evt) {
//     wizard.selectHandler(evt);
//   });
// };

// for (var i = headers.length; i--;) {
//   (function(i) {
//     var header = headers[i];
//     var wizard = wizards[i];
//     header.addEventListener('click', function (evt) {
//       wizard.selectHandler(evt);
//     });
//   }(i));
// };

// const listen = function(header, wizard) {
//   header.addEventListener('click', function(evt) {
//     wizard.selectHandler(evt);
//   })
// }

// for (var i = headers.length; i--;) {
//   listen(headers[i], wizards[i]);
// };

// for (var i = headers.length; i--;) {
//   (function(header, wizard) {
//     header.addEventListener('click', function (evt) {
//       wizard.selectHandler(evt);
//     });
//   }(headers[i], wizards[i]));
// };

// for (var i = headers.length; i--;) {
//   var header = headers[i];
//   var wizard = wizards[i];
//   header.addEventListener('click', wizard.selectHandler.bind(wizard));
// };
