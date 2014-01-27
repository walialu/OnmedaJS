/**
 * Returns the unix timestamp.
 * @function
 * @returns {Number} The unix timestamp.
 * @static
 * @example console.log('Current unix timestamp is: '+ onmeda.utils.get_unix_timestamp());
 */
window.onmeda.utils.get_unix_timestamp = function () {
	return Math.round(new Date().getTime() / 1000);
};
