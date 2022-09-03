"use strict";

function first(str) {
    return str[0]
}

function last(str) {
    return str[str.length - 1]
}

function middle(str) {
    return str.substring(1, str.length - 1)
}

function isPalindrome(str) {
    if (str.length <= 1) return true
    if (first(str) !== last(str)) return false
    return isPalindrome(middle(str))
}

console.log( isPalindrome("") === true );
console.log( isPalindrome("a") === true );
console.log( isPalindrome("aa") === true );
console.log( isPalindrome("aba") === true );
console.log( isPalindrome("abba") === true );
console.log( isPalindrome("abccba") === true );

console.log( isPalindrome("ab") === false );
console.log( isPalindrome("abc") === false );
console.log( isPalindrome("abca") === false );
console.log( isPalindrome("abcdba") === false );
