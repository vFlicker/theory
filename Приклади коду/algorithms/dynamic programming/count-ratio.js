const countRatio = (prices, profit) => {
  const length = prices.length;
  const profits = Array.from({ length }, () => 0);

  // Мінімальна ціна за всі минулі дні
  let minPrice = prices[0];

  for (let index = 1; index < length; index++) {
    const currentPrice = prices[index];

    // Оновлюємо мінімальну ціну
    minPrice = Math.min(minPrice, currentPrice);
    
    // Якщо продаємо, то отримуємо прибуток,
    // що дорівнює різниці поточної та мінімальної цін
    const currentProfit = currentPrice - minPrice;
    // Якщо не продаємо, значить залишаємось
    // з максимальним прибутком за попередні дні
    const prevProfit = profits[index - 1] || 0;

    profits[index] = Math.max(currentProfit, prevProfit);
  }

  const idealProfit = profits[profits.length - 1];
  const ratioInpercentage = Math.round(profit / idealProfit * 100);

  return `Ти заробив ${profit}$, а міг би ${idealProfit}$. Ти на ${ratioInpercentage}% близький до ідеалу!`;
}

console.log(countRatio([10, 3, 1, 6, 4, 3], 4));
