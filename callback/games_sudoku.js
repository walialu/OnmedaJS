/**
 * Sudoku callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @return void
 * @static
 * @example onmeda.callback.games_sudoku();
 */
window.onmeda.callback.games_sudoku = function () {
	return  this._generic({
		ivw: 'SUDOKU',
		ga: true
	});
};
