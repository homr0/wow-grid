// Sets up the code for editing.
// Adds in the editor class.
$(wow.editor + " " + wow.section + ", "
    + wow.editor + " " + wow.row + ", "
    + wow.editor + " " + wow.column + ", "
    + wow.editor + " " + wow.module).addClass('wow-editor');

// Wraps the top-most component into a div with the sortable container.
$('.wow-editor' + wow.section).wrap('<div id="wow-container"></div>');

// Sets up the modules by adding in content containers and editable bounds.
$(wow.editor + " "  + wow.column).each(function() {
    $(this).find(wow.module).each(function() {
        $(this).wrapInner('<div class="editable-bounds" contenteditable="true"></div>');
    });
});

// Adds in the modal area.
$(wow.editor).append('<div class="mfp-hide" id="wow-modal-menu"></div>')

// Functionality for the basic Wow Grid Editor.
$.fn.extend({
    // Applies Animate.css to a component.
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
    },

    // Does the animation for removing a component.
    animateRemove: function(animationName) {
        console.log("Animation for when a component is removed");
        // Puts in modal for removing components.
        $('#wow-modal-menu').html(mfp.remove);

        // Change the modal text.

        // Opens up the popup.
        $.magnificPopup.open({
            items: {
                src: '#wow-modal-menu',
                type: 'inline'
            },
            modal: true
        });

        // Both buttons will close the modal.
        $('.wow-modal-cancel, .wow-modal-remove').on({
            click: function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            }
        });

        // When removng a column, then the row layout may be affected.
        $('.wow-modal-remove').on({
            click: function() {
                if($('.wow-highlight').indexOf(wow.small + "-12")) {
                    // Sets the row to equal length columns (should be small-up-1 and then medium-up-equalLength).
                    var equalLength = $('.wow-highlight').parent().children('.wow-editor').length - 1;
                    $('.wow-highlight').parent().addClass(wow.small + wow.equal + "1", wow.medium + wow.equal + equalLength);

                    // Removes the column width classes.
                    $('.wow-highlight').parent().children('.wow-editor').each(function() {
                        // Removes the small responsive block.
                        $(this).removeClass(wow.small + "-12");

                        // Removes the classes at small, medium, and large breakpoints.
                        var classes = $(this).attr('class');
                        if(classes.indexOf(wow.small)) {
                            var breakSmall = classes.substr(classes.indexOf(wow.small), wow.small.length + 2);
                            $(this).removeClass(breakSmall);
                        } if(classes.indexOf(wow.medium)) {
                            var breakMed = classes.substr(classes.indexOf(wow.medium), wow.medium.length + 2);
                            $(this).removeClass(breakMed);
                        } if(classes.indexOf(wow.large)) {
                            var breakLarge = classes.substr(classes.indexOf(wow.large), wow.large.length + 2);
                            $(this).removeClass(breakLarge);
                        }
                    });
                }
            }
        });

        // Does the animaion.
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('wow-highlight').addClass('animated ' + animationName).one(animationEnd, function() {
            $('.animated').remove();
            //colChange();
        });
    }
});

// Sets up the Sortables.
var sorts = [];
var sortId = document.getElementById('wow-container');

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
