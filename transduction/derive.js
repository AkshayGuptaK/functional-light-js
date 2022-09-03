// problem statement

const numbers = [1, 3, 4, 6, 9, 12, 13, 16, 21];

const add1 = (v) => v + 1;
const isOdd = (v) => v % 2 === 1;
const sum = (total, v) => total + v;

// console.log(numbers.map(add1).filter(isOdd).reduce(sum));

// helper functions

function compose(fn1, fn2) {
  return (x) => fn1(fn2(x));
}

function curry2(fn) {
  return (first) => (second) => fn(first, second);
}

// derivation

const mapReducer = curry2(function (mapFn, combineFn) {
  return function reducer(acc, val) {
    return combineFn(acc, mapFn(val));
  };
});

const filterReducer = curry2(function (predicateFn, combineFn) {
  return function reducer(acc, val) {
    if (predicateFn(val)) return combineFn(acc, val);
    return acc;
  };
});

function makeTransducer(mapFn, filterFn) {
  return compose(mapReducer(mapFn), filterReducer(filterFn));
}

function transduce(transducer, reducer, start, arr) {
  return arr.reduce(transducer(reducer), start);
}

exports.makeTransducer = makeTransducer;

// tests

const transducer = makeTransducer(add1, isOdd);

const result = transduce(transducer, sum, 0, numbers);

console.log(result === 42);
