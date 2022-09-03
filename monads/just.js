// data structure for FP
// (e.g. chaining - this is the property that makes it a monad)
// all monads are functors

function Just(val) {
  return { map, chain, ap };

  function map(fn) {
    return Just(fn(val));
  }

  function chain(fn) {
    // also called bind or flatMap
    return fn(val);
  }

  function ap(anotherMonad) {
    return anotherMonad.map(val);
  }
}

// Monadic Laws
// join (fmap join x) = join (join x)
// join (fmap return x) = join (return x) = identity
// join (fmap (y => fmap f y) x) = fmap f (join x)

//

// A category has identity and composition
