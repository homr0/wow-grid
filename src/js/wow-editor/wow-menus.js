// Initializes the HTML strings for various menus and settings.
var hover = {
    section: "",
    row: "",
    column: "",
    module: "",
};

// Loads all of the relevant strings from the grid HTML page.
setTimeout(function() {
    $('body').append('<div class="wow-strings"></div>');
    $('.wow-strings').load('../../grid.html .wow-menus');
}, 0);

setTimeout(function() {
    hover.section = $('.wow-section').detach();
    hover.row = $('.wow-row').detach();
    hover.column = $('.wow-column').detach();
    hover.module = $('.wow-module').detach();
}, 150);
