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
        // Original items
        assert.equal(checkout('A'), 50);
        assert.equal(checkout('B'), 30);
        assert.equal(checkout('C'), 20);
        assert.equal(checkout('D'), 15);
        assert.equal(checkout('E'), 40);
        assert.equal(checkout('F'), 10);
        
        // New items G-Z
        assert.equal(checkout('G'), 20);
        assert.equal(checkout('H'), 10);
        assert.equal(checkout('I'), 35);
        assert.equal(checkout('J'), 60);
        assert.equal(checkout('K'), 80);
        assert.equal(checkout('L'), 90);
        assert.equal(checkout('M'), 15);
        assert.equal(checkout('N'), 40);
        assert.equal(checkout('O'), 10);
        assert.equal(checkout('P'), 50);
        assert.equal(checkout('Q'), 30);
        assert.equal(checkout('R'), 50);
        assert.equal(checkout('S'), 30);
        assert.equal(checkout('T'), 20);
        assert.equal(checkout('U'), 40);
        assert.equal(checkout('V'), 50);
        assert.equal(checkout('W'), 20);
        assert.equal(checkout('X'), 90);
        assert.equal(checkout('Y'), 10);
        assert.equal(checkout('Z'), 50);
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

    // Test special offers for item H
    it('should apply special offers for item H', function() {
        assert.equal(checkout('HHHHH'), 45);     // 5H for 45
        assert.equal(checkout('HHHHHHHHHH'), 80); // 10H for 80
        assert.equal(checkout('HHHHHHHHHHH'), 90); // 10H for 80 + 1H at 10
    });

    // Test special offer for item K
    it('should apply special offer for item K', function() {
        assert.equal(checkout('KK'), 150);    // 2K for 150
        assert.equal(checkout('KKK'), 230);   // 2K for 150 + 1K at 80
    });

    // Test special offer for item N and M
    it('should apply special offer for item N and M', function() {
        assert.equal(checkout('NNN'), 120);    // 3N at 40 each
        assert.equal(checkout('NNNM'), 120);   // 3N at 40 each, M is free
        assert.equal(checkout('NNNNNNMM'), 240); // 6N at 40 each, both M are free
    });

    // Test special offer for item P
    it('should apply special offer for item P', function() {
        assert.equal(checkout('PPPPP'), 200);    // 5P for 200
        assert.equal(checkout('PPPPPP'), 250);   // 5P for 200 + 1P at 50
    });

    // Test special offer for item Q
    it('should apply special offer for item Q', function() {
        assert.equal(checkout('QQQ'), 80);     // 3Q for 80
        assert.equal(checkout('QQQQ'), 110);   // 3Q for 80 + 1Q at 30
    });

    // Test special offer for item R and Q
    it('should apply special offer for item R and Q', function() {
        assert.equal(checkout('RRR'), 150);     // 3R at 50 each
        assert.equal(checkout('RRRQ'), 150);    // 3R at 50 each, Q is free
        assert.equal(checkout('RRRRRRQQ'), 300); // 6R at 50 each, both Q are free
    });

    // Test special offer for item U
    it('should apply special offer for item U', function() {
        assert.equal(checkout('UUU'), 120);     // 3U at 40 each
        assert.equal(checkout('UUUU'), 120);    // 3U at 40 each + 1U free
        assert.equal(checkout('UUUUUU'), 200);  // 6U at 40 each - 2U free = 4U paid
    });

    // Test special offers for item V
    it('should apply special offers for item V', function() {
        assert.equal(checkout('VV'), 90);       // 2V for 90
        assert.equal(checkout('VVV'), 130);     // 3V for 130
        assert.equal(checkout('VVVV'), 180);    // 3V for 130 + 1V at 50
    });

    // Test mixed items and combined offers
    it('should calculate total for mixed items and combined offers', function() {
        assert.equal(checkout('ABCD'), 115);      // 50 + 30 + 20 + 15
        assert.equal(checkout('AAABB'), 175);     // 130 + 45
        assert.equal(checkout('AAAAAEEB'), 280);  // 200 + 80 + 0(free B)
        assert.equal(checkout('NNNMRRRQ'), 270);  // 120(NNN+free M) + 150(RRR+free Q)
        assert.equal(checkout('HHHHHVVV'), 175);  // 45(5H) + 130(3V)
    });

    // Test invalid inputs
    it('should return -1 for invalid inputs', function() {
        assert.equal(checkout('a'), -1);     // lowercase
        assert.equal(checkout('1'), -1);     // numbers
        assert.equal(checkout('AB C'), -1);  // spaces
        assert.equal(checkout('AB1'), -1);   // invalid character
        assert.equal(checkout(null), -1);    // null
        assert.equal(checkout(undefined), -1); // undefined
    });
});
