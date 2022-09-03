const { performance } = require("perf_hooks");
const { makeTransducer } = require("./derive");

// abbreviations
const log = console.log.bind(console);
const reduce = Array.prototype.reduce;

// random array generation
function randint() {
  return Math.floor(Math.random() * 10);
}

function numbers(upto) {
  return [...Array(upto).keys()];
}

function randomNumbers(upto) {
  return numbers(upto).map(randint);
}

// timer util
const timeIt = (fn) => (args) => (self) => {
  const before = performance.now();
  fn.apply(self, args);
  const after = performance.now();
  return after - before;
};

function averageTime(fn, times, testSize, args) {
  return (
    [...Array(times).keys()]
      .map(() => randomNumbers(10 ** testSize))
      .map(timeIt(fn)(args))
      .reduce((a, b) => a + b) / times
  );
}

function mapThenFilterThenReduce(mapFn, filterFn, reduceFn) {
  return this.map(mapFn).filter(filterFn).reduce(reduceFn);
}

// tests

const double = (x) => 2 * x;
const isTriple = (x) => x % 3 == 0;
const multiply = (a, b) => a * b;

function mehulForLoopStyle(mapFn, filterFn, reduceFn) {
  let result = 1;
  const arr = this;
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    const b = filterFn(mapFn(arr[i]));
    if (b) {
      result = reduceFn(result, b);
    }
  }
  return result;
}

const transducer = makeTransducer(double, isTriple);
const reducer = transducer(multiply);

const testSize = 5;
const times = 1000;

log(
  averageTime(mapThenFilterThenReduce, times, testSize, [
    double,
    isTriple,
    multiply,
  ])
);

log(averageTime(reduce, times, testSize, [reducer, 1]));

log(
  averageTime(mehulForLoopStyle, times, testSize, [double, isTriple, multiply])
);
