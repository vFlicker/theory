/*
  Напишіть функцію, яка приймає на вхід масив рекламних
  банерів і ширину екрана користувача у пікселях. Задача
  полягає в тому, щоб знайти два різних за шириною банера,
  які ідеально вписуються в сітку на екрані користувача
  і повернути їх у масиві. Найоптимальніші банери повинні
  повністю вписуватися в сітку для будь-якого екрану
  користувача.
*/

/**
 *
 * Складність за часом — `О(n)`
 * Складність за пам'яттю — `О(1)`
 */
const findBanners = (banners, userWidth) => {
  let leftPointer = 0;
  let rightPointer = banners.length - 1;

  while (leftPointer < rightPointer) {
    const bannersWidth = banners[leftPointer] + banners[rightPointer];

    if (bannersWidth === userWidth) {
      return [banners[leftPointer], banners[rightPointer]];
    }

    if (bannersWidth > userWidth) {
      rightPointer--;
    } else {
      leftPointer++;
    }
  }
}

const banners = [40, 50, 100, 300, 700];
const userWidth = 350;
console.log(findBanners(banners, userWidth));
