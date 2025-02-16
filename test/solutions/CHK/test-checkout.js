var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('CHK chal', function() {

	it('should return 0 for empty string', function() {
	    assert.equal(checkout(''), 0);
	});

  
  it('should calculate for single item', function() {
    assert.equal(checkout('A'), 50);

    assert.equal(checkout('B'), 30);
    assert.equal(checkout('C'), 20);
    assert.equal(checkout('D'), 15);
});


it('should calculate for SPECIAL E', function() {
  assert.equal(checkout('E'), 80);

  assert.equal(checkout('EEB'), 80);
  assert.equal(checkout('EEEB'), 120);
});

it('INVALID check', function() {
  assert.equal(checkout('a'), -1);

});


it('mix check', function() {
  assert.equal(checkout('ABCD'), 115);
  assert.equal(checkout('AAABB'), 175);

});




});
