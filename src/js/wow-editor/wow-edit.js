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

// Removes all color classes that are in the component and replaces it with the currently selected class.
function wowColorClassClear(component) {
    $.each(wowStyles.background, function(color, palette) {
        $.each(palette, function(label, name) {
            $(component).removeClass(name);
        });
    });
}

// Returns the color class of the component.
function wowColorClassGet(component) {
    var colorClass = false;
    $.each(wowStyles.background, function(color, palette) {
        $.each(palette, function(label, name) {
            if($(component).hasClass(name)) {
                colorClass = name;
            }
        });
    });
    return colorClass;
}

// When a color is clicked, the preview displays the selected color class.
function wowColorChange(component) {
    wowColorClassClear(component);
    if($('[name=backgroundColor]:checked').val() !== "none") {
        $(component).addClass($('[name=backgroundColor]:checked').val());
    }
}

// Checks to make sure that the component id is valid.
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
