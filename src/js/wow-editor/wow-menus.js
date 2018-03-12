// Initializes the HTML strings for various menus and settings.
var hover = {
    section: "",
    row: "",
    column: "",
    module: ""
};

var mfp = {
    remove: ""
};

// Loads all of the relevant strings from the grid HTML page.
setTimeout(function() {
    $('body').append('<div class="wow-strings"></div>').append('<div class="wow-popups"></div>');
    $('.wow-strings').load('../grid.html .wow-menus');
    $('.wow-popups').load('../grid.html .wow-modals');
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
    mfp.remove = $('.wow-modal-delete').detach();
}, 150);
