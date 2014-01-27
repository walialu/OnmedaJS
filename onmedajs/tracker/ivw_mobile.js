/**
 * Will append an IVW Mobile Counterpixel to document.body
 * If the param 'account' is not set,
 * the default 'mobonmed' will be used.
 *
 * The appended img will be removed from document.body as soon
 * as it has loaded.
 *
 * Caching is supressed by adding a timestamp to the image path.
 *
 * You need to supply a valid IVW-'tag'.
 * @param {object} opts configuration object.
 * @param {string} [opts.account] IVW Account
 * @param {string} opts.code IVW Code/Tag
 * @constructor
 * @example new onmeda.tracker.ivw_mobile({
 *	"account": "mobonmed",
 *	"code": "gally-13370"
 * })
 *
 */
window.onmeda.tracker.ivw_mobile = function ( opts ) {
    var ivw_account = 'mobonmed',
        ivw_code = true,
        param_object = {};
    this.set_account = function ( a ) {
        ivw_account = a;
        return ivw_account;
    };
    this.get_account = function () {
        return ivw_account;
    };
    this.set_code = function ( c ) {
        ivw_code = c;
        return ivw_code;
    };
    this.get_code = function () {
        return ivw_code;
    };
    this.set_param_object = function ( k, v ) {
        param_object[k] = v;
        return param_object;
    };
    this.get_param_object = function () {
        return param_object;
    };


    // defaults
    this.set_param_object('type', 'ivw_mobile');
    this.set_param_object('account', this.get_account());

    this.track = function ( opts ) {
        var excluded_domains = new Array('www.onmeda.es'),
            temp_ivw_code = this.get_code(),
            temp_ivw_account = this.get_account(),
            iam_data = {};

        if ( location.href.indexOf(excluded_domains) != -1 ) return;

        if ( typeof opts === 'object' ) {
            if ( opts.code ) {
                temp_ivw_code = opts.code;
            }
            if ( opts.account ) {
                temp_ivw_account = opts.account;
            }
        }

        if ( temp_ivw_account === '' ) {
            this.set_param_object('error', 'account is not set.');
            return this.get_param_object();
        }
        if ( temp_ivw_code === '' || temp_ivw_code === true ) {
            if ( window.iam_data.indexOf('m-') !== 0 ) {
                temp_ivw_code = 'm-' + temp_ivw_code;
            }
            iam_data = window.iam_data;
            if ( iam_data.cp.indexOf('m-') !== 0 ) {
                iam_data.cp = 'm-' + iam_data.cp;
            }
        } else {
            if ( temp_ivw_code.indexOf('m-') !== 0 ) {
                temp_ivw_code = 'm-' + temp_ivw_code;
            }
            iam_data = {
                'st':temp_ivw_account,
                'cp':temp_ivw_code,
                'sv':'ke',
                'co':'kommentar'
            };
        }


        this.set_param_object('account', temp_ivw_account);
        this.set_param_object('code', temp_ivw_code);
        iom.c(iam_data, 1);

        return this.get_param_object();
    };
    if ( typeof opts === 'object' ) {
        if ( !opts.code || !opts.account ) return false;
        var temp_tracker = new onmeda.tracker.ivw_mobile();
        return temp_tracker.track({code: opts.code, account: opts.account});
    }
};
