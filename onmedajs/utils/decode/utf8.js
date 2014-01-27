/**
 * Decodes any given valid UTF-8 string to ISO.
 * @function
 * @param {String} str A valid UTF-8 string.
 * @returns {String} ISO decoded string.
 * @static
 * @example var utf8Str = 'mÃ¼sli';
 * console.log( onmeda.utils.decode.utf8( utf8Str ) );
 */
window.onmeda.utils.decode.utf8 = function ( str ) {
	return decodeURIComponent( str );
};
