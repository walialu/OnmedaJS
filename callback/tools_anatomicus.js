/**
 * Anatomicus callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @return void
 * @static
 * @example onmeda.callback.tools_anatomicus();
 */
window.onmeda.callback.tools_anatomicus = function () {
	return  this._generic({
		ivw: 'FLASH-ANATOMICUS',
		ga: true
	});
};
