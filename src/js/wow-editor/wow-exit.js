// Functionality for saving and exiting as well as saving without exiting the Wow Grid Editor.
function wowClean() {
    // Attaches all strings to be deleted.
    $('.wow-strings').append(hover.section, hover.row, hover.column, hover.module).remove();

    // Removes the editor indicator
    $('.wow-editor').removeClass('wow-editor');
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
