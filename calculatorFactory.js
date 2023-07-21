const invoices = require('./invoices.json')
const plays = require('./plays.json')
const { TragedyCalculator, ComedyCalculator } = require('./performanceCalculator')

class CalculatorFactory {
    constructor(performance, plays) {
        this.performance = performance
        this.plays = plays
    }

    create() {
        switch (playFor(this.performance).type) {
            case 'tragedy':
                return new TragedyCalculator(this.performance, this.plays);
            case 'comedy':
                return new ComedyCalculator(this.performance, this.plays);
            default:
                throw new Error(`unknown type: ${playType}`);
        }
    }
}

function playFor(performance) {
    return plays[performance.playID]
}

module.exports = {
    CalculatorFactory
}