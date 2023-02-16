const time = (name, action) => {
  const start = Date.now();
  action();
  console.log(`${name} зайняло ${Date.now() - start} ms`);
}

time("bad", () => {
  const target = document.getElementById("one");
  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode("X"));
  }
});

time("good", () => {
  const target = document.getElementById("two");
  target.appendChild(document.createTextNode("XXXXX"));

  const total = Math.ceil(2000 / (target.offsetWidth / 5));

  for (let i = 5; i < total; i++) {
      target.appendChild(document.createTextNode("X"));
  }
});