benchmark("bad", () => {
  const target = document.getElementById("one");

  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode("X"));
  }
});

benchmark("good", () => {
  const target = document.getElementById("two");
  
  target.appendChild(document.createTextNode("XXXXX"));

  const total = Math.ceil(2000 / (target.offsetWidth / 5));

  for (let i = 5; i < total; i++) {
      target.appendChild(document.createTextNode("X"));
  }
});

function benchmark(name, callback) {
  const start = performance.now();

  callback();

  const end = performance.now();

  const time = (end - start) / 1000;

  console.log(`${name} took ${time.toFixed(5)} seconds`);
}
