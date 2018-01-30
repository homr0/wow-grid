// Functionality for saving and exiting as well as saving without exiting the Wow Grid Editor.
function wowClean() {
    // Attaches all strings to be deleted.
    $('.wow-strings').append(control.section, control.row, control.column, control.module).remove();
}

$(wow.saveExit).on('click', function() {
    console.log("Clicked save button");
    wowClean();
});

$(wow.noSave).on('click', function() {
    console.log("Clicked to exit without saving");
    wowClean();
    wowReturn();
});

function wowReturn() {
    setTimeout(function() {
        if($(wow.editor).length == 0) {
            console.log("Going to go wait");
            wowWait();
        } else {
            console.log("Need to return");
            wowReturn();
        }
    }, 150);
}
