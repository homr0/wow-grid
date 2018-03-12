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
                    var focusedParent = $(focused).parent();
                    $('.wow-editor.wow-highlight').removeClass('wow-highlight');
                    $(focused).addClass('wow-highlight');
                    $(focused).animateRemove('zoomOut');


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
}

//  Wow Grid Helper Functions (for button functions)
//  ------------------------------------------------
// Adjusts block widths when a block is added, duplicated, or deleted.
function wowColumnChange() {
    // For each row, check if there is an equal width class.
    $('.wow-editor' + wow.row).each(function() {

        // If the number of columns is less than the equal width layout, then the layout is adjusted to have equal width while the actual number is saved. Otherwise, the equal width breakpoint attribute is removed.
        if($(this).attr('class').indexOf(wow.equal) >= 0) {
            wowDataBreakpoint($(this), wow.small);
            wowDataBreakpoint($(this), wow.medium);
            wowDataBreakpoint($(this), wow.large);
        } else {
            // When a column is added, duplicated, or deleted from a row with a special layout, then the layout is adjusted to an equal width layout.
            var countSmall =  countMedium = countLarge = 0;

            // Counts up each of the column breakpoint's class numbers.
            $(this).children(wow.column).each(function() {
                var columnClass = $(this).attr('class');
                if(columnClass.indexOf(wow.small) >= 0) {
                    countSmall += wowColumnNum($(this), wow.small);
                }

                if(columnClass.indexOf(wow.medium) >= 0) {
                    countMedium += wowColumnNum($(this), wow.medium);
                }

                if(columnClass.indexOf(wow.large) >= 0) {
                    countLarge += wowColumnNum($(this), wow.large);
                }
            });

            // Checks if the special columns in each breakpoint do not add up to the maximum number of columns per row.
            if((countSmall % wow.maxColumns > 0) || (countMedium % wow.maxColumns > 0) || (countLarge % wow.maxColumns > 0)) {
                wowRedistributeRow($(this), wow.small, countSmall);
                wowRedistributeRow($(this), wow.medium, countMedium);
                wowRedistributeRow($(this), wow.large, countLarge);
            }
        }
    });
}

// Gets the equal width row number.
function wowRowEqual(row, breakpoint) {
    var rowClass = $(row).attr('class')
    return parseInt(rowClass.substr(rowClass.indexOf(breakpoint), breakpoint.length + wow.equal.length + 2).match(/\d+/));
}

// Gets the column class number.
function wowColumnNum(column, breakpoint) {
    var columnClass = $(column).attr('class');
    return parseInt(columnClass.substr(columnClass.indexOf(breakpoint), breakpoint.length + 3).match(/\d+/));
}

// Removes the special column classes for a breakpoint.
function wowColumnClassRemove(row, breakpoint) {
    for(var i = 1; i <= wow.maxColumns; ++i) {
        $(row).children(wow.column).removeClass(breakpoint + "-" + i);
    }
}

// Removes equal width row classes.
function wowRowEqRemove(row, breakpoint) {
    for(var i = 1; i <= wow.maxEqual; ++i) {
        $(row).removeClass(breakpoint + wow.equal + i);
    }
}

// Updates the equal width rows to include or remove breakpoints for equal width column layouts.
//  data-wow-break-small = small breakpoint column layouts
//  data-wow-break-medium = medium breakpoint column layouts
//  data-wow-break-large = large breakpoint column layouts
function wowDataBreakpoint(row, breakpoint) {
    if($(row).attr('class').indexOf(breakpoint) >= 0) {
        var breakSize = wowRowEqual(row, breakpoint);
        var dataBreakpoint = 'data-wow-break-' + breakpoint;
        var columnLength = $(row).children(wow.column).length;

        // If the number of columns is less than the saved breakpoint or the breakpoint exists and the number of columns is equal, then change the equal width row class.
        if((columnLength <= $(row).attr(dataBreakpoint)) || (columnLength < breakSize)) {
            $(row).removeClass(breakpoint + wow.equal + breakSize).addClass(breakpoint + wow.equal + columnLength);

            if(columnLength == $(row).attr(dataBreakpoint)) {
                $(row).removeAttr(dataBreakpoint);
            } else if($(row).attr(dataBreakpoint) === undefined) {
                $(row).attr(dataBreakpoint, breakSize);
            }
        }
    }
}

// Updates special layout rows to equal width column layout.
function wowRedistributeRow(row, breakpoint, count) {
    if(count > 0) {
        var columnLength = $(row).children(wow.column).length;
        wowRowEqRemove(row, breakpoint);
        wowColumnClassRemove(row, breakpoint);

        // If the columns all take up the entire row, then the breakpoint is has a one-column equally distributed row. Otherwise, redistribute it according to the number of columns per row.
        if((count / wow.maxColumns > 1) && (count % wow.maxColumns === 0)) {
            $(row).addClass(breakpoint + wow.equal + 1);
        } else if(columnLength > wow.maxEqual) {
            $(row).addClass(breakpoint + wow.equal + wow.maxEqual);
        } else {
            $(row).addClass(breakpoint + wow.equal + columnLength);
        }
    }
}

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
