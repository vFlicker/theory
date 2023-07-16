const cardinalMap = new Map(Object.entries({
  'NORTH': 'SOUTH',
  'SOUTH': 'NORTH',
  'EAST': 'WEST',
  'WEST': 'EAST',
}));

/**
 * Дуже поганий спосіб.
 * 
 * 1. Він використовує рекурсію, отже якщо вхідний масив
 * буде містити ~100 000, наш стек переповниться,
 * і буде помилка.
 * 
 * 2. Якщо елементів буде не так багато, ця функція все
 * одно буде працювати повільніше ніж реалізація
 * без рекурсії.
 * 
 * 3. У цій функції використовується slice, что робить
 * її теж більше повільною.
 * Ми могли б просто скопіювати вхідний масив
 * та використовувати splice, це б трішки пришвидшило
 * функцію, але проблеми від рекурсії залишилися б.
 */
// const dirReduc = (cardinal) => {
//   for (let index = 0; index < cardinal.length; index++) {
//     const currentIndex = index;
//     const nextIndex = index + 1;
//     const firstQuarter = cardinal[currentIndex];
//     const secondQuarter = cardinal[nextIndex];

//     if (cardinalMap.get(firstQuarter) === secondQuarter) {
//       const reducedCardinal = [
//         ...cardinal.slice(0, currentIndex),
//         ...cardinal.slice(nextIndex + 1),
//       ]

//       return dirReduc(reducedCardinal);
//     }
//   }

//   return cardinal;
// };

const dirReduc = (cardinal) => {
  const simplifiedCardinal = [];

  for (let index = 0; index < cardinal.length; index++) {
    const currentQuarter = cardinal[index];

    // Якщо використовувати simplifiedCardinal[simplifiedCardinal.length - 1]
    // код буде працювати швидше
    if (simplifiedCardinal.length === 0 || simplifiedCardinal.at(-1) !== cardinalMap.get(currentQuarter)) {
      simplifiedCardinal.push(currentQuarter);
    } else {
      simplifiedCardinal.pop();
    }
  }

  return simplifiedCardinal;
};

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // "WEST"
