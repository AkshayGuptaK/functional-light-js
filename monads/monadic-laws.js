const log = console.log.bind(console);

function just(x) {
  return {
    map: (fn) => just(fn(x)),
    chain: (fn) => fn(x),
    toString: `Just${x.toString}`,
  };
}

function test() {
  const x = 1;
  const f = (x) => just(2 * x);
  const g = (x) => x - 3;
  log(just(x).chain(f).toString === f(x).toString);
  log(just(3).chain(just).toString === just(just(3).toString));
  log(just(x).chain(f).chain(g) === just(x).chain((x) => just(f(x)).chain(g)));
}

test(just);

// bind(unit(x), f) ≡ f(x)
// bind(m, unit) ≡ m
// bind(bind(m, f), g) ≡ bind(m, x ⇒ bind(f(x), g))

// join (fmap join x) = join (join x)
// join (fmap return x) = join (return x) = identity
// join (fmap (y => fmap f y) x) = fmap f (join x)
