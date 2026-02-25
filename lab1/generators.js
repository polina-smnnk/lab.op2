function* cycle(values) {
  let index = 0;
  while (true) {
    yield values[index];
    index = (index + 1) % values.length;
  }
}


const gen = cycle(["A", "B", "C"]);

console.log(gen.next().value); // "A"
console.log(gen.next().value); // "B"
console.log(gen.next().value); // "C"
console.log(gen.next().value); // "A"
console.log(gen.next().value); // "B"