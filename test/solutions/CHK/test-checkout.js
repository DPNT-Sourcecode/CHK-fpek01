var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('CHK chal', function() {

	it('should return 0 for empty string', function() {
	    assert.equal(checkout(''), 0);
	});
});