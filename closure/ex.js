"use strict";

function strBuilder(str) {
	return function insideStrBuilder(str2) {
		if(typeof str2 === "string") {
			return strBuilder(str + str2)
		}
		return str // the concatenated string
	};
}

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

const log = console.log.bind(console)

log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
log(hello() === "Hello, ");
log(kyle() === "Hello, Kyle");
log(susan() === "Hello, Susan");
log(question === "Hello, Kyle?");
log(greeting === "Hello, Susan!");
