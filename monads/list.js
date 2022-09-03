function List(lst) {
  return {
    of: lst,
    fmap: (fn) => List(lst.map(fn)),
    join: () => List(lst.reduce((acc, l) => acc.concat(l), [])),
    bind: function (fn) {
      return this.fmap(fn).join();
    },
  };
}

const log = console.log.bind(console);

const double = (x) => 2 * x;
const listWith = (y) => (x) => [x, y];
const numbers = [1, 2, 3];
const letters = ["a", "b", "c"];

// Fmap
// log(List([]).fmap(double));
// log(List(numbers).fmap(double));
// log(List(numbers).fmap(listWith(4)));

// Join
// log(List(numbers).join());
// log(
//   List([
//     [1, 2],
//     [2, 3],
//     [3, 4],
//   ]).join()
// );

// Bind
// log(List(numbers).bind(double));
// log(List(numbers).bind(listWith(4)));
// log(List(numbers).bind((x) => List(letters).bind(listWith(x)).of));
