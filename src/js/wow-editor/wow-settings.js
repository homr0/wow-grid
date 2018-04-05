// Global settings and functions for modifying settings.
// -------------------------------------------------
// Settings for the Wow Grid.
var wow = {
    editor: '.ou-justedit-region',                  // Edit region class, tag, or id.
    editFocus: '.mce-content-body',                 // Focused region class, tag, or id.

    section: '.section',                            // Section class name
    row: '.grid-x',                                 // Row class name
    column: '.cell',                                // Column class name
    module: '.module',                              // Module class name

    sidebar: '.sidebar',                            // Sidebar class name.
    leftSide: '.left-sidebar',                      // Left sidebar class name
    rightSide: '.right-sidebar',                    // Right sidebar class name

    saveExit: '[aria-label="Save and Exit"]',       // Element for saving and exiting
    noSave: '[aria-label="Exit Without Saving"]',   // Element for exiting without saving

    small: 'small',                                 // Small scale layout
    medium: 'medium',                               // Medium scale layout
    large: 'large',                                 // Large scale layout
    equal: '-up-',                                  // Equal width column layout
    maxColumns: 12,                                 // Maximum number of columns per row.
    maxEqual: 4,                                    // Maximum number of equal width columns.

    strings: '/js/grid.html'                        // URL for the HTML strings
};

// Class names for styles.
var wowStyles = {
    background: {},
    align: {}
};

// Allows for users to edit the background color classes by passing in an object with all the color palettes the user wants to insert.
function wowStylesBackgroundSet(backgrounds) {
    $.each(backgrounds, function(name, palette) {
        wowStyles.background[name] = palette;
    });
}

// Allows user to remove a background color palette.
function wowStylesBackgroundRemove(palette) {
    delete wowStyles.background[palette];
}
