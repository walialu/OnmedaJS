/*jshint undef: true */
/*jshint unused: true */
/*global window, document, $:false */

/**
 * SSW Tool callback function.
 * This method invokes a Google Analytics and/or IVW call.
 * and alteres the HTML DOM to display text based on the current selected week.
 *
 * @param {bool} clicked true, if the user has clicked the element. False if
 * not.
 * @param {
 * @return void
 * @static
 * @example onmeda.callback.tools_ssw();
 */

window.onmeda.callback.tools_ssw = function( clicked, currentSlide ) {
    var that = this,
        ssw_number = currentSlide + 2,
        flexslider = $('#KAROUSEL').children().eq(0).data('flexslider'),
        genericIvwCall = function() {
            return that._generic({
                ivw: 'SSW',
                ga: true
            });
        },
        textDivIds = {
            'IHRE_SCHWANGERSCHAFT':0,
            'IHR_BABY':0,
            'WICHTIGE_TERMINE':0,
        };

    // this toggles hidden and shown state of different parts of the contents.
    var textr = function( activate_this ) {
        activate_this = activate_this || 'IHRE_SCHWANGERSCHAFT';
        var ssw_short = $('#IHRE_SCHWANGERSCHAFT_SHORT'),
            ssw_long = $('#IHRE_SCHWANGERSCHAFT_LONG'),
            ssw_baby_short = $('#IHR_BABY_SHORT'),
            ssw_baby_long = $('#IHR_BABY_LONG'),
            ssw_dates_short = $('#WICHTIGE_TERMINE_SHORT'),
            ssw_dates_long = $('#WICHTIGE_TERMINE_LONG');

        if ( activate_this === 'IHRE_SCHWANGERSCHAFT' ){
            ssw_short.slideUp();
            ssw_long.slideDown();
            ssw_baby_short.slideDown();
            ssw_baby_long.slideUp();
            ssw_dates_short.slideDown();
            ssw_dates_long.slideUp();
        } else if ( activate_this === 'IHR_BABY' ){
            ssw_short.slideDown();
            ssw_long.slideUp();
            ssw_baby_short.slideUp();
            ssw_baby_long.slideDown();
            ssw_dates_short.slideDown();
            ssw_dates_long.slideUp();
        } else if ( activate_this === 'WICHTIGE_TERMINE' ){
            ssw_short.slideDown();
            ssw_long.slideUp();
            ssw_baby_short.slideDown();
            ssw_baby_long.slideUp();
            ssw_dates_short.slideUp();
            ssw_dates_long.slideDown();
            ssw_short.css('display', 'block');
            ssw_long.css('display', 'none');
            ssw_baby_short.css('display', 'block');
            ssw_baby_long.css('display', 'none');
            ssw_dates_short.css('display', 'none');
            ssw_dates_long.css('display', 'block');
        }
    };

    // This will unbind all old click events and attach new click events
    // later on we should try to alter the HTML that the server will serve
    //
    // If the HTML wouldn't contain all the hardcoded onclick attributes,
    // we would not need to unbind all events..
    // But for now this is a pretty
    // good workaround..
    var unbindAndBindEvents = function () {
        // unbind events from next ssw link
        $('#NEXT_SSW')
            .attr('onclick','')
            .unbind('click');
        // bind new event to next ssw link
        $('#NEXT_SSW').click(function( evt ) {
            evt.preventDefault();
            var nextSlide = currentSlide + 1;
            if ( currentSlide === flexslider.count -1 ) {
                nextSlide = 0;
            }
            flexslider.flexAnimate(nextSlide);
        });
        // unbind events from previous ssw link
        $('#LAST_SSW')
            .attr('onclick','')
            .unbind('click');
        // bind new event to previous ssw link
        $('#LAST_SSW').click(function( evt ) {
            evt.preventDefault();
            var nextSlide = currentSlide - 1;
            if ( currentSlide <= 0 ) {
                nextSlide = flexslider.count - 1;
            }
            flexslider.flexAnimate(nextSlide);
        });
        // for each item in textDivIdsArray
        $.each( textDivIds, function( value ) {
            // unbind events
            $('#' + value + '_SHORT')
                .attr('onclick','')
                .unbind('click');
            // bind new events
            $('#' + value + '_SHORT').click(function( evt ) {
                evt.preventDefault();
                textr(value);
            });
        });
    };

    // loads the data and executes the unbindAndBind method
    // the requests are cached on purpose.
    // after the request is made it will then alter the DOM
    // and insert the HTML strings received by the server.
    var loadData = function() {
        var sn = null,
            u = '/schwangerschafts_kalender_flash/get_ssw_data.php?ssw=';
        if ( document.domain !=='undefined' ) {
            sn = 'http://'+document.domain+'/selbsttests/';
        } else {
            sn = './';
        }
        $.ajax({
            url: sn + u + ssw_number,
            cache: true,
            dataType: 'json',
            success: function( msg ) {
                if ( msg.success  ) {
                    // for convenience reasons I accept that jsHint will
                    // throw an error here, because param k is never used.
                    // I could simply do a for loop, but I refuse to mix
                    // native JS for loops and jQuery.each functionality here
                    // just because jsHint does not seem to support the
                    // 'jshint ignore:line' tag here
                    $.each(msg.data, function( k, item ) {
                        $('#' + item.id + '_SHORT').html(item.short);
                        $('#' + item.id + '_LONG').html(item.long);
                        $('#' + item.id + '_ALL h2 span').html(ssw_number);
                    });
                    unbindAndBindEvents();
                    currentSlide = flexslider.currentSlide;
                    textr('IHRE_SCHWANGERSCHAFT');
                }
            }
        });
    };

    // on intital page load
    // just execute this stuff and exit - don't loadData via AJAX,
    // just exit here..!
    if ( clicked === -1 ) {
        unbindAndBindEvents();
        textr();
        return;
    }

    // this stuff is triggered when the callback event is fired and it's
    // not an initial page load
    loadData();
    genericIvwCall();
};

// we have to wait for the flexslider plugin to load all the images
// async and so we register a window onload event handler.
// this will trigger when everything on the page has been fully loaded.
// 
// Probably we can switch to attaching an flexslider onready or onload
// whatever it is called event handler later on.. but for now it is just
// working fine.
$(window).load(function() {
    if ( $('#IHRE_SCHWANGERSCHAFT_ALL').length === 1) {
        window.onmeda.callback.tools_ssw(-1, $('#KAROUSEL').children().eq(0).data('flexslider').currentSlide);
    }
});
