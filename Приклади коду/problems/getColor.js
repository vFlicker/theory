// const getColor = (level) => {
//   const colors = ['#DCD6F7', '#A6B1E1', '#B4869F'];

//   let index = -1;

//   while (level) {
//     if (index >= colors.length - 1) index = 0
//     else index += 1;

//     level -= 1;
//   }

//   return index ? colors[index] : colors[0];
// };

const getColor = (level) => {
  const colors = ['#DCD6F7', '#A6B1E1', '#B4869F'];
  const color = colors[level % 3];

  return color;
};

