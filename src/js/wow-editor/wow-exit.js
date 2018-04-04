// Functionality for saving and exiting as well as saving without exiting the Wow Grid Editor.
function wowClean() {
    // Removes the sortables and other event handlers.
    wowSortDestroy();
    $('body').off('mouseenter', '**');
    $('body').off('click', '**');
    $('body').off('mouseleave', '**');

    // Removes all strings and popup divs.
    $('.wow-strings').remove();
    $('.wow-popups').remove();
    $('.mfp-hide').remove();

    // Cleans up any empty class, style, and id attributes.
    $('*[class=""]').removeAttr('class');
    $('.wow-editor').each(function() {
        if(($(this).attr('id') === "") || ($(this).attr('id') === undefined) || ($(this).attr('id') === null)) {
            $(this).removeAttr('id');
        }
    });
    $('*[style=""]').removeAttr('style');

    // Saves module content.
    $('#wow-container ' + wow.column).each(function(index) {
        $(this).find(wow.module).each(function() {
            var wowContent = $(this).find('.editable-bounds').contents();
            $(this).html(wowContent);
        });
    });
    $('#wow-container ' + wow.section).unwrap();

    // Removes the editor indicators.
    $('.wow-editor').removeClass('wow-editor');
    $('.wow-hover').removeClass('wow-hover');
    $('.wow-highlight').removeClass('wow-highlight');
}

$(wow.saveExit).on('click', function() {
    wowClean();
});

$(wow.noSave).on('click', function() {
    wowClean();
    wowReturn();
});

function wowReturn() {
    setTimeout(function() {
        if($(wow.editor).length == 0) {
            wowWait();
        } else {
            wowReturn();
        }
    }, 150);
}
