/*jshint undef: true, unused: true */
/*global window, document, onmeda, $ */
onmeda.forum.createBottomPagination = function () {
    var conversationMode = (
            $('.channel-conversation-list-wrapper').length === 1
        ),
        threadModeNotLoggedIn = (
                $('#thread-view-tab').length === 1 &&
                $('.b-content-entry').length === 0
    );

    // if not in channel mode or
    // if in thread mode and logged in, exit immediately.
    if ( !conversationMode && !threadModeNotLoggedIn ) {
        return;
    }

    // distinguishing between channel mode and thread mode
    if ( conversationMode ) {
        var pb = $('.conversation-toolbar-wrapper').eq(0).clone(true, true),
            totalPages = window.parseInt($('.pagetotal').eq(1).text().replace(/[,|.]/,''),10),
            currentPage = window.parseInt($('.js-pagenum.textbox').eq(1).val()),
            pf = function(v){return pb.find(v);},
            arrowLeft = pf('.arrow.left-arrow'),
            arrowRight = pf('.arrow.right-arrow'),
            wlh = window.location.href;
        // remove unwanted filter toolboxes
        pf('.toolbar-filter').remove();
        pf('.filtered-by').remove();
        // set the current and last page according to the data from the vbulletin
        // (built-in) pagination.
        pf('.pagetotal').html(totalPages);
        pf('.js-pagenum.textbox').val(currentPage);
        // if the current page is the first page, we don't need to set any events
        // for the left arrow
        if ( currentPage !== 1 ) {
            arrowLeft.click(function( evt ) {
                evt.preventDefault();
                // strip parts of the current url that contain e.g. /page8
                // and then load the previous page
                window.location.href = wlh.replace(/\/page[0-9]/,'') +
                    '/page' + (currentPage - 1);
            });
            // remove the disabled look for them arrow, because he now clickable
            // anyway
            arrowLeft.removeClass('h-disabled');
        }
        // if the current page is the last page, we don't need to set any events
        // for the right arrow
        if ( currentPage !== totalPages ) {
            arrowRight.click(function( evt ) {
                evt.preventDefault();
                // strip parts of the current url that contain e.g. /page8
                // and then load the next page
                window.location.href = wlh.replace(/\/page[0-9]/,'') +
                    '/page' + (currentPage + 1);
            });
            // remove the disabled look for them arrow, because he now clickable
            // anyway
            arrowRight.removeClass('h-disabled');
        }
        pb.appendTo('#topic-tab');
    } else if ( threadModeNotLoggedIn ) {
        var fakebar = document.createElement('div'),
            wrapper = document.createElement('div'),
            clone1 = $('.fake-reply-btn').eq(0).clone(true, true),
            clone2 = $('.fake-reply-btn').eq(1).clone(true, true);

        wrapper.className = 'conversation-toolbar-wrapper';
        wrapper = $(wrapper);
        fakebar.className = 'conversation-toolbar is--hidden-mobile';
        fakebar = $(fakebar);

        wrapper.append(clone1);
        fakebar.append(clone2);
        wrapper.append(fakebar);
        $('#thread-view-tab').append(wrapper);
    }
};
