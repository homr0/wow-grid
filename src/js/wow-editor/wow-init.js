// Sets up the code for editing.
// Adds in the editor class.
$(wow.editor + " " + wow.section + ", "
    + wow.editor + " " + wow.row + ", "
    + wow.editor + " " + wow.column + ", "
    + wow.editor + " " + wow.module).addClass('wow-editor');

// Sets up the modules by adding in content containers and editable bounds.
$(wow.editor + " "  + wow.column).each(function() {
    $(this).append('<div class="wow-container"></div>');

    var modules = $(this).children(wow.module).detach();
    $(this).children('.wow-container').append(modules);
    $(this).find(wow.module).each(function() {
        $(this).wrapInner('<div class="editable-bounds" contenteditable="true"></div>');
    });
});

// Sets up the sortables.
// Sets up the column sortable.
sortable('.wow-editor' + wow.row, {
    handle: '.wow-menu',
    items: wow.column,
    forceplaceholderSize: true,
    placeholder: '<div class="' + wow.column + ' wow-editor"></div>',
    placeholderClass: 'wow-sort-ghost wow-sort-ghost-placeholder'
});

// Sets up the module sortable.
sortable('.wow-container', {
    connectWith: 'content',
    handle: '.wow-menu',
    forcePlaceholderSize: true,
    placeholder: '<div class="' + wow.module + ' wow-editor"></div>',
    placeholderClass: 'wow-sort-ghost wow-sort-ghost-placeholder'
})[0].addEventListener('sortstart', function(e) {
    $('.wow-container').addClass('wow-sort-ghost');
});
sortable('.wow-container')[0].addEventListener('sortstop', function(e) {
    $('.wow-sort-ghost').removeClass('wow-sort-ghost');
});

function wowSortables() {
    sortable('.wow-editor' + wow.row);
    sortable('.wow-container');
}

function wowSortDestroy() {
    sortable('.wow-editor' + wow.row, 'destroy');
    sortable('.wow-container', 'destroy');
}
