"use strict"

function identity (x) {
    return x
}

function countVowels(str, cont = identity ) {
    let first = (isVowel(str[0]) ? 1 : 0)
    if (str.length <= 1) return cont(first)
    return countVowels(str.slice(1), v => cont(first + v))
}

countVowels(
    "Any sentence will do."
)