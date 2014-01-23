/**
 * This method establishes an ajax request.
 * @function
 * @param opts the Configuration object.
 * @param {String} opts.method The request method. POST or GET.
 * @param {String} opts.url The url to query.
 * @param {Function} opts.success A callback function that is executed on success.
 * @param {Function} opts.failure A callback function that is executed on failure.
 * @param {String} opts.params Parameters which are sent when using POST as request method. Example: opts.params: 'id=7&title=moo'
 * @constructor
 * @return {undefined}
 */
window.onmeda.ajax.request = function ( opts ) {
	var xmlHttp = null;

	try {
		xmlHttp = new XMLHttpRequest();
	}
	catch( err ) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch( err1 ) {
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch( err2 ) {
				xmlHttp = null;
			}
		}
	}

	if ( xmlHttp ) {
		opts.method = opts.method.toUpperCase();
		xmlHttp.open( opts.method, opts.url, true );
		if ( opts.oldPost ) {
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xmlHttp.onreadystatechange = function () {
			if ( xmlHttp.readyState == 4 ) {
				var json = onmeda.utils.decode.json(xmlHttp.responseText);
				if( json.success ) {
					if ( typeof( opts.success ) == 'function' ) {
						opts.success( xmlHttp.responseText );
					}
				}
				else {
					if ( typeof( opts.failure ) == 'function' ) {
						opts.failure( xmlHttp.responseText );
					}
				}
			}
		};

		if ( opts.method == 'POST' && typeof( opts.params ) != 'undefined' ) {
			xmlHttp.send( opts.params );
		}
		else {
			xmlHttp.send( null );
		}
	}
};
