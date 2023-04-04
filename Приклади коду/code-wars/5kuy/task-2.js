const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

// const normalize = (number) => {
//   return number.toString().length === 1 ? `0${number}` : number;
// };

// const humanReadable = (sec) => {
//   const hours = Math.floor(sec / SECONDS_PER_HOUR);
//   const minutes = Math.floor(sec % SECONDS_PER_HOUR / SECONDS_PER_MINUTE);
//   const seconds = sec % SECONDS_PER_HOUR % SECONDS_PER_MINUTE;

//   return `${normalize(hours)}:${normalize(minutes)}:${normalize(seconds)}`;
// };

const normalize = (number) => number.toString().padStart(2, 0);

const humanReadable = (seconds) => {
  const hh = Math.floor(seconds / SECONDS_PER_HOUR);
  const mm = Math.floor(seconds % SECONDS_PER_HOUR / SECONDS_PER_MINUTE);
  const ss = seconds % SECONDS_PER_MINUTE;

  return `${normalize(hh)}:${normalize(mm)}:${normalize(ss)}`;
};

console.log(humanReadable(86461)); // '24:01:01';
console.log(humanReadable(359999 )); // '99:59:59';