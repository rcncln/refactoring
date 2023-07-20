const invoices = require('./invoices.json')
const plays = require('./plays.json')

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
        result += ` ${playFor(perf).name}: ${usd(amount(playFor(perf), perf))} (${perf.audience} seats)\n`;
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
        result += amount(playFor(perf), perf);
    }
    return result
}

function volumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoices.performances) {
        const play = plays[perf.playID];
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    }

    return volumeCredits;
}

function amount(play, perf) {
    let result = 0;
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

console.log(statement())
module.exports = {
    statement,
    amount
}