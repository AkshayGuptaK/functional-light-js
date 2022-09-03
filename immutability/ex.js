"use strict";

function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(newNumber, numbers) {
	for (let i=0; i<numbers.length; i++) {
		if (numbers[i] === newNumber) return numbers
		if (numbers[i] > newNumber) return [...numbers.slice(0, i), newNumber, ...numbers.slice(i)]
	}
	return [...numbers, newNumber]
}

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
	const newNumber = lotteryNum()
	luckyLotteryNumbers = pickNumber(luckyLotteryNumbers, newNumber);
}

Object.freeze(luckyLotteryNumbers)

console.log(luckyLotteryNumbers);
