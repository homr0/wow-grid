// Global settings and functions for modifying settings.
// -------------------------------------------------
// Settings for the Wow Grid.
var wow = {
    editor: '.ou-justedit-region',                  // Edit region class, tag, or id.
    editFocus: '.mce-content-body',                 // Focused region class, tag, or id.

    saveExit: '[aria-label="Save and Exit"]',       // Button for saving and exiting
    noSave: '[aria-label="Exit Without Saving"]',   // Button for exiting without saving

    imageChoice: '[aria-label="Insert/edit image"]',// Button for opening image modal.
    imageBrowse: '.mce-i-browse',                   // Button for browsing images.
    imageInsert: '[data-confirm="insert-image"]',   // Button for inserting the background image.
    imageClose: '.mce-close',                       // Button for closing image modal.
    imageLegend: '.mce-dmtag-legend',               // Area for the file name if binary management is used.
    imageLabel: 'LEGEND',                           // Label for filename.

    section: '.section',                            // Section class name
    row: '.grid-x',                                 // Row class name
    column: '.cell',                                // Column class name
    module: '.module',                              // Module class name

    sidebar: '.sidebar',                            // Sidebar class name.
    leftSide: '.left-sidebar',                      // Left sidebar class name
    rightSide: '.right-sidebar',                    // Right sidebar class name

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
    collapse: {},
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

// Allows for users to edit collapse classes by passing in an object with the class name in camelcase and the class name.
function wowStylesCollapseSet(collapse) {
    $.each(collapse, function(name, collapse) {
        wowStyles.collapse[name] = collapse;
    });
}

// Allows user to remove a collapse class.
function wowStylesCollapseRemove(collapse) {
    delete wowStyles.collapse[collapse];
}
