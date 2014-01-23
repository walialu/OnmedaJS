/**
 * Registers the event handlers for all modules
 * @param  {object} window   global window object
 * @param  {object} document global document object
 * @static
 * @return {void} returns nothing
 */
window.onmeda.init = function (window, document) {
    if ( typeof window.$ === 'undefined' )
        window.$ = window.$j;

    $( document ).ready(function() {

        var login_user = function()
        {
            $.ajax({
                url: 'http://www.onmeda.de/forum/onmeda_api.php?q=user/login&t=' + window.onmeda.utils.get_unix_timestamp(),
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    'usr': $('#username')[0].value,
                    'pwd': $('#password')[0].value
                },
                success: function( msg ) {
                    if ( msg.success  )
                    {
                        //load_userdata();
                        window.location.reload(true);
                    }
                    else
                    {
                        var creds_div = ( $('.login-inline__fields .alert.alert--warning').length === 0 ) ? document.createElement('div') : $('.login-inline__fields .alert.alert--warning'),
                            login_fields = $('.login-inline__fields');

                        if ( !creds_div.length ) {
                            creds_div.className = 'alert alert--warning';
                            creds_div.innerHTML = 'Falscher Benutzername oder falsches Passwort';
                            $('.login-inline__fields').append(creds_div);
                        }
                    }
                }
            });
        };

        var login_user_ie = function() {
            $.ajax({
                url: '/forum/onmeda_api.php?q=user/login&t=' + window.onmeda.utils.get_unix_timestamp(),
                type: 'POST',
                data: {
                    'usr': $('#username')[0].value,
                    'pwd': $('#password')[0].value
                },
                success: function( msg ) {
                    if ( msg.success  ) {
                        //load_userdata_ie();
                        window.location.reload(true);
                    } else {
                        var creds_div = ( $('.login-inline__fields .alert.alert--warning').length === 0 ) ? document.createElement('div') : $('.login-inline__fields .alert.alert--warning'),
                            login_fields = $('.login-inline__fields');

                        if ( !creds_div.length ) {
                            creds_div.className = 'alert alert--warning';
                            creds_div.innerHTML = 'Falscher Benutzername oder falsches Passwort';
                            $('.login-inline__fields').append(creds_div);
                        }
                    }
                }
            });
        };

        var load_userdata = function() {
            $.ajax({
                url: 'http://www.onmeda.de/forum/onmeda_api.php?q=user/get_userbar_html&t=' + window.onmeda.utils.get_unix_timestamp(),
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function( msg )
                {
                    if ( msg.success  )
                    {
                        var node = $('.login-inline-link.display-toggler')[0];
                        $('#existuserlogin').next().hide();
                        $('#existuserlogin').html(msg.data);
                        node.removeChild(node.childNodes[1]);
                        node.appendChild(document.createTextNode(msg.username));
                    }
                }
            });
        };

        var load_userdata_ie = function()
        {
            $.ajax({
                url: '/forum/onmeda_api.php?q=user/get_userbar_html&t=' + window.onmeda.utils.get_unix_timestamp(),
                success: function( msg )
                {
                    if ( msg.success  )
                    {
                        var node = $('.login-inline-link.display-toggler')[0];
                        $('#existuserlogin').next().hide();
                        $('#existuserlogin').html(msg.data);
                        node.removeChild(node.childNodes[1]);
                        node.appendChild(document.createTextNode(msg.username));
                    }
                }
            });
        };

        var isIE = (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) ? true : false;

        $('#existuserlogin').submit( function( evt )  {
            if ( isIE )
                login_user_ie();
            else
                login_user();

            return false;
        });

        // load userbar
        if ( isIE ) {
            load_userdata_ie();
        } else {
            load_userdata();
        }

        /**
         * Attach an autosuggest event to all input fields with data-autosuggest
         */
        $('input').each(function () {
            var textfield = $(this);
            if ( textfield.data('autosuggest') ) {
                var opts = onmeda.utils.decode.json(textfield.data('autosuggest'));
                opts.textfield = this;
                new onmeda.textfields.autoSuggest(opts);
            }
        });

        $('.login-inline-link.display-toggler').click( function () {

            if ( window.IVW ) { // ivw normal data
                ivwCode = 'Fo-login';
            }
            if ( window.iam_data ) { // ivw mobile data
                ivwCode = 'Fo-login';
            }
            onmeda.callback._generic({ga: true, ivw: ivwCode});
        });
        // resize iframes on same domain :)
        $.each($('iframe.auto_resize_height'), function(i, val) {
            var that = this,
                iframe = $( this ),
                resizer = function () {
                    try {
                        var iframeContent = iframe.contents().find("html")[0],
                            h = iframeContent.scrollHeight;
                        if ( h > 0 ) {
                            iframe.height(h);
                            iframe.parent().height(h);
                        }
                    }
                    catch ( err )
                    {
                        // do nothing ;)
                    }
                };
            iframe.load( function ( event ) {
                resizer();
            });
            resizer();
        });
    });
    $.ajax({
        url: 'http://www.onmeda.de/forum/onmeda_api.php?q=html/get_footer_global_links',
        cache: false,
        dataType: 'jsonp',
        success: function( msg )
        {
            if ( msg.success  )
            {
                var index = (location.pathname === '/') ? 1 : 0;
                $('.footer-global__link-items').children().eq(index).html(msg.html);
            }
        }
    });
};
