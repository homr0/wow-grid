$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
    },

    animateRemove: function(animationName) {
        console.log("Animation for when a compoenent is removed");
    }
});

function wowGrid(preview) {
    // Button functions/
    // Contextual/hover menu functionality for all components of the grid.
    $('body').on({
        mouseenter: function() {
            $('wow-hover').removeClass('wow-hover');
            $(this).addClass('wow-hover');
            hoverMenu();
            var piece = $(this).parent().parent();


        }
    });
}
