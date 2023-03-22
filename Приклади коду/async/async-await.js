const TIMEOUT = 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buyProducts = async () => {
  console.log(`> Иду за продуктами...`);

  await delay(TIMEOUT);

  const products = [`Картофель`, `Капуста`, `Мясо`];
  return products;
};

const prepareProducts = async (products) => {
  console.log(`> Нарезаю продукты: ${products.join(`, `)}`);

  await delay(TIMEOUT);

  console.log(`> Продукты нарезаны!`);
}

const makeSoup = async (preparedProducts) => {
  console.log(`> Начинаю варить суп из: ${preparedProducts.join(`, `)}`);

  await delay(TIMEOUT);

  const ok = Math.random() > 0.5;
  if (!ok) return Promise.reject(`> Упс! Сломалась плита.`);

  return `> Суп готов!`;
};

(async () => {
  try {
    const products = await buyProducts();
    await prepareProducts(products);
    const result = await makeSoup(products);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
