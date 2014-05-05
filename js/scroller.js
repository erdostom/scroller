'use strict';
var SYK = {
    loopCount: 1,
    frame1Length: 3000, // milliseconds
    frame2Length: 7000, // milliseconds
    frame3Length: 5000, // milliseconds
    loopLength: function() {
        return SYK.frame1Length + SYK.frame2Length + SYK.frame3Length;
    },
    playing_animations: [],
    $animations: [],
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
    loopImage: function($item) {
        for (var i = 1; i <= SYK.loopCount; i++) {
            window.setTimeout(function() {
                SYK.rotate($item, 'frame2');
            }, SYK.frame1Length + SYK.loopLength * (i - 1));
            window.setTimeout(function() {
                SYK.rotate($item, 'frame3');
            }, SYK.frame1Length + SYK.frame2Length + SYK.loopLength * (i - 1));
            if (i < SYK.loopCount) {
                window.setTimeout(function() {
                    SYK.rotate($item, 'frame1');
                }, SYK.loopLength + SYK.loopLength * (i - 1));
            }
        }
    },
    playItem: function($item) {
        var $adbox = $item.parent().find('.adScroller');
        SYK.startScroll($adbox);
        SYK.loopImage($item);
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
    rotate: function(banner, newframe) {
        banner.removeClass('frame1 frame2 frame3');
        banner.addClass(newframe);
    },
    startScroll: function($scroller) {
        var startScroll = setInterval(function() {
            var pos = $scroller.scrollTop();
            $scroller.scrollTop(pos + 2);
        }, $scroller.data('speed'));

        $scroller.mouseover(function() {
            clearInterval(startScroll);
        });
    }
};
$(function() {
    SYK.$animations = $('.sykbanner_image');
    SYK.updateScroll();
    $(window).scroll(function() {
        SYK.updateScroll();
    });
});
