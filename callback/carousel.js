/**
 * Carousel callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * @param  {object} opts configuration object
 * @param  {string} [opts.ivw=undefined] IVW Tag/Code to be called
 * @param  {string} [opts.ga=undefined] Google Analytics Tag/Code to be called
 * @param  {boolean} clicked User has clicked ? true: false
 * @return {array} Array containing tracking param objects.
 * @static
 * @example onmeda.callback.carousel({ivw: 'gally-1337', ga: 'http://foobar'});
 */
window.onmeda.callback.carousel = function ( opts, clicked ) {
	if ( !opts || !clicked ) return [];
	return  this._generic( opts );
};
