$('body').append('<div class="wow-menus"></div>');

/*var gridMenus = $.get('../../grid.html', function(data) {
    $('.wow-menus').html(data);
    console.log("Load was performed");
});
*/
console.log("Loaded the menu strings");
$('.wow-menus').load('../../grid.html .wow-menu.wow-section');
var menuSection = $('.wow-button').detach();
console.log(menuSection);
