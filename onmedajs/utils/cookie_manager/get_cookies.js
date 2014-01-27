/**
 * Cookiemonster function
 * @function
 * @returns {array} Cookies array
 */
window.onmeda.utils.cookie_manager.get_cookies = function () {
	var cookies = {},
		all = document.cookie;
	if ( all === "" )
		return cookies;
	var list = all.split("; "),
		i = 0;
	for ( i = 0; i < list.length; i++ ) {
		var cookie = list[i],
			p = cookie.indexOf("="),
			name = cookie.substring(0,p),
			value = cookie.substring(p+1);
		value = decodeURIComponent(value);
		cookies[name] = value;
	}
	return cookies;
};
