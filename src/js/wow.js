#=include '../node_modules/jquery/dist/jquery.min.js'

//-------------------------------
// initializes Sortable ---------
#=include '../node_modules/sortablejs/Sortable.min.js'

//-------------------------------
//  initializes Magnific Popups -
#=include '../node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'

$(document).ready(function() {
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
        // ------------------------------
        //  initializes Squishi accordion tabs
        #= include 'scripts/accordion-tabs.js'

        //-------------------------------
        // initializes the HTML strings
        #=include 'wow-editor/wow-menus.js'

    // Changes the Wow Grid settings.
    function wowSet() {

    }

    // Waits for the editor to load.
    function wowWait() {
        if($(wow.editor + wow.editFocus).length) {
            setTimeout(function() {
                wowEditor();
            }, 0);
        } else {
            setTimeout(function() {
                wowWait();
            }, 150);
        }
    } wowWait();

    // Loads up the editor.
    function wowEditor() {

        //-------------------------------
        // initializes the elements for the Wow Grid editor
        #=include 'wow-editor/wow-init.js'

        //-------------------------------
        // initializes basic Wow Grid editor
        #=include 'wow-editor/wow-content.js'

        //-------------------------------
        // initializes the funcionaliity for exiting the editor
        #=include 'wow-editor/wow-exit.js'
    }
});
