/*
  Напишіть функцію, яка приймає на вхід масив рекламних
  банерів і ширину екрана користувача у пікселях. Задача
  полягає в тому, щоб знайти два різних за шириною банера,
  які ідеально вписуються в сітку на екрані користувача
  і повернути їх у масиві. Найоптимальніші банери повинні
  повністю вписуватися в сітку для будь-якого екрану
  користувача.
*/

// const findBanners = (banners, userWidth) => {
//   for (const firstBanner of banners) {
//     for (const secondBanner of banners) {
//       if (firstBanner.width + secondBanner.width === userWidth) {
//         return [firstBanner, secondBanner];
//       }
//     }
//   }
// }

const findBanners = (banners, userWidth) => {
  const sortedBanners = [...banners].sort((a, b) => a.width - b.width);

  let leftPointer = 0;
  let rightPointer = sortedBanners.length - 1;

  while (leftPointer < rightPointer) {
    const bannersWidth = sortedBanners[leftPointer].width + sortedBanners[rightPointer].width;

    if (bannersWidth === userWidth) {
      return [sortedBanners[leftPointer], sortedBanners[rightPointer]];
    }

    if (bannersWidth > userWidth) {
      rightPointer--;
    } else {
      leftPointer++;
    }
  }
}

const banners = [
  { width: 100 },
  { width: 200 },
  { width: 150 },
  { width: 300 },
  { width: 120 },
];

const userWidth = 350;

console.log(findBanners(banners, userWidth));
console.log(banners);
