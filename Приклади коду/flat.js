const sentences = [
  ['Це речення'],
  'Це вже інше речення',
  ['Тут є масив', ['в яком є масив', ['в яком є масив']]],
]

const flat = (arrays) => {
  const result = [];

  for (const item of arrays) {
    if (Array.isArray(item)) {
      result.push(...flat(item));
    } else {
      result.push(item);
    }
  }

  return result;
};

console.log(sentences.flat(3)); // ['Це речення', 'Це вже інше речення', 'Тут є масив', 'в яком є масив', 'в яком є масив']
console.log(flat(sentences)); // ['Це речення', 'Це вже інше речення', 'Тут є масив', 'в яком є масив', 'в яком є масив']
