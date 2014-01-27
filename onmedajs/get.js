/**
 * Accessor for private ._data object
 * @param {string|stringarray} k key or key array.
 * Use # for ids, . for classNames and just a word for tagNames.
 * @return {array} Collection of requested key value pairs
 * @static
 */
window.onmeda.get = function ( k ) {
	var params = [];
	if ( typeof k === 'string' && this._data[k] ) {
		params.push({
			key: k,
			value: this._data[k]
		});
	}
	else {
		for (var i = k.length - 1; i >= 0; i--) {
			if ( this._data[k[i]] ) {
				params.push({
					key: k[i],
					value: this._data[k[i]]
				});
			}
		}
	}
	return params;
};
