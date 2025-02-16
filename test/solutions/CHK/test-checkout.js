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
 


it('check for mixed comb offer', function() {

  assert.equal(checkout('NNNMRRRQ'), 270);
  assert.equal(checkout('HHHHHVVV'), 175);
  assert.equal(checkout('VV'), 90);
  assert.equal(checkout('VVV'), 130);
  assert.equal(checkout('VVVV'), 180);
  assert.equal(checkout('UUUU'), 120);
  assert.equal(checkout('RRRQ'), 150);
  assert.equal(checkout('RRRRRRQQ'), 300);
  assert.equal(checkout('PPPPP'), 200);
  assert.equal(checkout('VVVV'), 180);
  assert.equal(checkout('VVVVV'), 220);
  
});




it('new complex', function() {

  assert.equal(checkout('STXAAAAA'), 245);
  assert.equal(checkout('HHHHHVVV'), 175);
  assert.equal(checkout('NNNMRRRQ'), 270);
  assert.equal(checkout('KKKK'), 240);
  assert.equal(checkout('KKK'), 190);
  assert.equal(checkout('STXS'), 62);
  

  
});


});