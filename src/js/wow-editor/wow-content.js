// Functionality for the basic Wow Grid Editor.
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
    },

    animateRemove: function(animationName) {
        console.log("Animation for when a component is removed");
    }
});

// Starts the Wow Grid Editor
function wowGrid(preview) {
    // Button functions/
    // Contextual/hover menu functionality for all components of the grid.
    $('body').on({
        mouseenter: function() {
            $('.wow-hover').removeClass('wow-hover');
            $(this).addClass('wow-hover');
            //hoverMenu();
            console.log($(this).attr('class'));
        }
    }, '.wow-editor');

    $(preview).after('<div id="wow-modal-menu" class="mfp-hide"></div>');
} wowGrid(wow.editor);

function hoverMenu() {

}
