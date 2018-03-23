# wow-grid
A tool for generating a grid in the OmniUpdate WYSIWYG editor JustEdit.

---

## Structure
Editable regions are now split into 4 containers:

> **Sections** > **Rows** > **Columns** > **Modules**

**Sections** divide the editable region into subdivisions for different types of content.

**Rows** contain further divide the section into clean divisions of up to 12 columns.

**Columns** contain and arrange modules.

**Modules** are the individual pieces of content in each part of the page. These are HTML snippets that can contain text, images, and snippets. At this level, you can edit the source code for that particular module.

---

## Objectives
The Wow-Grid will have the following functions:

- Generate, edit, and delete responsive 12-column grid components.
    - This will include layout of columns and general alignments.
- Change background colors of masonry.
- Edit source code of modules.

[Demo](https://homr0.github.io/wow-grid)

### Completed Objectives
- Components can be rearranged.
- Components can be duplicated.
- Components can be deleted.
- Blank components can be added.
- Rows and sections can be added with a specific layout (see Known Issues for bug regarding that).

---

## Known Issues
- Issue with dragging and dropping rows and sections vertically.
- Bug where adding a row or section via modal results in breakpoints not being added in correctly on every even insertion (currently being worked on).
---

## Dependencies

- Git - version control system for code.
- Node.js - cross-platform JavaScript runtime environment.
    - Node Package Manager (NPM) - library for installing Node project dependencies.
        - Yarn - Node package that organizes and updates web components.
        - Gulp - Node package that helps automate work flow.

### Installation for Development
1. Clone this repository.
2. Make sure that Yarn and Gulp are installed globally.
3. Use Yarn to install NPM project dependencies.

    ```sh
    yarn install
    ```
### Testing Environment
Run 'gulp' to spin up a server and get to the test page.
