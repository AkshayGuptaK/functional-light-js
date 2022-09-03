function identityFunctor (val) {
    return {
        map: fn => identityFunctor(fn(val)),
        fold: fn => fn(x),
        toString: `Functor${val}`
    }
}

// can repeatedly pass in functions to map
// will always return a functor to be mapped again
// any kind of operation, regardless of syntax, can be chained