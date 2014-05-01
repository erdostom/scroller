    'use strict';
    var SYK = {};
    SYK.rotate = function(banner, newframe) {
        banner.removeClass('frame1 frame2 frame3');
        banner.addClass(newframe);
    };
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
        for (var i = 1; i <= 3; i++) {
            $('.sykbanner_image').each(function() {
                var banner = this;
                window.setTimeout(function() {
                    SYK.rotate($(banner), 'frame2');
                }, 3000 + 15000 * (i - 1));
                window.setTimeout(function() {
                    SYK.rotate($(banner), 'frame3');
                }, 10000 + 15000 * (i - 1));
                if (i < 3) {
                    window.setTimeout(function() {
                        SYK.rotate($(banner), 'frame1');
                    }, 15000 + 15000 * (i - 1));
                }
            });
        }
    });
