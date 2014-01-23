/*jshint undef: true, unused: true */
/*global onmeda, $ */
onmeda.forum.attachCustomCallbacks = function () {
    $('.widget-tabs-nav li a').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
    $('.condense_control').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
    $('.jsPsuedoLink').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
    $('.post-reply-btn').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
    $('.js-post-controls li').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
    $('.js-comment-entry__post').click(function(){
        onmeda.callback._generic({ivw: true, ga: true});
    });
};
