/**
 * Quiz callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @param  {object} opts configuration object
 * @param  {string} [opts.ivw=undefined] IVW Tag/Code to be called
 * @param  {string} [opts.ga=undefined] Google Analytics Tag/Code to be called
 * @return {array} Array containing tracking param objects.
 * @static
 * @example onmeda.callback.quiz({ivw: 'gally-1337', ga: 'http://foobar'});
 */
window.onmeda.callback.quiz = function ( opts ) {
	return  this._generic( opts );
};
