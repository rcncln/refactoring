const { statement, amount } = require('../main')

var assert = require('assert');
const invoices = require('../invoices.json')
const plays = require('../plays.json')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('statement', function () {
  it('it should return a string value', function () {
    const result = statement(invoices, plays)
    assert.equal('Statement for BigCo\n'
      + ' Hamlet: $650.00 (55 seats)\n'
      + ' As You Like It: $580.00 (35 seats)\n'
      + ' Othello: $500.00 (40 seats)\n'
      + 'Amount owed is $1,730.00\n'
      + 'You earned 47 credits\n', result)
  })
})

describe('amount', function () {
  it('amount owed should equal to 1 730 USD', function () {
    let result = 0;
    for (let perf of invoices.performances) {
      const play = plays[perf.playID];
      result += amount(perf)
    }
    assert.equal(17300, result / 10)
  })
})