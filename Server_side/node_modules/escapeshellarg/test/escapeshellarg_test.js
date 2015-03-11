var escapeshellarg = require('../');
var assert = require('assert');

assert.equal(escapeshellarg("Hello's world"), "'Hello\\'s world'")
