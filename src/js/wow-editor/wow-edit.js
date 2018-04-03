//  Wow Grid Helper Functions (for edit modals)
//  ------------------------------------------------
// Class names for styles.
var wowStyles = {
    background: {
        grayscale: {
            white: "white",
            transparentWhite: "white-transparent",
            gray: "gray",
            lighterGray: "gray-tint",
            darkerGray: "gray-shade",
            transparentGray: "gray-transparent",
            black: "black",
            transparentBlack: "black-transparent"
        },

        primary: {
            default: "primary",
            lighter: "primary-tint",
            darker: "primary-shade",
            saturated: "primary-strong",
            desaturated: "primary-weak",
            transparent: "primary-transparent"
        },

        secondary: {
            default: "secondary",
            lighter: "secondary-tint",
            darker: "secondary-shade",
            saturated: "secondary-strong",
            desaturated: "secondary-weak",
            transparent: "secondary-transparent"
        },

        alternate: {
            default: "alternate",
            lighter: "alternate-tint",
            darker: "alternate-shade",
            saturated: "alternate-strong",
            desaturated: "alternate-weak",
            transparent: "alternate-transparent"
        },

        accent: {
            default: "accent",
            lighter: "accent-tint",
            darker: "accent-shade",
            saturated: "accent-strong",
            desaturated: "accent-weak",
            transparent: "accent-transparent"
        },

        success: {
            default: "success",
            lighter: "success-tint",
            darker: "success-shade",
            saturated: "success-strong",
            desaturated: "success-weak",
            transparent: "success-transparent"
        },

        warning: {
            default: "warning",
            lighter: "warning-tint",
            darker: "warning-shade",
            saturated: "warning-strong",
            desaturated: "warning-weak",
            transparent: "warning-transparent"
        },

        alert: {
            default: "alert",
            lighter: "alert-tint",
            darker: "alert-shade",
            saturated: "alert-strong",
            desaturated: "alert-weak",
            transparent: "alert-transparent"
        }
    }
};

// Sets up the panels for containing the color classes. Gets the color classes from the styles object.
function wowColorClasses() {
    $.each(wowStyles.background, function(color, palette) {
        var colorButtons = "";
        // Gets the color palette and its different shades.
        $.each(palette, function(label, name) {
            var colorId = color[0].toUpperCase() + color.slice(1) + label[0].toUpperCase() + label.slice(1);

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
}
