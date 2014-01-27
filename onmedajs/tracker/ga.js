/**
 * Will send a request to Google Analytics
 * @param {Object} opts configuration object.
 * @param {string} [opts.account] Google Analytics Account
 * @param {string} opts.code Google Analytics code that should be tracked.
 * @constructor
 * @example:
 * new onmeda.tracker.ga({
 *	code: 'galleries/moo.html',
 *	account: 'UA-115586-14' // onmeda.es default account
 * });
 * new onmeda.tracker.ga().track({
 *	code: 'galleries/moo.html',
 *	account: 'UA-115586-14' // onmeda.es default account
 * });
 * new onmeda.tracker.ga().track({account: 'UA-115586-14'}).virtual();
 */
window.onmeda.tracker.ga = function ( opts ) {
	var account = 'UA-32616126-1',
		code = null,
		pagetracker = null,
		param_object = {};

	this.set_account = function ( a ) {
		account = a;
		return account;
	};
	this.get_account = function () {
		return account;
	};
	this.set_code = function ( c ) {
		code = c;
		return code;
	};
	this.get_code = function () {
		return code;
	};
	this.set_pagetracker = function ( p ) {
		pagetracker = p;
		return pagetracker;
	};
	this.get_pagetracker = function () {
		return pagetracker;
	};
	this.set_param_object = function ( k, v ) {
		param_object[k] = v;
		return param_object;
	};
	this.get_param_object = function () {
		return param_object;
	};

	this.virtual = function () {
		var c = (''+document.location).replace(/^https?:\/\/.*?\//gi,'/virtual/'),
			temp_tracker = new onmeda.tracker.ga();
		return temp_tracker.track( { code: c } );
	};

	// defaults
	this.set_param_object('type', 'google_analytics');
	this.set_param_object('account', this.get_account());

	this.track = function ( opts ) {
		if ( !opts.code ) {
			this.set_param_object('error', 'code not set.');
			return this.get_param_object();
		}
		if ( !window._gat ) {
			this.set_param_object('error', 'window._gat is undefined.');
			return this.get_param_object();
		}
		if ( opts.account )
			this.set_account(opts.account);
		if ( opts.code )
			this.set_code(opts.code);


		this.set_param_object('account', this.get_account());
		this.set_param_object('code', this.get_code());

		pagetracker = window._gat._getTracker( account );

		pagetracker._trackPageview( this.get_code() );
		return this.get_param_object();
	};

};
