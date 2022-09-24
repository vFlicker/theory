const bind = (fn, ctx) => (...args) => fn.apply(ctx, args);

// bind дозволяє фіксувати параметри
const logSum = (left, right) => console.log(`left + right = ${left + right}`);
const addToFive = logSum.bind({}, 5);
const printFivePlusSeven = addToFive.bind({}, 7);