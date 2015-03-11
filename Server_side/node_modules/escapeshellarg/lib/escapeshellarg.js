function escapeshellarg(arg) {
	arg = String(arg).replace(/[^\\]'/g, function(m, i, s) {
		return m.slice(0, 1) + '\\\'';
	});
	return "'" + arg + "'";
}

module.exports = escapeshellarg;
