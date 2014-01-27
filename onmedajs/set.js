window.onmeda.set = function( k, v ) {
	var params = [];
	if ( typeof k === 'string' ) {
		this._data[k] = v;
		params.push({
			key: k,
			value: v
		});
	}
	else if ( k.length ) {
		for (var i = k.length - 1; i >= 0; i--) {
			this._data[k[i]] = v[i];
			params.push({
				key: k[i],
				value: v[i]
			});
		}
	}
	return params;
};
