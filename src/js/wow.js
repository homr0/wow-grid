#=include '../node_modules/jquery/dist/jquery.min.js'

//-------------------------------
// initializes Sortable ---------
#=include '../node_modules/sortablejs/Sortable.min.js'

//-------------------------------
//  initializes Magnific Popups -
#=include '../node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'

// -----------------------------
// initializes grid the settings
#=include 'wow-editor/wow-settings.js'

$(document).ready(function() {

    //-------------------------------
    //  initializes Squishi accordion tabs
    #= include 'scripts/accordion-tabs.js'

    //-------------------------------
    // initializes the HTML strings -
    #=include 'wow-editor/wow-menus.js'

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
