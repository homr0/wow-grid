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

            // Sets up the color class's label.
            var positions = [];
            for(var i = 1; i < label.length; ++i) {
                if(label[i].match(/[A-Z]/) !== null) {
                    positions.push(i);
                }
            }

            var colorName = label[0].toUpperCase();
            if(positions.length == 0) {
                colorName += label.slice(1);
            } else {
                colorName += label.slice(1, positions[0]);
                for(var i = 0; i < positions.length; ++i) {
                    colorName += " ";
                    if((i + 1) < positions.length) {
                        colorName += label.slice(positions[i], positions[i + 1]);
                    } else {
                        colorName += label.slice(positions[i]);
                    }
                }
            }

            colorButtons += '<input type="radio" name="backgroundColor" id="wowColor' + colorId + '" value="' + name + '"><label for="wowColor' + colorId + '" class="wow-color-button ' + name + '"><p>' + colorName + '</p></label>';
        });
        $('#' + color).html(colorButtons);
    });
    $('#colorBackground .wow-color-choice').html(colorPalettes);
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
    var styleClass = false;
    $.each(style, function(type, name) {
        if(style == wowStyles.background) {
            $.each(name, function(palette, color) {
                if($(component).hasClass(color)) {
                    styleClass = color;
                }
            });
        } else if($(component).hasClass(name)) {
            styleClass = name;
        }
    });
    return styleClass;
}

// Changes the class of a certain style of the component.
function wowStyleChange(component, style, input) {
    wowStyleClear(component, style);
    if($(input + ":checked").val() !== "none") {
        $(component).addClass($(input + ":checked").val());
    }
}
