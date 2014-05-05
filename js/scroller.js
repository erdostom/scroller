'use strict';
var SYK = {
    conductor: {
        $animations: [],
        playing_animations: [],
        update: function() {
            SYK.conductor.updateScrollVariables();
            SYK.conductor.checkForNewItems();
        },
        updateScrollVariables: function() {
            SYK.conductor.scrollTop = $(window).scrollTop();
            SYK.conductor.scrollBottom = SYK.conductor.scrollTop + $(window).height();
        },
        checkForNewItems: function() {
            SYK.conductor.$animations.each(function() {
                var that = $(this);
                if (SYK.conductor.shouldPlayItem(that)) {
                    SYK.conductor.playing_animations.push(that.attr('id'));
                    SYK.conductor.playItem(that);
                }
            });
        },
        shouldPlayItem: function($item) {
            return SYK.conductor.itemInViewport($item) && SYK.conductor.itemNotPlayedYet($item);
        },
        itemInViewport: function($item) {
            return $item.offset().top < SYK.conductor.scrollBottom;
        },
        itemNotPlayedYet: function($item) {
            return $.inArray($item.attr('id'), SYK.conductor.playing_animations) == -1;
        },
        playItem: function($item) {
            var $adbox = $item.parent().find('.adScroller');
            SYK.disclaimerBox.startScroll($adbox);
            SYK.imageAnimator.loopImage($item);
        }
    },
    imageAnimator: {
        loopCount: 1,
        frame1Length: 3000, // milliseconds
        frame2Length: 7000, // milliseconds
        frame3Length: 5000, // milliseconds
        loopLength: function() {
            return SYK.imageAnimator.frame1Length + SYK.imageAnimator.frame2Length + SYK.imageAnimator.frame3Length;
        },
        loopImage: function($item) {
            for (var i = 1; i <= SYK.imageAnimator.loopCount; i++) {
                window.setTimeout(function() {
                    SYK.imageAnimator.rotate($item, 'frame2');
                }, SYK.imageAnimator.frame1Length + SYK.imageAnimator.loopLength() * (i - 1));
                window.setTimeout(function() {
                    SYK.imageAnimator.rotate($item, 'frame3');
                }, SYK.imageAnimator.frame1Length + SYK.imageAnimator.frame2Length + SYK.imageAnimator.loopLength() * (i - 1));
                if (i < SYK.imageAnimator.loopCount) {
                    window.setTimeout(function() {
                        SYK.imageAnimator.rotate($item, 'frame1');
                    }, SYK.imageAnimator.loopLength() + SYK.imageAnimator.loopLength() * (i - 1));
                }
            }
        },
        rotate: function(banner, newframe) {
            banner.removeClass('frame1 frame2 frame3');
            banner.addClass(newframe);
        }
    },
    disclaimerBox: {
        startScroll: function($scroller) {
            var startScroll = setInterval(function() {
                var pos = $scroller.scrollTop();
                $scroller.scrollTop(pos + 2);
            }, $scroller.data('speed'));

            $scroller.mouseover(function() {
                clearInterval(startScroll);
            });
        }
    }
};
$(function() {
    SYK.conductor.$animations = $('.sykbanner_image');
    SYK.conductor.update();
    $(window).scroll(function() {
        SYK.conductor.update();
    });
    $(window).load(function() {
        SYK.conductor.update();
    });
});
