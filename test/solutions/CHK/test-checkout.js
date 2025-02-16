var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('CHK challenge: supermarket checkout', function() {
    // Test empty basket
    it('should return 0 for empty string', function() {
        assert.equal(checkout(''), 0);
    });

    // Test individual items
    it('should calculate price for single items', function() {
        assert.equal(checkout('A'), 50);
        assert.equal(checkout('B'), 30);
        assert.equal(checkout('C'), 20);
        assert.equal(checkout('D'), 15);
    });

    // Test special offers
    it('should apply special offer for item A', function() {
        assert.equal(checkout('AAAAAA'), 260);  // 3A special offer
        assert.equal(checkout('AAAA'), 180); // 3A special + 1 regular
    });

    it('should apply special offer for item B', function() {
        assert.equal(checkout('BB'), 45);    // 2B special offer
        assert.equal(checkout('BBB'), 75);   // 2B special + 1 regular
    });

    // Test mixed items
    it('should calculate total for mixed items', function() {
        assert.equal(checkout('ABCD'), 115);     // 50 + 30 + 20 + 15
        assert.equal(checkout('AAABB'), 175);    // 130 + 45
        assert.equal(checkout('ABCDEABCDE'), -1); // Invalid input 'E'
    });

    // Test invalid inputs
    it('should return -1 for invalid inputs', function() {
        assert.equal(checkout('a'), -1);     // lowercase
        assert.equal(checkout('1'), -1);     // numbers
        assert.equal(checkout('E'), -1);     // invalid letter
        assert.equal(checkout('AB C'), -1);  // spaces
        assert.equal(checkout(null), -1);    // null
        assert.equal(checkout(undefined), -1); // undefined
    });
});
