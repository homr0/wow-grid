// Starts the Wow Grid Editor
function wowGrid(preview) {
    // Button functions.
    // Contextual/hover menu functionality for all components of the grid.
    $('body').on({
        mouseenter: function() {
            $('.wow-hover').removeClass('wow-hover');
            $(this).addClass('wow-hover');
            wowMenu();
            var focused = $('.wow-hover');

            // Configures a component.
            $('.wow-edit').off().on({
                click: function() {
                    wowEdit($(focused));
                }
            });

            // Duplicates a component.
            $('.wow-duplicate').off().on({
                click: function() {
                    wowDuplicate($(focused));
                }
            });

            // Moves a component down.
            $('.wow-down').off().on({
                click: function() {
                    wowDown($(focused));
                }
            });

            // Moves a component up.
            $('.wow-up').off().on({
                click: function() {
                    wowUp($(focused));
                }
            });

            // Deletes a component.
            $('.wow-delete:not(.disabled)').off().on({
                click: function() {
                    wowDelete($(focused));
                }
            });

            // Adds a component.
            $('.wow-add').off().on({
                click: function() {
                    wowAdd($(focused), $(this).attr('class'));
                }
            });
        },
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.wow-editor.wow-highlight').removeClass('wow-highlight');
            $(this).addClass('wow-highlight');
        },
        mouseleave: function() {
            // Puts the menu on to the parent component due to hovering issue.
            $('.wow-hover').removeClass('wow-hover');
            $(this).parent().addClass('wow-hover');
            wowMenu();
        }
    }, '.wow-editor');

    // Removes any Wow Editor components when not in a valid area.
    $('body').on({
        click: function() {
            $('.wow-editor.wow-highlight').removeClass('wow-highlight');
            $('.wow-hover').removeClass('wow-hover');
            $('.wow-menu, .wow-add').remove();
        }
    }, ':not(.wow-editor)');
} wowGrid(wow.editor);

//  Wow Grid Hover Menu
//  -------------------
// Sets up the hover menu.
// Sets up the data-wow-name, which is the hovered component's id.
function wowMenu() {
    // Cleans and detaches any menus that are out.
    $('.wow-menu, .wow-add').removeClass('wow-end-top wow-end-bottom wow-single').detach();
    var component = "";

    // Shows menu for component and sets the data-wow-name.
    if($('.wow-hover').hasClass(wow.section.slice(1))) {
        component = wow.section;
        $('.wow-hover').append(hover.section);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Section");
    } else if($('.wow-hover').hasClass(wow.row.slice(1))) {
        component = wow.row;
        $('.wow-hover').append(hover.row);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Row");
    } else if($('.wow-hover').hasClass(wow.column.slice(1))) {
        component = wow.column;
        $('.wow-hover').append(hover.column);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Column");
    } else if($('.wow-hover').hasClass(wow.module.slice(1))) {
        component = wow.module;
        $('.wow-hover').append(hover.module);
        $('.wow-hover .wow-menu').attr('data-wow-name', "Module");
    }

    // Sets the data-wow-name for the menu if an id exists.
    if($('.wow-hover').attr('id') !== "") {
        $('.wow-menu').attr('data-wow-name', $('.wow-hover').attr('id'));
    }

    // Disables the delete button if there is only one type of the component in its container except for modules.
    if(($('.wow-hover').parent().children(component).length === 1) && (component !== wow.module)) {
        $('.wow-button.wow-delete').addClass('disabled');
    } else {
        $('.wow-button.wow-delete').removeClass('disabled');
    }

    // Hides up or down arrows if the section or row is at the top or bottom of its container.
    if(((component === wow.section) || (component === wow.row)) && !($('.wow-menu').hasClass('wow-single'))) {
        if($('.wow-hover').parent().children(component).first().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-top');
        } else if($('.wow-hover').parent().children(component).last().hasClass('wow-hover')) {
            $('.wow-menu').addClass('wow-end-bottom');
        }
    }
}

///-------------------------------
// functionality for adjusting layouts
#=include 'wow-editor/wow-layouts.js'

///--------------------------------
// functionality for editing components
#=include 'wow-editor/wow-edit.js'

// Wow Grid Button Functions
//  ------------------------
// Configures the component.
function wowEdit(wowFocus) {
    $('#wow-modal-menu').html(mfp.edit);
    // Sets up the class names.
    wowColorClasses();
    $.magnificPopup.open({
        items: {
            src: '#wow-modal-menu',
            type: 'inline'
        }
    });

    // Hides all of the title tabs.
    $('.wow-modal-edit').children('.squishi').first().children('.squishi-title').hide();

    //--------------------------------------------------------------------------
    // Background color/image and id change functionality called.
    $('.squishi-title a[href="#selectStyle"]').parent().show().trigger('click');
    $('body').on({
        change: function() {
            wowColorChange('#wowPreviewColor');
        }
    }, '[name=backgroundColor]');

    // When the tab for the color palette is clicked, the first shade is picked.
    $('.wow-color-choice .squishi-title').on({
        click: function() {
            $($(this).children('a').attr('href')).children('[name=backgroundColor]').first().trigger('click');
            wowColorChange('#wowPreviewColor');
        }
    });

    // Gets the current color class for the component.
    var colorClass = wowColorClassGet(wowFocus);
    if(colorClass == false) {
        // Clicks the "No Background Color" tab.
        $('#colorNone').trigger('click');
    } else {
        // Finds the value of the color class and then clicks on the correct tab.
        var colorTab = "#" + $('[name=backgroundColor][value='+ colorClass + ']').parent().attr('id');
        $('.wow-color-choice').find('a[href="' + colorTab + '"]').trigger('click');
        $('[name=backgroundColor][value='+ colorClass + ']').trigger('click');
    }

    // If the component has a background image, then that is also loaded on to the preview.
    if($(wowFocus).css('background-image') !== "none") {
        $('#wowPreviewColor').css('background-image', $(wowFocus).css('background-image'));
    }

    // Functionality for inserting a background image.
    $('body').on('click', '.wow-modal-image-insert', function() {
    	$(imageChoice).trigger('click');
    	$(imageBrowse).trigger('click');

    	$('body', parent.document).off().on('click', imageInsert, function() {
    		setTimeout(function() {
    			var imageUrl = $('html ' + imageChoice + ' input').first().val();
    			if(imageUrl !== undefined) {
    				// Checks if binary management is being used if.
    				if(imageUrl.charAt(0) === "{") {
    					imageUrl = $('html ' + imageChoice + ' ' + imageLegend).first().text();
    				}

    				if(imageUrl === imageLabel) { // If it is LEGEND, then user will need to click insert again.
    					$(imageBrowse).trigger("click");
    				} else {
    					$('body', parent.document).off('click', imageInsert);
    					$('.wow-modal-image-remove').removeClass('disabled');
    					$('#wowPreviewColor').css('background-image', 'url(' + imageUrl + ')');
    					$(imageChoice + ' ' + imageClose).trigger('click');
    				}
    			}
    		}, 0);
    	});
    });

    // Functionality for removing a background image.
    $('body').on('click', '.wow-modal-image-remove', function() {
    	$('.wow-modal-image-remove').addClass('disabled');
    	$('#wowPreviewColor').css("background-image", "none");
    });

    //--------------------------------------------------------------------------
    // Layout tab is called.
    if((wowFocus).hasClass(wow.row.slice(1))) {
        $('.squishi-title a[href="#selectLayout"]').parent().show();
        wowLayout(wowFocus, true);
    }

    // Adds in the confirmation area.
    $('.wow-modal-edit').append(mfp.confirm);

    // Both buttons will close the modal.
    $('.wow-modal-cancel, .wow-modal-confirm').on({
        click: function(e) {
            e.preventDefault();
            $.magnificPopup.close();

            // Changes the background color class.
            wowColorChange(wowFocus);

            // Changes the background image.
            $(wowFocus).css('background-image', $('#wowPreviewColor').css('background-image'));
        }
    })
}

// Duplicates the component.
function wowDuplicate(wowFocus) {
    // Clones the component.
    $(wowFocus).children('.wow-menu').removeClass('wow-single');
    $(wowFocus).clone().insertAfter($(wowFocus)).animateCss('zoomIn');

    // Removes any menu classes and extraneous classes and ids.
    var wowCloned = $(wowFocus).next();
    $(wowCloned).removeClass('wow-highlight');
    $(wowCloned).children('.wow-menu').removeClass('wow-end-top wow-end-bottom');
    $(wowCloned).removeAttr('id').find('.wow-editor').removeAttr('id');

    // Reloads the sortables.
    wowSortReload();
    wowColumnChange();
}

// Moves a component down.
function wowDown(wowFocus) {
    $(wowFocus).fadeOut(500, function() {
        $(wowFocus).next().fadeOut(500);
        $(wowFocus).before($(wowFocus).next());
        $(wowFocus).prev().fadeIn(500);
    }).fadeIn(500);
}

// Moves a component up.
function wowUp(wowFocus) {
    $(wowFocus).fadeOut(500, function() {
        $(wowFocus).prev().fadeOut(500);
        $(wowFocus).after($(wowFocus).prev());
        $(wowFocus).next().fadeIn(500);
    }).fadeIn(500);
}

// Deletes a component.
function wowDelete(wowFocus) {
    $('.wow-highlight').removeClass('wow-highlight');
    $(wowFocus).addClass('wow-highlight');

    // Opens the component deletion modal.
    $('#wow-modal-menu').html(mfp.delete);
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

            if($(this).hasClass('wow-modal-remove')) {
                $(wowFocus).animateCss('zoomOut');
                setTimeout(function() {
                    $(wowFocus).remove();
                    wowColumnChange();
                }, 300);
            }

            $.magnificPopup.close();
        }
    });
}

// Adds a component
function wowAdd(wowFocus, wowAddButton) {
    var addedContent = $(html.content).wrapInner(html.editable).wrapInner(html.module);

    // Modifies the added content.
    if((wowAddButton.indexOf('wow-column') >= 0) && (wowAddButton.indexOf('wow-module') < 0)) {
        addedContent = $(addedContent).wrapInner(html.column);
    } else if(wowAddButton.indexOf('wow-row') >= 0) {
        addedContent = $(addedContent).wrapInner(html.column).wrapInner(html.row);
    } else if(wowAddButton.indexOf('wow-section') >= 0) {
        addedContent = $(addedContent).wrapInner(html.column).wrapInner(html.row).wrapInner(html.section);
    }

    // Adds and animates the newly added component.
    if((wowAddButton.indexOf('wow-column') >= 0) && (wowAddButton.indexOf('wow-module') >= 0)) {
        // A module is appended to the focused column.
        $(wowFocus).append(addedContent);
        $(wowFocus).children(wow.module).last().animateCss('zoomIn');
    } else {
        // A new component is added after the focused component.
        $(wowFocus).after($(addedContent).html());

        if($(wowFocus.hasClass(wow.module.slice(1)))) {
            if($(wowFocus).hasClass(wow.column.slice(1))) {
                // For columns if it is a special layout, then the new column will have breakpoint classes.
                if($(wowFocus).attr('class').indexOf(wow.small) >= 0) {
                    $(wowFocus).next().addClass(wow.small + "-" + wow.maxEqual);
                }

                if($(wowFocus).attr('class').indexOf(wow.medium) >= 0) {
                    $(wowFocus).next().addClass(wow.medium + "-" + wow.maxEqual);
                }

                if($(wowFocus).attr('class').indexOf(wow.large) >= 0) {
                    $(wowFocus).next().addClass(wow.large + "-" + wow.maxEqual);
                }
                wowColumnChange();
                wowSortReload();
            } else if($(wowFocus).hasClass(wow.row.slice(1))) {
                // For new rows, a layout is selected for the new row.
                $(wowFocus).next().addClass(wow.small + wow.equal + 1);
                wowLayout($(wowFocus).next());
            } else if($(wowFocus).hasClass(wow.section.slice(1))) {
                // For new sections, a layout is selected for the row in the new section.
                $(wowFocus).next().children(wow.row).addClass(wow.small + wow.equal + 1);
                wowLayout($(wowFocus).next().children(wow.row));
            }
        }

        $(wowFocus).next().animateCss('zoomIn');
    }
}
