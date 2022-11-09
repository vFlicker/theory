// const guitarStore = function() {
//   this.guitarCount = 2;

//   (function() {
//     this.guitarCount = 1;
//   })();

//   console.log(this.guitarCount);
// };

// const guitarShop = {
//   guitarCount: 3,
//   showMeAnswer() {
//     console.log(this.guitarCount);
//   }
// };

// guitarStore(); // 1
// new guitarStore(); // 2
// guitarShop.showMeAnswer(); // 3
// new guitarShop.showMeAnswer; // error
// guitarStore.apply(guitarStore); // 2
// guitarShop.showMeAnswer.apply(guitarStore); // undefined
// guitarStore.bind({})(); // 2
