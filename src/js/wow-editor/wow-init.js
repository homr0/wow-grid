// Sets up the code for editing.
// Adds in the editor class.
$(wow.editor + " " + wow.section + ", "
    + wow.editor + " " + wow.row + ", "
    + wow.editor + " " + wow.column + ", "
    + wow.editor + " " + wow.module).addClass('wow-editor');

// Sets up the modules by adding in content containers and editable bounds.
$(wow.editor + " "  + wow.column).each(function() {
    $(this).append('<div class="content-container"></div>');
    console.log($(this).html());

    var modules = $(this).children(wow.module).detach();
    console.log($(modules).html());
    $(this).children('.content-container').append(modules);
    $(this).find(wow.module).each(function() {
        $(this).wrapInner('<div class="editable-bounds" contenteditable="true"></div>');
    });
});
