const countSymbols = (string) => {
  // наша допоміжна структура — карта унікальних символів
  const map = new Map();


  // запускаємо обхід по рядку
  for (let i = 0; i < string.length; i++) {
    const char = string[i]; // беремо кожен ітерований символ
    let newValue = 1; // і скільки раз ми його зустріли, за замовчуванням один

    
    // а якщо символ вже зустрічався, тобто записаний в карту, збільшуємо
    if (map.has(char)) newValue += map.get(char)


    // оновлюємо скільки раз поточний символ стрітився
    map.set(char, newValue);
  }

  return map;
}

console.log(countSymbols(adam)); // Map(3) { a → 2, d → 1, m → 1 }
