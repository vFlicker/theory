// const cakes = (recipe, available) => {
//   const availableMap = new Map(Object.entries(available));

//   for (const recipeKey of Object.keys(recipe)) {
//     if (!availableMap.has(recipeKey)) return 0;
//   }

//   const result = [];
//   for (const key of Object.keys(recipe)) {
//     const availableValue = available[key];
//     const recipeValue = recipe[key];

//     if (availableValue && recipeValue) {
//       const quantity = Math.floor(availableValue / recipeValue);
//       result.push(quantity);
//     }
//   }

//   return Math.min(...result);
// };

const cakes = (recipe, available) => {
  let maxQuantity = Infinity;

  for (const key of Object.keys(recipe)) {
    if (!available[key]) {
      maxQuantity = 0;
      break;
    };

    const availableValue = available[key];
    const recipeValue = recipe[key];
    const quantity = Math.floor(availableValue / recipeValue);

    if (maxQuantity > quantity) maxQuantity = quantity;
  }

  return maxQuantity;
};

const recipe1 = {flour: 500, sugar: 200, eggs: 1};
const available1 = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};

const recipe2 = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
const available2 = {sugar: 500, flour: 2000, milk: 2000};

console.log(cakes(recipe1, available1)); // 2
console.log(cakes(recipe2, available2)); // 0
