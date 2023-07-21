const invoices = require('./invoices.json')
const plays = require('./plays.json')
const { TragedyCalculator, ComedyCalculator } = require('./performanceCalculator')
const { CalculatorFactory } = require('./calculatorFactory');

function statement() {
    let result = `Statement for ${invoices.customer}\n`;
    result += placeHolder()
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${volumeCredits()} credits\n`;
    return result;
}

function placeHolder() {
    let result = ''
    for (let perf of invoices.performances) {
        result += ` ${playFor(perf).name}: ${usd(amount(perf))} (${perf.audience} seats)\n`;
    }
    return result;
}

function playFor(performance) {
    return plays[performance.playID]
}

function usd(amount) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(amount / 100);
}

function totalAmount() {
    let result = 0;
    for (let perf of invoices.performances) {
        result += amount(perf);
    }
    return result
}

function amount(performance) {
    const calculator = new CalculatorFactory(performance, plays).create()
    return calculator.amount()
}

function volumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoices.performances) {
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    }
    return volumeCredits;
}

 
console.log(statement())
module.exports = {
    statement,
    amount
}