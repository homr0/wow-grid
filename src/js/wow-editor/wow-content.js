// Starts the Wow Grid Editor
function wowGrid(preview) {
    // Button functions.
    // Contextual/hover menu functionality for all components of the grid.
    $('body').on({
        mouseenter: function() {
            $('.wow-hover').removeClass('wow-hover');
            $(this).addClass('wow-hover');
            wowMenu();
            var focused = $('.wow-hover');

            // Configures a component.
            $('.wow-edit').off().on({
                click: function() {
                    wowEdit($(focused));
                }
            });

            // Duplicates a component.
            $('.wow-duplicate').off().on({
                click: function() {
                    wowDuplicate($(focused));
                }
            });

            // Moves a component down.
            $('.wow-down').off().on({
                click: function() {
                    wowDown($(focused));
                }
            });

            // Moves a component up.
            $('.wow-up').off().on({
                click: function() {
                    wowUp($(focused));
                }
            });

            // Deletes a component.
            $('.wow-delete:not(.disabled)').off().on({
                click: function() {
                    wowDelete($(focused, 'zoomOut'));
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
            // Puts the menu on to the parent component due to hovering issue.
            $('.wow-hover').removeClass('wow-hover');
            $(this).parent().addClass('wow-hover');
            wowMenu();
        }
    }, '.wow-editor');

    // Removes any Wow Editor components when not in a valid area.
    $('body').on({
        click: function() {
            $('.wow-editor.wow-highlight').removeClass('wow-highlight');
            $('.wow-hover').removeClass('wow-hover');
            $('.wow-menu, .wow-add').remove();
        }
    }, ':not(.wow-editor)');
} wowGrid(wow.editor);

//  Wow Grid Hover Menu
//  -------------------
// Sets up the hover menu.
// Sets up the data-wow-name, which is the hovered component's id.
function wowMenu() {
    // Cleans and detaches any menus that are out.
    $('.wow-menu, .wow-add').removeClass('wow-end-top wow-end-bottom wow-single').detach();
    var component = "";

    // Shows menu for component and sets the data-wow-name.
    if($('.wow-hover').hasClass(wow.section.slice(1))) {
        component = wow.section;
        $('.wow-hover').append(hover.section);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Section");
    } else if($('.wow-hover').hasClass(wow.row.slice(1))) {
        component = wow.row;
        $('.wow-hover').append(hover.row);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Row");
    } else if($('.wow-hover').hasClass(wow.column.slice(1))) {
        component = wow.column;
        $('.wow-hover').append(hover.column);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Column");
    } else if($('.wow-hover').hasClass(wow.module.slice(1))) {
        component = wow.module;
        $('.wow-hover').append(hover.module);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Module");
    }

    // Sets the data-wow-name for the menu if an id exists.
    if($('.wow-hover').attr('id') !== "") {
        $('.wow-menu').attr('data-wow-name', $('.wow-hover').attr('id'));
    }

    // Disables the delete button if there is only one type of the component in its container except for modules.
    if(($('.wow-hover').parent().children(component).length === 1) && (component !== wow.module)) {
        $('.wow-button.wow-delete').addClass('disabled');
    } else {
        $('.wow-button.wow-delete').removeClass('disabled');
    }

    // Hides up or down arrows if the section or row is at the top or bottom of its container.
    if(((component === wow.section) || (component === wow.row)) && !($('.wow-menu').hasClass('wow-single'))) {
        if($('.wow-hover').parent().children(component).first().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-top');
        } else if($('.wow-hover').parent().children(component).last().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-bottom');
        }
    }
}

///-------------------------------
// functionality for adjusting layouts
#=include 'wow-layouts.js'

// Wow Grid Button Functions
//  ------------------------
// Configures the component.
function wowEdit(wowFocus) {

}

// Duplicates the component.
function wowDuplicate(wowFocus) {
    // Clones the component.
    $(wowFocus).children('.wow-menu').removeClass('wow-single');
    $(wowFocus).clone().insertAfter($(wowFocus)).animateCss('zoomIn');

    // Removes any menu classes and extraneous classes and ids.
    var wowCloned = $(wowFocus).next();
    $(wowCloned).removeClass('wow-highlight');
    $(wowCloned).children('.wow-menu').removeClass('wow-end-top wow-end-bottom');
    $(wowCloned).removeAttr('id').find('.wow-editor').removeAttr('id');

    // Reloads the sortables.
    wowSortReload();
    wowColumnChange();
}

// Moves a component down.
function wowDown(wowFocus) {
    $(wowFocus).fadeOut(500, function() {
        $(wowFocus).next().fadeOut(500);
        $(wowFocus).before($(wowFocus).next());
        $(wowFocus).prev().fadeIn(500);
    }).fadeIn(500);
}

// Moves a component up.
function wowUp(wowFocus) {
    $(wowFocus).fadeOut(500, function() {
        $(wowFocus).prev().fadeOut(500);
        $(wowFocus).after($(wowFocus).prev());
        $(wowFocus).next().fadeIn(500);
    }).fadeIn(500);
}

// Deletes a component.
function wowDelete(wowFocus) {
    $('.wow-highlight').removeClass('wow-highlight');
    $(wowFocus).addClass('wow-highlight');

    // Opens the component deletion modal.
    $('#wow-modal-menu').html(mfp.remove);
    $.magnificPopup.open({
        items: {
            src: '#wow-modal-menu',
            type: 'inline'
        },
        modal: true
    });

    // Both buttons will close the modal.
    $('.wow-modal-cancel, .wow-modal-remove').on({
        click: function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        }
    });

    $('.wow-modal-remove').on({
        click: function() {
            $(wowFocus).animateCss('zoomOut');
            setTimeout(function() {
                $(wowFocus).remove();
                wowColumnChange();
            }, 300);
        }
    });
}

// Wow Grid Helper Functions

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
