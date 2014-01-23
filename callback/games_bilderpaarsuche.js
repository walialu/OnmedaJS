/**
 * Bilderpaarsuche callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @return void
 * @static
 * @example onmeda.callback.games_bilderpaarsuche();
 */
window.onmeda.callback.games_bilderpaarsuche = function () {
	return  this._generic({
		ivw: 'MEMORY',
		ga: true
	});
};
