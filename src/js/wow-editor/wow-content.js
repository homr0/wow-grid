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
            hoverMenu();
        }
    }, '.wow-editor');

    $(preview).after('<div id="wow-modal-menu" class="mfp-hide"></div>');
} wowGrid(wow.editor);

// Handles setting up the hover menu.
function hoverMenu() {
    // Cleans and detaches any menus that are out.
    $('.wow-menu, .wow-add').removeClass('wow-end-top wow-end-bottom wow-single').detach();
    var component = "";

    // Shows menu for component and sets the data-name.
    if($('.wow-hover').hasClass(wow.section.slice(1))) {
        component = wow.section;
        $('.wow-hover').append(hover.section);
        $('.wow-hover .wow-menu').attr('data-name', "Section");
    } else if($('.wow-hover').hasClass(wow.row.slice(1))) {
        component = wow.row;
        $('.wow-hover').append(hover.row);
        $('.wow-hover .wow-menu').attr('data-name', "Row");
    } else if($('.wow-hover').hasClass(wow.column.slice(1))) {
        component = wow.column;
        $('.wow-hover').append(hover.column);
        $('.wow-hover .wow-menu').attr('data-name', "Column");
    } else if($('.wow-hover').hasClass(wow.module.slice(1))) {
        component = wow.module;
        $('.wow-hover').append(hover.module);
        $('.wow-hover .wow-menu').attr('data-name', "Module");
    }

    // Sets the data-name for the menu if an id exists.
    if($('.wow-hover').attr('id') !== "") {
        $('.wow-menu').attr('data-name', $('.wow-hover').attr('id'));
    }

    // Disables the delete button if there is only one type of the component in its container except for modules.
    if(($('.wow-hover').parent().children(component).length === 1)  && (component !== wow.module)) {
        $('.wow-menu').addClass('wow-single');
    }

    // Hides up or down arrows if the section or row is at the top or bottom of its container.
    if(((component === wow.section) || (component === wow.row)) && !($('.wow-menu').hasClass('wow-single'))) {
        if($('.wow-hover').parent().children(component).first().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-top');
        } else if($('.wow-hover').parent().children(component).last().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-bottom');
        }
    }

    // Sets up the sortables (drag and drop) for columns and modules.
    if(component == wow.column) {
        sortable('.wow-editor' + wow.row, {
            handle: '.wow-column',
            items: wow.column,
            forceplaceholderSize: true,
            placeholder: '<div class="' + wow.column + ' wow-editor"></div>',
            placeholderClass: 'wow-sort-ghost wow-sort-ghost-placeholder'
        });
    } else if(component === wow.module) {
        sortable('.content-container', {
            connectWith: 'content',
            handle: '.wow-module',
            forcePlaceholderSize: true,
            placeholder: '<div class="' + wow.module + ' wow-editor"></div>',
            placeholderClass: 'wow-sort-ghost wow-sort-ghost-placeholder'
        })[0].addEventListener('sortstart', function(e) {
            $('.content-container').addClass('wow-sort-ghost');
        });
        sortable('.content-container')[0].addEventListener('sortstop', function(e) {
            $('.wow-sort-ghost').removeClass('wow-sort-ghost');
        });
    }
}
