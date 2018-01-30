// Initializes the HTML strings for various menus and settings.
var control = {
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
    control.section = $('.wow-menu.wow-section').detach();
    console.log(control.section);
}, 150);
