"use strict";

// Put your code here! :)
function constant(val) {
    return () => val
}

const one = constant(1)
const two = constant(2)

function add(a, b) {
    return a + b
}

function add2(fn1, fn2) {
    return add(fn1(), fn2())
}

function addnLoop(fns) {
    let result = () => add2(fns[0], fns[1])
    let i = 2
    while (i < fns.length) {
        result = () => add2(result, fns[i])
        i++
    }
    return result()
}

function addnLoop(fns) {
    fns = fns.slice()
    while (fns.length > 2) {
        let [fn0, fn1, ...rest] = fns
        fns = [
            () => add2(fn0, fn1),
            ...rest
        ]
    }
    return add2(fns[0], fns[1])
}

function addnRecur([fn0, fn1, ...rest]) {
    let result = () => add2(fn0, fn1)
    if (rest.length === 0) {
        return result()
    }
    return addnRecur([result, ...rest])
}

function addnReduce(fns) {
    return fns.reduce((composedFn, fn) => () => add2(composedFn, fn))()
}

function uniquesOnly(arr) {
    return arr.filter((num, ind) => !arr.slice(0, ind).includes(num))
}

function uniquesOnly(numbers) {
    return numbers.reduce(function addUniques(acc, num) {
        if (acc.includes(num)) return acc
        return [...acc, num]
    }, [])
}

function evensOnly(arr) {
    return arr.filter(num => num % 2 === 0)
}

// tests
const log = console.log.bind(console)
const numFns = Object.freeze([one, two, two, one, two])
const numbers = [4,3,3,7,4,2,2,1]

log(one() === 1)
log(two() === 2)
log(add(2, 2) === 4)
log(add(one(), two()) === 3)
log(add2(one, two) === 3)
log(addnLoop(numFns) === 8)
log(addnRecur(numFns) === 8)
log(addnReduce(numFns) === 8)
log(JSON.stringify(uniquesOnly(numbers)) === JSON.stringify([4,3,7,2,1]))
log(JSON.stringify(evensOnly(numbers)) === JSON.stringify([4,4,2,2]))
log(JSON.stringify(evensOnly(uniquesOnly(numbers))) === JSON.stringify([4,2]))
log(addnReduce(evensOnly(uniquesOnly(numbers)).map(constant)) === 6)
