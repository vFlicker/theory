const TIMEOUT = 1000;

/* ---------- V1 ---------- */

// const makeSoup = () => {
//   console.log(`> Иду за продуктами`);
//   const products = [`Капуста`, `Картофель`, `Мясо`];

//   setTimeout(() => {
//     console.log(`> Нарезаю продукты: ${products.join(`, `)}`);

//     setTimeout(() => {
//       console.log(`> Продукты нарезаны!`);

//       setTimeout(() => {
//         console.log(`> Начинаю варить суп из: ${products.join(`, `)}`);

//         setTimeout(() => {
//           return Math.random() > 0.5 ?
//             console.log(`> Суп готов!`) :
//             console.log(`> Упс! Сломалась плита.`);
//         }, TIMEOUT);

//       }, TIMEOUT);

//     }, TIMEOUT);
//   }, TIMEOUT);

// };


/* ---------- V2 ---------- */

const buyProducts = () => {
  console.log(`> Иду за продуктами`);
  const products = [`Капуста`, `Картофель`, `Мясо`];

  return products;
}

const prepareProducts = (products, getResultCb) => {
  setTimeout(() => {
    console.log(`> Нарезаю продукты: ${products.join(`, `)}`);

    setTimeout(() => {
      console.log(`> Продукты нарезаны!`);
      getResultCb(products)
    });
  });
}

const getResult = (products) => {
  setTimeout(() => {
    console.log(`> Начинаю варить суп из: ${products.join(`, `)}`);

    setTimeout(() => {
      return Math.random() > 0.5 ?
        console.log(`> Суп готов!`) :
        console.log(`> Упс! Сломалась плита.`);
    }, TIMEOUT);

  }, TIMEOUT);
}

const makeSoup = () => {
  const products = buyProducts();
  prepareProducts(products, getResult)
}

makeSoup();