    'use strict';
    var SYK = {};
    SYK.rotate = function(banner, newframe) {
        banner.removeClass('frame1 frame2 frame3');
        banner.addClass(newframe);
    };
    SYK.loopCount = 2;
    SYK.frame1Length = 1500; // milliseconds
    SYK.frame2Length = 4000; // milliseconds
    SYK.frame3Length = 2000; // milliseconds
    SYK.loopLength = SYK.frame1Length + SYK.frame2Length + SYK.frame3Length;
    $(function() {
        $('.adScroller').each(function() {
            var div = $(this);
            var startScroll = setInterval(function() {
                var pos = div.scrollTop();
                div.scrollTop(pos + 2);
            }, $(this).data('speed'));

            div.mouseover(function() {
                clearInterval(startScroll);
            });
        });
        for (var i = 1; i <= SYK.loopCount; i++) {
            $('.sykbanner_image').each(function() {
                var banner = this;
                window.setTimeout(function() {
                    SYK.rotate($(banner), 'frame2');
                }, SYK.frame1Length + SYK.loopLength * (i - 1));
                window.setTimeout(function() {
                    SYK.rotate($(banner), 'frame3');
                }, SYK.frame1Length + SYK.frame2Length + SYK.loopLength * (i - 1));
                if (i < SYK.loopCount) {
                    window.setTimeout(function() {
                        SYK.rotate($(banner), 'frame1');
                    }, SYK.loopLength + SYK.loopLength * (i - 1));
                }
            });
        }
    });
