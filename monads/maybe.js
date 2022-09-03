// aka option monad
function curry2(fn) {
  return (x) => (y) => fn(x, y);
}

function Just(x) {
  return {
    map: (f) => Just(f(x)),
    chain: (f) => f(x),
    ap: (m) => m.map(x),
    of: x,
  };
}

function Nothing(defaultValue) {
  return { map: Nothing, chain: Nothing, ap: Nothing, of: defaultValue };
}

const Maybe = { Just, Nothing, of: Just };

function fromNullable(val) {
  if (val == null) return Maybe.Nothing(0);
  return Maybe.of(val);
}

const monadProp = curry2(function prop(obj, prop) {
  return fromNullable(obj[prop]);
});

// another pattern
function maybeMonad(x) {
  return {
    bind: (fname) => {
      if (x == null) return Maybe.Nothing();
      return Maybe.of(x[fname]);
    },
    get: () => x,
  };
}
//x.bind('y').bind('z')
