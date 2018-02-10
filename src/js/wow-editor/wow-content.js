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
    // Button functions.
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

// Handles setting up the hover menu.
function hoverMenu() {
    // Detaches any menus that are out.
    $('.wow-menu').detach();

    // Helper functions
    // function sortUpDown(): Moving arrows are shown or hidden depending on number of sections/rows and position of current section or row. If there is only one section or row, then no arrows are shown. If the section or row is at the top or bottom of its container, then only the bottom or top arrow is shown respectively.
    function sortUpDown() {
        $('.wow-menu').removeClass('wow-endpoint wow-single').children('.wow-up, .wow-down').show();

        // Figures out the number of siblings to the current component.
        var siblings = $('.wow-hover').parent();
        if($('.wow-hover').hasClass(wow.section)) {
            $(siblings).children(wow.section);
        } else if($('.wow-hover').hasClass(wow.row)) {
            $(siblings).children(wow.row);
        }

        // Shows the proper arrows.
        if($(siblings).length == 1) {
            $('wow-menu').addClass('wow-single');
        } else if($(siblings).first().hasClass('wow-hover')) {
            $('wow-menu').addClass('wow-endpoint wow-end-top');
        } else if($(siblings).last().hasClass('wow-hover')) {
            $('wow-menu').addClass('wow-endpoint wow-end-bottom');
        }
    }

    function sortDrag() {
        
    }
}
