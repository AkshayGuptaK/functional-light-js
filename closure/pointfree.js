"use strict"

function identity(x) { return x }

function compose (f, g) {
    return x => f(g(x))
}

function when (predicate, consequent, alternate) {
    return (x) => {
        if (predicate(x)) return consequent(x)
        return alternate(x)
    }
}

function makeAdder(first) {
    return (second) => first + second
}

function isString(str) {
    return typeof str === "string"
}

function strBuilder(str) {
    return when(isString, compose(strBuilder, makeAdder(str)), identity)
}

var hello = strBuilder("Hello, ")
var kyle = hello("Kyle")
var susan = hello("Susan")
var question = kyle("?")()
var greeting = susan("!")()

const log = console.log.bind(console)

log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.")
log(hello() === "Hello, ")
log(kyle() === "Hello, Kyle")
log(susan() === "Hello, Susan")
log(question === "Hello, Kyle?")
log(greeting === "Hello, Susan!")
