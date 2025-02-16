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
        assert.equal(checkout('E'), 40);
        assert.equal(checkout('F'), 10);
    });

    // Test special offers for item A
    it('should apply special offers for item A', function() {
        assert.equal(checkout('AAA'), 130);      // 3A for 130
        assert.equal(checkout('AAAAA'), 200);    // 5A for 200
        assert.equal(checkout('AAAAAA'), 250);   // 5A for 200 + 1A at 50
        assert.equal(checkout('AAAAAAAA'), 330); // 5A for 200 + 3A for 130
    });

    // Test special offer for item B
    it('should apply special offer for item B', function() {
        assert.equal(checkout('BB'), 45);    // 2B for 45
        assert.equal(checkout('BBB'), 75);   // 2B for 45 + 1B at 30
    });

    // Test special offer for item E
    it('should apply special offer for item E', function() {
        assert.equal(checkout('EE'), 80);     // 2E at 40 each
        assert.equal(checkout('EEB'), 80);    // 2E at 40 each, B is free
        assert.equal(checkout('EEEB'), 120);  // 3E at 40 each, B is free
        assert.equal(checkout('EEEEBB'), 160); // 4E at 40 each, both B are free
    });

    // Test special offer for item F
    it('should apply special offer for item F', function() {
        assert.equal(checkout('FF'), 20);     // 2F at 10 each
        assert.equal(checkout('FFF'), 20);    // 2F at 10 each + 1F free
        assert.equal(checkout('FFFF'), 30);   // 3F at 10 each + 1F at 10
        assert.equal(checkout('FFFFFF'), 40); // 4F at 10 each + 2F free
    });

    // Test mixed items and combined offers
    it('should calculate total for mixed items and combined offers', function() {
        assert.equal(checkout('ABCD'), 115);      // 50 + 30 + 20 + 15
        assert.equal(checkout('AAABB'), 175);     // 130 + 45
        assert.equal(checkout('AAAAAEEB'), 280);  // 200 + 80 + 0(free B)
        assert.equal(checkout('ABCDE'), 155);     // 50 + 30 + 20 + 15 + 40
        assert.equal(checkout('ABCDEF'), 165);    // 50 + 30 + 20 + 15 + 40 + 10
        assert.equal(checkout('ABCDEFF'), 175);   // 50 + 30 + 20 + 15 + 40 + 20
        assert.equal(checkout('ABCDEFFF'), 175);  // 50 + 30 + 20 + 15 + 40 + 20
    });

    // Test invalid inputs
    it('should return -1 for invalid inputs', function() {
        assert.equal(checkout('a'), -1);     // lowercase
        assert.equal(checkout('1'), -1);     // numbers
        assert.equal(checkout('G'), -1);     // invalid letter
        assert.equal(checkout('AB C'), -1);  // spaces
        assert.equal(checkout(null), -1);    // null
        assert.equal(checkout(undefined), -1); // undefined
    });
});