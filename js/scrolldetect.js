var SYK = {
    updateScroll: function() {
        SYK.updateScrollVariables();
        SYK.logNewItems();
    },
    updateScrollVariables: function() {
        SYK.scrollTop = $(window).scrollTop()
        SYK.scrollBottom = SYK.scrollTop + $(window).height()
    },
    logNewItems: function() {
        $('.rectangle').each(function() {
            var that = $(this);
            if (that.offset().top < SYK.scrollBottom && $.inArray(that.attr('id'), SYK.playing_animations) == -1) {
                SYK.playing_animations.push(that.attr('id'))
                console.log("now playing #" + that.attr('id'))
            }
        });
    },
    playing_animations: []
};

$(function() {
        SYK.updateScroll();
    $(window).scroll(function() {
        SYK.updateScroll();
    })
});
