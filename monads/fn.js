const Fn = (run) => ({
  run,
  map: (f) => Fn((x) => f(run(x))), // this makes it a functor
  chain: (f) => Fn((x) => f(run(x)).run(x)), // this makes it a monad
  concat: (other) => Fn((x) => run(x).concat(other.run(x))), // this makes it a monoid
});

/* 
A functor is a data structure that has a unary operation
If the input and return types are the same, then it is an endofunctor
A monad allows you to compose functors with non-matching types
or to perform additional operations on the intervening values
A monoid is a group without inverses
*/