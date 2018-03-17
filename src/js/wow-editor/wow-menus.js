// Initializes the HTML strings for various menus and settings.
// Hover menus.
var hover = {
    section: "",
    row: "",
    column: "",
    module: ""
};

// Modal screens.
var mfp = {
    delete: "",
    layout: ""
};

// Loads all of the relevant strings from the grid HTML page.
setTimeout(function() {
    $('body').append('<div class="wow-strings"></div>').append('<div class="wow-popups"></div>');
    $('.wow-strings').load('/js/grid.html .wow-menus');
    $('.wow-popups').load('/js/grid.html .wow-modals');
}, 0);

// Sets the hover menu strings.
setTimeout(function() {
    hover.section = $('.wow-section').detach();
    hover.row = $('.wow-row').detach();
    hover.column = $('.wow-column').detach();
    hover.module = $('.wow-module').detach();
}, 150);

// Sets the Magnific popup modals.
setTimeout(function() {
    mfp.delete = $('.wow-modal-delete').detach();
    mfp.layout = $('.wow-modal-layout').detach();
}, 150);
