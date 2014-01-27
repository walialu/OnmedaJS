var onmeda_ads = {
    /**
     * Smart AdServer Preview
     *
     * Method used for internal previews of our site.
     * It uses another way of calling SmartAd Scripts than our
     * public site.
     *
     * @function
     *
     * @author Marco Kellershoff <marco.kellershoff@gofeminin.de>
     * @version 0.0.1
     *
     * @param   {Number}   site_id   ID of the current site.
     * @param   {Number}   page_id   ID of the page (translates to the sas_formatid).
     *
     */
    smart_adserver_preview: function ( site_id, page_id ) {
        var format_id = 0,
            s = "sas_pageid='" + site_id + "/" + page_id + "';" +
            "sas_formatid='" + page_id + "';" +
            "sas_target='';" +
            "SmartAdServer(sas_pageid,sas_formatid,sas_target);";
        document.write(s);
    },
    /**
     * Deliver Ads based on the clients window width
     *
     * This function is a wrapper around afAd.call.
     * It is fed with various page id's (per array).
     * Then it decides which page_id to use and executes afAd.call.
     *
     * @function
     *
     * @param   {Object}   opts      Configuration object
     * @param   {Number}   site_id   Site ID
     * @param   {Array}    page_id   Array of page ids.
     *
     * @return   {Boolean}   returns always true
     *
     */
    based_on_window_width: function ( opts ) {
        if ( !window.afAd ) return false;
        if ( !opts ) return false;
        if ( !opts.site_id ) return false;
        if ( !opts.page_id ) return false;
        if ( !opts.ad_ids ) return false;
        // 480,481,851,1001
        var w = onmeda_ads.get_window_width();
        if ( w <= 480 ) {
            afAd.call('network.gofeminin.de', opts.site_id, opts.page_id[1], opts.ad_ids, sas_target);
        }
        else if ( w <= 851 ) {
            afAd.call('network.gofeminin.de', opts.site_id, opts.page_id[2], opts.ad_ids, sas_target);
        }
        else if ( w <= 1025 ) {
            afAd.call('network.gofeminin.de', opts.site_id, opts.page_id[0], opts.ad_ids, sas_target);
        }
        else {
            afAd.call('network.gofeminin.de', opts.site_id, opts.page_id[3], opts.ad_ids, sas_target);
        }
        return true;
    },
    /**
     * Cross-browser wrapper for DOMContentLoaded
     * License: MIT
     * Updated: 20101020
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     * @function
     *
     * @author: Diego Perini (diego.perini at gmail.com)
     * @version: 1.2
     *
     * @param {Object}  win  window reference
     * @param {Object}  fn   function reference
     *
     */
    contentLoaded: function (win, fn) {

        var done = false, top = true,

        doc = win.document, root = doc.documentElement,

        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    },
    /**
     * Writes SmartAd Server scripts if resolution is greater or equal..
     *
     * @function
     *
     * @author Marco Kellershoff <marco.kellershoff@gofeminin.de>
     * @version 0.0.1
     *
     * @param   {String}   w    Moo
     * @param   {String}   f1   Moo2
     * @param   {String}   f2   Moo3
     *
     */
    docwrite_formatid_if_resolution_gt_or_eq: function ( w, f1, f2 ) {
        if ( !window.afAd || !w || !f1 ) return false;
        var window_width = onmeda_ads.get_window_width(),
            i = 0;
        var get_output = function( id ) {
            return '<div id="sas_FormatID_'+id+
                '" class="sas_FormatID_'+id+
                '"><p class="ad__label">Anzeige</p>'+
                '<script type="text/javascript">afAd.render('+id+');<'+'/script>'+
                '</div>';
        };

        if ( window_width >= w ) {
            if ( typeof f1 === 'object' && f1.length ) {
                for (i=0 ; i < f1.length; i++ ) {
                    document.write( get_output(f1[i] ));
                }
            }
            else {
                document.write( get_output(f1) );
            }
        } else if ( f2 ) {
            if ( typeof f2 === 'object' && f2.length ) {
                for (i=0 ; i < f2.length; i++ ) {
                    document.write( get_output(f2[i]) );
                }
            }
            else {
                document.write( get_output(f2) );
            }
        }
    },

    /**
     * Get the client's window dimensions
     *
     * @author Marco Kellershoff <marco.kellershoff@gofeminin.de>
     *
     * @return   {Object}   Object containing width and height properties.
     *
     */
    get_window_dimension: function () {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return {width: x, height: y};
    },

    /**
     * Get the client's window width
     *
     * Wrapper function for `onmeda_ads.get_window_dimension().width`
     *
     * @author Marco Kellershoff <marco.kellershoff@gofeminin.de>
     *
     * @return {Number} Client's window width
     *
     */
    get_window_width: function () {
        return onmeda_ads.get_window_dimension().width;
    },

    /**
     * Get the client's window height
     *
     * Wrapper function for `onmeda_ads.get_window_dimension().height`
     *
     * @author Marco Kellershoff <marco.kellershoff@gofeminin.de>
     *
     * @return {Number} Client's window height
     *
     */
    get_window_height: function () {
        return onmeda_ads.get_window_dimension().height;
    },

    /**
     * Refresh the iframe we might be using in the near future to deliver epic advertisments!
     *
     * @param   {String}   fids String of Numbers seperated by commata.
     *
     * @example
     * onmeda_ads.refreshIframes('17438');
     *
     */
    refresh_iframes: function ( fids ) {

        var fid,
            f = null,
            c = null,
            a = fids.split(/,/),
            i = 0,
            length = a.length;

        try {
            for ( ; i < length; i++ ) {
                fid = a[i];
                f = document.getElementById('af_adrefresh_ifr_'+fid);

                if ( !f ) c = document.getElementById('af_adrefresh_container_' + fid);

                if ( c ) {
                    f = document.createElement('iframe');
                    f.setAttribute('id', 'af_adrefresh_ifr_'+fid);
                    f.setAttribute('scrolling', 'no');
                    f.setAttribute('frameborder', 0);
                    f.setAttribute('width', 0);
                    f.setAttribute('height', 0);
                    c.innerHTML=''; c.appendChild(f);
                }
            }

            if ( f && afAd.pageid && afAd.target ) {
                f.setAttribute('src', '/service/ifr_adrefresh.php?' +
                    'pubf=' + fid +
                    '&pubp=' + afAd.pageid +
                    '&pubt=' + escape(afAd.target) +
                    '&ts=' + onmeda.utils.get_unix_timestamp());
            }
        }
        catch(e) {}
    },
    /**
     * Some function for the used for showing wallpaper ads.
     *
     * I just changed the syntax a bit, but the original src was supplied
     * by Oliver Kuhn and written by Michaela Kaulmann
     *
     * @function
     * @author Michaela Kaulmann
     *
     * @param   {Object}   options               Configuration object
     * @param   {String}   options.color         A background color style like #ff0000.
     * @param   {String}   options.imgURL        Image URL to a background image.
     * @param   {String}   options.imgRepeat     CSS-Style definitions for background-repeat.
     * @param   {String}   options.imgPosition   CSS-Style definitions for background-position.
     * @param   {String}   options.link          Click url.
     *
     */
    wallpaper: function ( options ) {

        var IE7 = false,
            bgColorStyle='',
            bgImageStyle='',
            bgCursorStyle = '',
            posX=0,
            posY = 0,
            styles,
            htmlHead,
            styleElement;

        if ( navigator.userAgent.indexOf('MSIE 7.0') != -1 ||
            ( navigator.userAgent.indexOf('MSIE 8.0') != -1 &&
            document.documentMode == '7' ) ) {
            IE7 = true ;
        }

        if ( options.color ) {
            bgColorStyle = 'background-color:' + options.color + ';' ;
        }

        if ( options.imgURL ) {
            bgImageStyle = 'background-image:url(' + options.imgURL + ');' ;
            if ( options.imgRepeat ) {
                bgImageStyle += 'background-repeat:'  + options.imgRepeat + ';' ;
            }
            if ( options.imgPosition ) {
                var pos_einzeln = options.imgPosition.split(' ') ;
                posX = parseInt( pos_einzeln[0], 10 ) ;
                posY = parseInt( pos_einzeln[1], 10 ) ;
            }
            if (IE7) {
                posX = posX += 800 ;
            }
            bgImageStyle += 'background-position:' + posX + 'px ' + posY + 'px;';
        } else {
            bgImageStyle = '';
        }
        if (options.link) {
            bgCursorStyle = 'cursor:pointer;';
        }

        styles = '#wallpaper{background:none;' + bgColorStyle + bgImageStyle +  bgCursorStyle + '}';
        htmlHead = document.getElementsByTagName('head')[0];
        styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        if (styleElement.styleSheet) { // IE < 9
            styleElement.styleSheet.cssText = styles;
        } else {
            styleElement.appendChild(document.createTextNode(styles));
        }

        htmlHead.appendChild(styleElement);

        onmeda_ads.contentLoaded(window, function() {
            var wallpaper_div = document.getElementById('wallpaper');
            if ( !wallpaper_div ) {
                document.getElementsByClassName('doc')[0].style.zIndex = 1;
                wallpaper_div = document.createElement('div');
                wallpaper_div.id = 'wallpaper';
                wallpaper_div.style.position = 'absolute';
                wallpaper_div.style.top = 0;
                wallpaper_div.style.zIndex = 0;
                wallpaper_div.style.width = '100%';
                wallpaper_div.style.height = '100%';
                document.body.appendChild(wallpaper_div);
            }

            if ( options.link ) {
                document.getElementById('wallpaper').onclick = function() {
                    window.open(options.link);
                };
            }
        });
    }



};
