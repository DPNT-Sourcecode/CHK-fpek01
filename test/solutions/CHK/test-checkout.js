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
  assert.equal(checkout('EE'), 80);

  assert.equal(checkout('EEB'), 80);
  assert.equal(checkout('EEEB'), 120);
});

it('INVALID check', function() {
  assert.equal(checkout('a'), -1);
  assert.equal(checkout('ABCa'), -1);
  assert.equal(checkout('-'), -1);
  
});


it('mix check', function() {
  assert.equal(checkout('ABCD'), 115);
  assert.equal(checkout('AAABB'), 175);

});

it('validate Fs', function() {
  assert.equal(checkout('FF'), 20);
  assert.equal(checkout('FFF'), 20);
  assert.equal(checkout('FFFF'), 30);
  assert.equal(checkout('FFFFFF'), 40);


});


it('validate with mix offers and Fs', function() {
  assert.equal(checkout('ABCDEFFF'), 175);
  assert.equal(checkout('ABCDEFF'), 175);
  assert.equal(checkout('ABCDEF'), 165);
  assert.equal(checkout('ABCDE'), 155);
  assert.equal(checkout('AAAAAEEB'), 280);
  assert.equal(checkout('AAABB'), 175);
  assert.equal(checkout('ABCD'), 115);
  


});






});