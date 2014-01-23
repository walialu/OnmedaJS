/**
 * Braintuner callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @return void
 * @static
 * @example onmeda.callback.games_braintuner();
 */
window.onmeda.callback.games_braintuner = function () {
	return  this._generic({
		ivw: 'BRAINTUNER',
		ga: true
	});
};
