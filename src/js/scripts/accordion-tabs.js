// Accordion tabs for use in the Wow grid.
$('body').on({
    click: function() {
        var panelLink = $(this).children('a').attr('href');
        console.log(panelLink);
        if($(this).parent().hasClass('active') && $(this).parent().hasClass('squishi-accordion')) {
            // If the squishi is not a set of tabs, then the
            $(this).removeClass('active');
            $(panelLink).animateCss('slideOutUp').removeClass('active');
        } else {
            if($(this).parent().hasClass('squishi-tabs')) {
                // If the squishi is a set of tabs, then the other active tabs are closed.
                $('.active').removeClass('active');
            }
            $(this).addClass('active');

            if($(this).parent().hasClass('squishi-accordion')) {
                $('.squishi-content > ' + panelLink).animateCss('slideInDown');
            }
            $('.squishi-content > ' + panelLink).addClass('active');
        }
    }
}, '.squishi-title');
