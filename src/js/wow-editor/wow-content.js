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
            wowMenu();

            // Configures a component.
            $('.wow-edit').off().on({
                click: function() {
                    focused = $(this).parent().parent();
                    wowEdit($(focused));
                }
            });

            // Duplicates a component.
            $('.wow-duplicate').off().on({
                click: function() {
                    focused = $(this).parent().parent();
                    wowDuplicate($(focused));
                }
            });


        },
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.wow-editor.wow-highlight').removeClass('wow-highlight');
            $(this).addClass('wow-highlight');
        },
        mouseleave: function() {
            // Since modules are not direct children of columns, the parent for the modules need to move to the next level parent to reach the column.
            var parent = $(this).parent();
            if($(this).hasClass(wow.module.slice(1))) {
                parent = $(parent).parent();
            }

            // Puts the menu on to the parent component due to hovering issue.
            $('.wow-hover').removeClass('wow-hover');
            $(parent).addClass('wow-hover');
            wowMenu();
        }
    }, '.wow-editor');

    // Removes any Wow Editor components when not in a valid area.
    $('body').on('click', ':not(.wow-editor)', function() {
        $('.wow-editor.wow-highlight').removeClass('wow-highlight');
        $('.wow-hover').removeClass('wow-hover');
        $('.wow-menu, .wow-add').remove();
    });

    $(preview).after('<div id="wow-modal-menu" class="mfp-hide"></div>');
} wowGrid(wow.editor);

// Sets up the hover menu.
function wowMenu() {
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

    // Reloads the sortables.
    wowSortables();
}

// Configures the component.
function wowEdit() {

}

// Duplicates the component.
function wowDuplicate(wowFocus) {
    // If component to be duplicated is a column, then change the special layout row into an equal width layout.
    if($(wowFocus).hasClass(wow.column.slice(1)) && $(wowFocus).hasClass(wow.small + '-12')) {
        $(wowFocus).parent().children(wow.column).each(function() {
            // Gets the medium column breaks
            var mediumSize = "";
            if($(this).attr('class').indexOf(wow.medium)) {
                mediumSize = $(this).attr('class').substr($(this).attr('class').indexOf(wow.medium + "-"), wow.medium.length + 2);
            }

            // Gets the large column breaks.
            var largeSize = "";
            if($(this).attr('class').indexOf(wow.large)) {
                largeSize = $(this).attr('class').substr($(this).attr('class').indexOf(wow.large + "-"), wow.large.length + 2);
            }

            // Changes the column alignment.
            var columnNum  = $(wowFocus).parent().children('.wow-editor').length;
            if((mediumSize === "") && (largeSize === "")) {
                $(wowFocus).parent().addClass(wow.small + wow.equal + "-" + columnNum);
            } else if(largeSize === "") {   // Gets medium view columns.
                $(wowFocus).parent().addClass(wow.small + wow.equal + "-1").addClass(wow.medium + wow.equal + "-" + columnNum);
            } else {    // Gets large view columns.
                $(wowFocus).parent().addClass(wow.small + wow.equal + "-1").addClass(wow.medium + wow.equal + "-" + columnNum).addClass(wow.large + wow.equal + "-" + columnNum);
            }
        });
    }

    // Clones the component.
    $(wowFocus).children('.wow-menu').removeClass('wow-single');
    $(wowFocus).clone().insertAfter($(wowFocus)).animateCss('zoomIn');

    // Removes any menu classes and extraneous classes and ids.
    var wowCloned = $(wowFocus).next();
    $(wowCloned).removeClass('wow-highlight');
    $(wowCloned).children('.wow-menu').removeClass('wow-end-top wow-end-bottom');
    $(wowCloned).removeAttr('id').find('.wow-editor').removeAttr('id');
}

// Checks to make sure that the component name is valid.
function wowCheckName(name) {
    var uniqueId = true;

    // Checks name to make sure there are no spaces or invalid characters.
    if(name.index(' ') >= 0) {
        $('.layoutError').hide();
        $('#errorSpace').show();
        uniqueId = false;
    }

    // Checks to make sure that the name is alphanumerical and has only dashes or underscores.
    uniqueId = /^[a-zA-z0-9-_]+$/.test(name);
    if(!uniqueId) {
        $('.layoutError').hide();
        $('#errorInvalid').show();
    }

    // Cycles through the id names to make sure that it doesn't already exist.
    $(wow.editor + ' .wow-editor').each(function() {
        if($(this).attr('id') === name) {
            $('.layoutError').hide();
            $('#errorRepeat').show();
            uniqueId = false;
        }
    });

    // Checks that the name is not blank.
    if(name === "") {
        $('.layoutError').hide();
        uniqueId = true;
    }

    return uniqueId;
}
