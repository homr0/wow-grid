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

// Opens the layout modal
function wowLayout(row, edit) {
    if(edit) {
        // If this will be a layouts tab in the edit modal, then remove certain elements of the modal.

    } else {
        // Otherwise, open the layouts modal on its own.
        $('#wow-modal-menu').html(mfp.layout);
        $.magnificPopup.open({
            items: {
                src: '#wow-modal-menu',
                type: 'inline'
            },
            modal: true
        });
    }

    // Hides the breakpoint options.
    $('#wowAdvanced').prop("checked", false);
    $('#wowBreakpoint').hide();
    $('#wowAdvanced').on({
        click: function() {
            if($('#wowAdvanced').prop("checked")) {
                $('#wowBreakpoint').show();
            } else {
                $('#wowBreakpoint').hide();
            }
        }
    });

    // Sets up breakpoint options.
    function breakpointSet(button, section) {
        $(button).on({
            click: function() {
                $('#wowColumnSmall, #wowColumnMedium, #wowColumnLarge').hide();
                $(section).show();
                $(section).find('.wow-modal-input-row').trigger('blur');
            }
        });
    }
    breakpointSet('#wowBreakpointSmall', '#wowColumnSmall');
    breakpointSet('#wowBreakpointMedium', '#wowColumnMedium');
    breakpointSet('#wowBreakpointLarge', '#wowColumnLarge');

    // Enables/disables breakpoints.
    function breakpointDisable(button, section) {
        $(button).on({
            click: function() {
                if($(this).prop("checked")) {
                    $(section).children().not(':last').addClass('disabled');
                } else {
                    $(section).children('.disabled').removeClass('disabled');
                }
            }
        })
    }
    breakpointDisable('[name=breakpointDisabledS]', '#wowColumnSmall');
    breakpointDisable('[name=breakpointDisabledM]', '#wowColumnMedium');
    breakpointDisable('[name=breakpointDisabledL]', '#wowColumnLarge');

    // Enables/disables column section inputs and preset button.
    function enableColumns(columns, breakpoint, preset) {
        if(preset == undefined) {
            preset = false;
        }
        var presetCount = "";
        for(var i = 1; i <= wow.maxEqual; ++i) {
            if(i <= columns) {
                $('[name=column' + i + breakpoint + ']').prop("disabled", false);
                presetCount += $('[name=column' + i + breakpoint + ']').val();
            } else {
                $('[name=column' + i + breakpoint + ']').prop("disabled", true).val(12);
            }
        }

        // Sets the preset if possible.
        if(!preset) {
            $('#wowPreset input[name=preset]').prop("checked", false);
            if((presetCount == 12) && (columns == 1)) {
                presetCount = 1;
            }
            $('#wowPreset input[name=preset][value=' + presetCount + ']').trigger('click');
        }
    }

    // Sets up the number of columns per row and available column sizes.
    $('#wowBreakpoint .wow-modal-input-row[type=number]').attr('max', wow.maxEqual);
    function columnRowSize(perRow) {
        $(perRow).on({
            'click, keyup, change, paste, blur': function() {
                // Adjusts the columns per row if it is not within the limit.
                if(($(this).val() < 1) || ($(this).val() == "")) {
                    $(this).val(1);
                } else if($(this).val() > wow.maxEqual) {
                    $(this).val(wow.maxEqual);
                }
                enableColumns($(this).val(), $(this).attr('name').slice(-1));
            }
        });
    }
    columnRowSize('[name=columnPerRowS]');
    columnRowSize('[name=columnPerRowM]');
    columnRowSize('[name=columnPerRowL]');

    // Validates the column partitions in for a breakpoint.
    $('#wowBreakpoint .wow-modal-input input[type=number]').attr({
        max: wow.maxColumns,
        value: wow.maxColumns
    }).on({
        'click, keyup, change, paste, blur': function() {
            // Fixes the values if they exceed the minimum or maximum.
            if(parseInt($(this).val()) < parseInt($(this).attr('min'))) {
                $(this).val($(this).attr('min'));
            } else if(parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                $(this).val($(this).attr('max'));
            }

            // Counts the column partitions for the breakpoint.
            var columnTotal = $(this).parent().parent().parent();
            var columnCount = 0;
            var enabledCount = 0;
            var presetCount = "";
            var breakpoint = $(this).attr('name').slice(-1);

            for(var i = 1; i <= wow.maxEqual; ++i) {
                if(!($('#wowColumn' + i + breakpoint).prop("disabled"))) {
                    columnCount += parseInt($('#wowColumn' + i + breakpoint).val());
                    enabledCount++;
                    presetCount += $('#wowColumn' + i + breakpoint).val();
                }
            }

            if((columnCount >= wow.maxColumns) && (columnCount % wow.maxColumns == 0) && ((columnCount / wow.maxColumns == enabledCount) || (columnCount / wow.maxColumns == 1))) {
                // If the columns add up to the maximum partitions or that number times the enabled columns, then the user can change the column layout.
                $('.wow-modal-confirm').removeClass('disabled');
                $(columnTotal).children('.wow-modal-error').remove();
            } else {
                // Since the columns don't add up, the user cannot change the row. An error is added to the number of columns.
                $('.wow-modal-confirm').addClass('disabled');
                if($(columnTotal).children('.wow-modal-error').length < 1) {
                    $(columnTotal).append(error.container).children('.wow-modal-error').children('.column').append(error.columns);
                }
            }

            // Clicks on the preset if it exists.
            if((columnCount == 12) && (enabledCount == 1)) {
                presetCount = 1;
            }
            $('#wowPreset input[name=preset]:checked').prop("checked", false);
            $('#wowPreset input[name=preset][value=' + presetCount + ']').trigger('click');
        }
    });

    // Sets up the preset layouts set the column partitions.
    $('#wowPreset input[name=preset]').on({
        click: function() {
            var breakpoint = $('[name=breakpoint]:checked').val().charAt(0).toUpperCase();
            var columns = parseInt($('[name=preset]:checked').val());

            // Sets up the columns per row and partitions per column.
            if(columns <= 9) {
                // When there is only one column per row, it encompasses the entire row.
                $('[name=columnPerRow' + breakpoint + ']').val(1);
                enableColumns($('[name=columnPerRow' + breakpoint + ']').val(), breakpoint);
                $('#wowColumn1' + breakpoint).val(12);
            } else if(columns <= 99) {
                $('[name=columnPerRow' + breakpoint + ']').val(2);
                $('#wowColumn1' + breakpoint).val(parseInt(columns / 10));
                $('#wowColumn2' + breakpoint).val(columns % 10);
            } else if(columns <= 999) {
                $('[name=columnPerRow' + breakpoint + ']').val(3);
                $('#wowColumn1' + breakpoint).val(parseInt(columns / 100));
                $('#wowColumn2' + breakpoint).val(parseInt((columns % 100) / 10));
                $('#wowColumn3' + breakpoint).val(columns % 10);
            } else if(columns <= 9999) {
                $('[name=columnPerRow' + breakpoint + ']').val(4);
                $('#wowColumn1' + breakpoint).val(parseInt(columns / 1000));
                $('#wowColumn2' + breakpoint).val(parseInt((columns % 1000) / 100));
                $('#wowColumn3' + breakpoint).val(parseInt((columns % 100) / 10));
                $('#wowColumn4' + breakpoint).val(columns % 10);
            }
            enableColumns($('[name=columnPerRow' + breakpoint + ']').val(), breakpoint, true);
        }
    })

    // Takes in the current row's classes and its columns' classes and sets up the modal.
    var rowEqual =  breakSmall = breakMedium = breakLarge = false;
    var columnLength = $(row).children(wow.column).length;

    // Gets if a breakpoint size exists.
    function getBreakpoint(row, breakpoint, button) {
        if(((rowEqual) && ($(row).attr('class').indexOf(breakpoint) >= 0)) || ($(row).children(wow.column).first().attr('class').indexOf(breakpoint) >= 0)) {
            return true;
        } else {
            // Disable the breakpoint.
            $(button).trigger('click');
            return false;
        }
    }

    // Checks if the row has breakpoint classes.
    if($(row).attr('class').indexOf(wow.equal) >= 0) {
        rowEqual = true;
    }
    breakSmall = getBreakpoint(row, wow.small, '[name=breakpointDisabledS]');
    breakMedium = getBreakpoint(row, wow.medium, '[name=breakpointDisabledM]');
    breakLarge = getBreakpoint(row, wow.large, '[name=breakpointDisabledL]');
    console.log(breakSmall, breakMedium, breakLarge);

    // Gets the existing number of columns per row.
    function getRow(row, breakpoint) {
        if(rowEqual) {
            return wowRowEqual($(row), breakpoint);
        } else {
            return columnLength;
        }
    }

    // Gets the existing column class quntities in the row.
    function getColumns(row, breakpoint, perRow, breakSize) {
        if(breakSize) {
            if($(row).attr('data-wow-break-' + breakpoint) !== undefined) {
                $(perRow).val($(row).attr('data-wow-break-' + breakpoint));
            } else {
                $(perRow).val(getRow($(row), breakpoint));
            }

            var breakpoint = $(perRow).attr('name').slice(-1);
            for(var i = 1; i <= $(perRow).val(); ++i) {
                if(rowEqual) {
                    $('[name=column' + i + breakpoint + ']').val(wow.maxColumns / parseInt($(perRow).val()));
                } else {
                    $('[name=column' + i + breakpoint + ']').val(wowColumnNum($(row).children(wow.column).eq(i - 1), breakpoint));
                }
            }
        }
    }
    getColumns(row, wow.small, '[name=columnPerRowS]', breakSmall);
    getColumns(row, wow.medium, '[name=columnPerRowM]', breakMedium);
    getColumns(row, wow.large, '[name=columnPerRowL]', breakLarge);

    // Since the medium viewpoint is opened by default, then trigger the medium breakpoint.
    if(breakMedium) {
        $('[name=columnPerRowM]').trigger('blur');
        $('#wowBreakpointMedium').trigger('click');
    } else if(breakSmall) {
        $('[name=columnPerRowS]').trigger('blur');
        $('#wowBreakpointSmall').trigger('click');
    } else if(breakLarge) {
        $('[name=columnPerRowL]').trigger('blur');
        $('#wowBreakpointLarge').trigger('click');
    }

    // Closes modal and updates row if "Confirm" is pressed.
    $('.wow-modal-cancel, .wow-modal-confirm').on({
        click: function(e) {
            e.preventDefault();

            if($(this).hasClass('wow-modal-confirm')) {
                // Checks which breakpoints are enabled.
                function checkBreakpoint(button) {
                    if($(button).prop('checked') == true) {
                        return false;
                    }
                    return true;
                }
                breakSmall = checkBreakpoint('[name=breakpointDisabledS]');
                breakMedium = checkBreakpoint('[name=breakpointDisabledM]');
                breakLarge = checkBreakpoint('[name=breakpointDisabledL]');
                console.log(breakSmall, breakMedium, breakLarge);


                // Checks if all inputs are equal rows.
                rowEqual = true;

                function getRowEqual(perRow) {
                    var columnNum = $(perRow).val();
                    var breakpoint = $(perRow).attr('name').slice(-1);
                    if(columnNum > 1) {
                        for(var i = 1; i < columnNum; ++i) {
                            if(($('[name=column' + i + breakpoint + ']').val() != $('[name=column' + (i + 1) + breakpoint + ']').val()) && rowEqual) {
                                rowEqual = false;
                                return;
                            }
                        }
                    }
                }
                if(breakSmall && rowEqual) {
                    getRowEqual('[name=columnPerRowS]');
                } if(breakMedium && rowEqual) {
                    getRowEqual('[name=columnPerRowM]')
                } if(breakLarge && rowEqual) {
                    getRowEqual('[name=columnPerRowL]');
                }

                // Clears all of the row and column classes, and breakpoints.
                wowRowEqRemove(row, wow.small);
                wowRowEqRemove(row, wow.medium);
                wowRowEqRemove(row, wow.large);
                wowColumnClassRemove(row, wow.small);
                wowColumnClassRemove(row, wow.medium);
                wowColumnClassRemove(row, wow.large);
                $(row).removeAttr('data-wow-break-' + wow.small + ' data-wow-break-' + wow.medium + ' data-wow-break-'+ wow.large);

                // Makes sure that the breakpoints have the same number of columns per row for non-equal width layouts.
                var fixPerRow = false;
                var setBreak = "";
                if(!rowEqual) {
                    if(breakSmall == breakMedium == breakLarge) {
                        if(($('[name=columnPerRowS]').val() >= $('[name=columnPerRowM]').val()) && ($('[name=columnPerRowS]').val() >= $('[name=columnPerRowL]').val())) {
                            setBreak = '[name=columnPerRowS]';
                        } else if (($('[name=columnPerRowM]').val() > $('[name=columnPerRowL]').val()) && ($('[name=columnPerRowM]').val() > $('[name=columnPerRowS]').val())){
                            setBreak = '[name=columnPerRowM]';
                        } else {
                            setBreak = '[name=columnPerRowL]';
                        }
                    } else if(breakSmall == breakMedium) {
                        if($('[name=columnPerRowS]').val() > $('[name=columnPerRowM]').val()) {
                            setBreak = '[name=columnPerRowS]';
                        } else {
                            setBreak = '[name=columnPerRowM]';
                        }
                    } else if(breakSmall == breakLarge) {
                        if($('[name=columnPerRowS]').val() > $('[name=columnPerRowL]').val()) {
                            setBreak = '[name=columnPerRowS]';
                        } else {
                            setBreak = '[name=columnPerRowL]';
                        }
                    } else if(breakMedium == breakLarge) {
                        if($('[name=columnPerRowM]').val() > $('[name=columnPerRowL]').val()) {
                            setBreak = '[name=columnPerRowM]';
                        } else {
                            setBreak = '[name=columnPerRowL]';
                        }
                    }

                    // If the number of columns in a row is not the same as the largest breakpoint class, then add or remove columns in the row.
                    if((setBreak !== "") && ($(setBreak).val() > $(row).children(wow.column).length)) {
                        // Columns are appended to the row.
                        for(var i = $(row).children(wow.column).length; i < $(setBreak).val(); ++i) {
                            var contentColumn = $(html.content).wrapInner(html.editable).wrapInner(html.module).wrapInner(html.column);
                            $(row).append($(contentColumn).html());
                        }
                    } else if((setBreak !== "") && ($(setBreak).val() < $(row).children(wow.column).length)) {
                        // Columns are removed from the row, but their modules are moved over to the column to its left.
                        for(var i = $(row).children(wow.column).length; i > $(setBreak).val(); --i) {
                            var modules = $(row).children(wow.column).last().children(wow.module).detach();
                            $(row).children(wow.column).last().remove();
                            $(row).children(wow.column).last().append(modules);
                        }
                    }
                }

                // Sets the column classes up.
                function setColumns(row, perRow, breakpoint) {
                    if(rowEqual) {
                        // If there is an equal width row, then just set the breakpoint row class to the value of the number of columns per row.
                        $(row).addClass(breakpoint + wow.equal + $(perRow).val());
                    } else {
                        // For uneven layouts, sets each column to the class.
                        for(var i = 1; i <= $(row).children(wow.column).length; ++i) {
                            $(row).children(wow.column).eq(i - 1).addClass(breakpoint + "-" + $('[name=column' + i + $(perRow).attr('name').slice(-1) + ']').val());
                        }
                    }
                }
                if(breakSmall) {
                    console.log("Setting small columns");
                    setColumns(row, '[name=columnPerRowS]', wow.small);
                }

                if(breakMedium) {
                    console.log("Setting medium columns");
                    setColumns(row, '[name=columnPerRowM]', wow.medium);
                }

                if(breakLarge) {
                    console.log("Setting large columns");
                    setColumns(row, '[name=columnPerRowL]', wow.large);
                }
            }
            wowColumnChange();
            wowSortReload();
            $.magnificPopup.close();
        }
    });
}
