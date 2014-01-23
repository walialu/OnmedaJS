/*
   I don't like this approach, but as of now the data-callback invoke is not
   compatible with onmeda.callback().carousel( opts ) as they take the first
   occurence of a bracket and then cut shit and do some other magic. This leads
   to breaking the function call. Now we have a public static _generic in namespace callback
   instead of private static callback which has public static methods ... some sort of messed up..
   TLDR: I did not want this - so don't ask me why I did it this way!
   @author Marco Kellershoff
   */
window.onmeda.callback._generic = function ( opts ) {
    var tracking_params = [],
        trackers = onmeda.tracker;

    if ( opts.ga ) {
        if ( !this._trackers.ga ) this._trackers.ga = new trackers.ga();
        if ( opts.ga === true ) { // virtual tracking
            tracking_params.push( this._trackers.ga.virtual() );
        }
        else { // normal tracking
            tracking_params.push( this._trackers.ga.track( { code: opts.ga } ) );
        }
    }
    if ( opts.ivw ) {

        var client_device = onmeda.get('client_device');
        if ( client_device.length &&
                client_device[0].value.toLowerCase() === 'mobile' ){
                    if ( !this._trackers.ivw_mobile ) {
                        this._trackers.ivw_mobile = new trackers.ivw_mobile();
                    }
                    tracking_params.push( this._trackers.ivw_mobile.track( { code: opts.ivw } ) );
                }
        else {
            if ( !this._trackers.ivw ) {
                this._trackers.ivw = new trackers.ivw();
            }
            tracking_params.push( this._trackers.ivw.track( { code: opts.ivw } ) );
        }

    }
    return tracking_params;
};
