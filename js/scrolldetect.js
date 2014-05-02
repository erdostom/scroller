'use strict';
var SYK = {
    playing_animations: [],
    $animations: $('.rectangle'),
    updateScroll: function() {
        SYK.updateScrollVariables();
        SYK.logNewItems();
    },
    updateScrollVariables: function() {
        SYK.scrollTop = $(window).scrollTop();
        SYK.scrollBottom = SYK.scrollTop + $(window).height();
    },
    itemInViewport: function($item) {
        return $item.offset().top < SYK.scrollBottom;
    },
    itemNotPlayedYet: function($item) {
        return $.inArray($item.attr('id'), SYK.playing_animations) == -1;
    },
    shouldPlayItem: function($item) {
        return SYK.itemInViewport($item) && SYK.itemNotPlayedYet($item);
    },
    playItem: function($item) {
        console.log('now playing #' + $item.attr('id'));
    },
    logNewItems: function() {
        SYK.$animations.each(function() {
            var that = $(this);
            if (SYK.shouldPlayItem(that)) {
                SYK.playing_animations.push(that.attr('id'));
                SYK.playItem(that);
            }
        });
    },
};
$(function() {
    SYK.updateScroll();
    $(window).scroll(function() {
        SYK.updateScroll();
    });
});
