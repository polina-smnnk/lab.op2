function* cycle(values) {
  let index = 0;
  while (true) {
    yield values[index];
    index = (index + 1) % values.length;
  }
}

function runWithTimeout(iterator, seconds, handler) {
  const endTime = Date.now() + seconds * 1000;
  let iteration = 0;

  function loop() {
    if (Date.now() >= endTime) return;

    const { value } = iterator.next();
    handler(value, iteration);

    iteration++;
    setTimeout(loop, 0);
  }

  loop();
}

const gen = cycle(["A", "B", "C"]);

runWithTimeout(gen, 3, (value, i) => {
  console.log(`Ітерація ${i}:`, value);
});



