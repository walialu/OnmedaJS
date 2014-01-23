/**
 * Gets the height of the HTMLobject node
 * @function
 * @param {Object} node The DOM element to guess the position for.
 * @return {Number} Height of the element in pixel.
 * @static
 * @example console.log(onmeda.utils.get_height($('#moo')));
 */
window.onmeda.utils.get_height = function ( node ) {
	return node.offsetHeight;
};
