// Sets up the code for editing.
// Adds in the editor class.
$(wow.editor + " " + wow.section + ", "
    + wow.editor + " " + wow.row + ", "
    + wow.editor + " " + wow.column + ", "
    + wow.editor + " " + wow.module).addClass('wow-editor');

// Wraps the top-most component into a div with the sortable container.
$('.wow-editor' + wow.section).wrap('<div id="' + wow.sortId + '"></div>');

// Sets up the modules by adding in content containers and editable bounds.
$(wow.editor + " "  + wow.column).each(function() {
    $(this).find(wow.module).each(function() {
        $(this).wrapInner('<div class="editable-bounds" contenteditable="true"></div>');
    });
});

// Functionality for the basic Wow Grid Editor.
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
    },

    animateRemove: function(animationName) {
        console.log("Animation for when a component is removed");
    }
});

// Sets up the Sortables.
var sorts = [];
var sortId = document.getElementById(wow.sortId);

// Initializes sortables for sections.
var master = Sortable.create(sortId, {
    group: 'sections',
    animation: 150,
    draggable: wow.section,
    handle: '.wow-menu.wow-section',
    ghostClass: 'wow-sort-ghost'
});

// Destroys existing sortables to prevent overloading the RAM.
function wowSortDestroy() {
    if(sorts.length !== 0) {
        for(var i = sorts.length - 1; i >= 0; i--) {
            sorts[i].destroy();
            sorts.splice(i, 1);
        }
    }
}

function wowSortReload() {
    wowSortDestroy();

    // Initializes the sortables for rows.
    $(wow.section).each(function(i, e) {
        sorts.push(Sortable.create(e, {
            group: 'rows',
            animation: 150,
            draggable: wow.row,
            handle: '.wow-menu.wow-row',
            ghostClass: 'wow-sort-ghost'
        }));
    });

    // Initializes the sortables for columns.
    $(wow.row).each(function(i, e) {
        sorts.push(Sortable.create(e, {
            //group: 'columns',
            animation: 150,
            draggable: wow.column,
            handle: '.wow-menu.wow-column',
            ghostClass: 'wow-sort-ghost'
        }))
    });

    // Initializes the sortables for modules.
    $(wow.column).each(function(i, e) {
        sorts.push(Sortable.create(e, {
            group: 'modules',
            animation: 150,
            draggable: wow.module,
            handle: '.wow-menu.wow-module',
            ghostClass: 'wow-sort-ghost'
        }));
    });
} wowSortReload();
