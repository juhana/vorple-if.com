# Installing Vorple for Inform 7

## Quickstart

These steps install Vorple for **one Inform project only**.

1. Create a new Inform 7 project, or open an existing project with which you
   wish to use Vorple.

2. From Inform, open the project's Materials folder by selecting from the
   top menu *Release &rarr; Open Materials Folder* or pressing &#8984;M on Mac.
   Inform opens the Materials folder in the operating system.

3. [Download the latest Vorple](/download#inform7), unpack it, and move the
   Extensions and Materials folders to the project's Materials folder.
   The Extensions folder contains the Vorple extensions and the Templates folder
   contains the interpreter. The folder structure should now look like this:

   ![Vorple directory structure](/media/image/doc/directory-structure.png)

4. Follow the [instructions for setting up a local server](/doc/localhost) so
   that you can test and play the story.


## Installing Vorple for all projects

To install Vorple so that it's automatically available for all projects, you
need to put the Vorple extensions and the Vorple interpreter to the "normal"
folders that Inform uses to find extensions or interpreter templates.

An easy but slightly tedious way is to install each Vorple extension separately
by selecting "Install Extension..." from the File menu. The extension folder
can also be copied manually to the extension directory. The directory can be
opened from Inform by selecting "Show Installed Extensions Folder" from the
File menu. Copy or move the folder called "Juhana Leinonen" there. If it
already exists, copy the contents there if you don't want to delete previously
installed extensions.

The interpreter template must be installed by hand. The easiest way to find the
template folder is to open the extensions folder as shown in the previous
paragraph and then moving up one level (on a Mac: &#8984;&uarr;). The
folder is called Templates. Move the Vorple folder here. If there already is a
folder called Vorple there, overwrite it with the new one.


## Troubleshooting

### The Extensions folder is in the project's Materials folder but Inform says it can't find the extensions

You probably have an older version of Inform that doesn't support project-specific
extensions. Vorple requires the latest version of Inform (6M62).


### When compiling, Inform reports errors in the Vorple extensions

As above, it's likely that the Inform version is too old. Upgrade to 6M62.


### When compiling, Inform reports "... my copy stipulates that it is 'for Z-Machine only'."

Inform is trying to include an old version of a Vorple extension. Make sure that the
new extensions are installed correctly.


### When releasing, Inform reports "You asked to release along with a copy of the 'Vorple' in-browser interpreter, but this can't handle story files which use the Glulx story file format."

Inform can't find the latest version of the interpreter. Make sure that the
new interpreter is in the correct place, either in the materials folder or
in the global template folder.
