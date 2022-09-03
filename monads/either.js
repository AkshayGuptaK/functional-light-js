function Right (x) {
    return {
        chain: fn => fn(x),
        map: fn => Right(fn(x)),
        fold: (f, g) => g(x),
        toString: `Right(${x})`
    }
}

function Left (x) {
    return {
        chain: fn => Left(x),
        map: fn => Left(x),
        fold: (f, g) => f(x),
        toString: `Left(${x})`
    }
}

// can be used for error handling
// functions as an inverted if-else

function fromNullable(val) {
    if (val === null) return Left()
    return Right(val)
}

function tryCatch(fn) {
    try {
        return Right(fn())
    } catch(e) {
        return Left(e)
    }
}
