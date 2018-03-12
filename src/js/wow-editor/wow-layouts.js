//  Wow Grid Helper Functions (for column and row adjustments)
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
