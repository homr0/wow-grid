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
// For equal width columns, there are breakpoints for equal width column layouts.
//  data-wow-break-small = small breakpoint column layouts
//  data-wow-break-medium = medium breakpoint column layouts
//  data-wow-break-large = large breakpoint column layouts
// For special layout rows, the columns in the row are converted to equal width columns.
function wowColumnChange() {
    // For each row, check if there is an equal width class.
    $('.wow-editor' + wow.row).each(function() {
        // Gets the number of columns in the row.
        var columnLength = $(this).children(wow.column).length;
        var rowClass = $(this).attr('class');

        // If the number of columns is less than the equal width layout, then the layout is adjusted to have equal width while the actual number is saved. Otherwise, the equal width breakpoint attribute is removed.
        if(rowClass.indexOf(wow.equal) >= 0) {
            // Gets the small breakpoint equal length.
            if(rowClass.indexOf(wow.small) >= 0) {
                // Gets the number of equal width columns allowed currently.
                var breakSmall = wowRowEqual($(this), wow.small);

                if((columnLength <= $(this).attr('data-wow-break-small')) || (columnLength < breakSmall)) {
                    $(this).removeClass(wow.small + wow.equal + breakSmall).addClass(wow.small + wow.equal + columnLength);

                    if(columnLength == $(this).attr('data-wow-break-small')) {
                        $(this).removeAttr('data-wow-break-small');
                    } else if($(this).attr('data-wow-break-small') === undefined) {
                        $(this).attr('data-wow-break-small', breakSmall);
                    }
                }
            }

            // Gets the medium breakpoint equal length.
            if(rowClass.indexOf(wow.medium) >= 0) {
                var breakMedium = wowRowEqual($(this), wow.medium);

                if((columnLength <= $(this).attr('data-wow-break-medium')) || (columnLength < breakMedium)) {
                    $(this).removeClass(wow.large + wow.equal + breakMedium).addClass(wow.medium + wow.equal + columnLength);
                    if(columnLength == $(this).attr('data-wow-break-medium')) {
                        $(this).removeAttr('data-wow-break-medium');
                    } else if($(this).attr('data-wow-break-medium') === undefined) {
                        $(this).attr('data-wow-break-medium', breakMedium);
                    }
                }
            }

            // Gets the large breakpoint equal length.
            if(rowClass.indexOf(wow.large) >= 0) {
                var breakLarge = wowRowEqual($(this), wow.large);

                if((columnLength <= $(this).attr('data-wow-break-large')) || (columnLength < breakLarge)) {
                    $(this).removeClass(wow.large + wow.equal + breakLarge).addClass(wow.large + wow.equal + columnLength);
                    if(columnLength == $(this).attr('data-wow-break-large')) {
                        $(this).removeAttr('data-wow-break-large');
                    } else if($(this).attr('data-wow-break-large') === undefined) {
                        $(this).attr('data-wow-break-large', breakLarge);
                    }
                }
            }
        } else {
            // When a column is added, duplicated, or deleted from a row with a special layout, then the layout is adjusted to an equal width layout.
            var countSmall = countMedium = countLarge = 0;

            // If the number of columns is greater than the maximum number of columns, then the number of columns used is changed to the maximum number of columns.
            if(columnLength > wow.maxEqual) {
                columnLength = wow.maxEqual;
            }

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
                if(countSmall > 0) {
                    // Removes any existing equal width classes.
                    wowRowEqRemove($(this), wow.small);
                    if((countSmall / wow.maxColumns > 1) &&  (countSmall % wow.maxColumns === 0)) {
                        // If the columns add up to more than the maximum and its modulus is 0, then turn it into an equal width one-column row.
                        $(this).addClass(wow.small + wow.equal + 1);
                    } else {
                        $(this).addClass(wow.small + wow.equal + columnLength);
                    }
                    wowColumnClassRemove($(this), wow.small);
                }

                if(countMedium > 0) {
                    wowRowEqRemove($(this), wow.medium);
                    if((countMedium / wow.maxColumns > 1) &&  (countMedium % wow.maxColumns === 0)) {
                        $(this).addClass(wow.medium + wow.equal + 1);
                    } else {
                        $(this).addClass(wow.medium + wow.equal + columnLength);
                    }
                    wowColumnClassRemove($(this), wow.medium);
                }

                if(countLarge > 0) {
                    wowRowEqRemove($(this), wow.large);
                    if((countLarge / wow.maxColumns > 1) &&  (countLarge % wow.maxColumns === 0)) {
                        $(this).addClass(wow.large + wow.equal + 1);
                    } else {
                        $(this).addClass(wow.large + wow.equal + columnLength);
                    }
                    wowColumnClassRemove($(this), wow.large);
                }
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

// Wow Grid Button Functions
//  ------------------------
// Configures the component.
function wowEdit() {

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
