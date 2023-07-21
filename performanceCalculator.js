class PerformanceCalculator {
    constructor(performance, play) {
        this.performance = performance
        this.play = play
    }
}


class TragedyCalculator extends PerformanceCalculator {
    amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }

        return result
    }
}

class ComedyCalculator extends PerformanceCalculator {
    amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result
    }
}

module.exports = {
    TragedyCalculator,
    ComedyCalculator
}