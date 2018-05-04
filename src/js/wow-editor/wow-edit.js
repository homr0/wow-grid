//  Wow Grid Helper Functions (for edit modals)
//  ------------------------------------------------
// Sets up the list of palettes and the panels for containing the color classes. Gets the color classes from the wowStyles object.
function wowColorClasses() {
    // Adds in the none/no background color option as the default option.
    var colorPalettes = '<li class="squishi-title" id="colorNone"><a href="#nocolor">No Background Color</a></li>';
    $('#colorShade .squishi-content').html('<div id="nocolor"><input type="radio" name="backgroundColor" id="wowColorNone" value="none"></div>');

    // Goes through the wowStyles background object to get all palettes and creates the palette tab and the color palette panel.
    $.each(wowStyles.background, function(color, palette) {
        var paletteName = color[0].toUpperCase() + color.slice(1);

        colorPalettes += '<li class="squishi-title ' + palette[Object.keys(palette)[0]] + '" id="color' + paletteName + '"><a href="#' + color + '">' + paletteName + '</a></li>';

        $('#colorShade .squishi-content').append('<div id="' + color + '"></div>');

        var colorButtons = "";

        // Gets the color palette and its different shades.
        $.each(palette, function(label, name) {
            var colorId = paletteName + label[0].toUpperCase() + label.slice(1);
            colorButtons += '<input type="radio" name="backgroundColor" id="wowColor' + colorId + '" value="' + name + '"><label for="wowColor' + colorId + '" class="wow-color-button ' + name + '"><p>' + wowCamelCase(label) + '</p></label>';
        });
        $('#' + color).html(colorButtons);
    });
    $('#colorBackground .wow-color-choice').html(colorPalettes);
}

// Sets up the collapse classes.
function wowCollapseClasses() {
    var collapseClasses = '';
    $.each(wowStyles.collapse, function(name, collapse) {
        var collapseId = name[0].toUpperCase() + name.slice(1);
        collapseClasses += '<input type="checkbox" name="collapseClass" id="wowCollapse' + collapseId + '" value="' + collapse + '"><label for="wowCollapse' + collapseId + '"><p>' + wowCamelCase(name) + '</p></label>';
    });
    $('#collapseOptions').html(collapseClasses);
}

// Generates a label from camelcase name.
function wowCamelCase(name) {
    // Gets the positions of where there are capital letters.
    var positions = [];
    for(var i = 1; i < name.length; ++i) {
        if(name[i].match(/[A-Z]/) !== null) {
            positions.push(i);
        }
    }

    // Sets up the rest of the label.
    var label = name[0].toUpperCase();
    if(positions.length == 0) {
        label += name.slice(1);
    } else {
        label  += name.slice(1, positions[0]);
        for(var i = 0; i < positions.length; ++i) {
            label += " ";
            if((i + 1) < positions.length) {
                label += name.slice(positions[i], positions[i + 1]);
            } else {
                label += name.slice(positions[i]);
            }
        }
    }

    return label;
}

// Removes all style classes for a certain style from the component.
function wowStyleClear(component, style) {
    $.each(style, function(type, name) {
        if(style == wowStyles.background) {
            $.each(name, function(palette, color) {
                $(component).removeClass(color);
            });
        } else {
            $(component).removeClass(name);
        }
    });
}

// Returns the class of a certain style of the component.
function wowStyleGet(component, style) {
    var styleClass = [];
    $.each(style, function(type, name) {
        if(style == wowStyles.background) {
            $.each(name, function(palette, color) {
                if($(component).hasClass(color)) {
                    styleClass.push(color);
                }
            });
        } else if($(component).hasClass(name)) {
            styleClass.push(name);
        }
    });
    return styleClass;
}

// Changes the class of a certain style of the component.
function wowStyleChange(component, style, input) {
    wowStyleClear(component, style);
    if($(input + ":checked").val() !== "none") {
        $(input + ":checked").each(function() {
            $(component).addClass($(this).val());
        });
    }
}
