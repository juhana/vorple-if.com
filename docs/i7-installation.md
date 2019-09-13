---
id: i7-installation
title: Installing Vorple for Inform 7
---

## Quickstart

These steps install Vorple for **one Inform project only**.

1. Create a new Inform 7 project, or open an existing project with which you
   wish to use Vorple.

2. From Inform, open the project's Materials folder by selecting from the
   top menu *Release &rarr; Open Materials Folder* or pressing <kbd>&#8984;</kbd>
   <kbd>M</kbd> on Mac. Inform opens the Materials folder in the operating system.

3. [Download the latest Vorple](/download#inform7), unpack it, and move the
   Extensions and Materials folders to the project's Materials folder.
   The Extensions folder contains the Vorple extensions and the Templates folder
   contains the interpreter. The folder structure should now look like this:

   ![Vorple directory structure](/img/directory-structure.png)

4. Follow the [instructions for setting up a local server](localhost.md) so
   that you can test and play the story.


## Installing Vorple for all projects

Inform 7 comes bundled with a previous version of the Vorple interpreter,
and the Public Library extension repository hosts old versions of the Vorple
extensions. We'll have to make sure Inform uses the new version of the 
interpreter and extensions. 

To install Vorple so that it's automatically available for all projects we
need to put the Vorple extensions and the Vorple interpreter to the "normal"
folders that Inform uses to find extensions or interpreter templates.

An easy but slightly tedious way is to install each Vorple extension separately
by selecting "Install Extension..." from the File menu. The extensions folder
can also be copied manually to Inform's extensions folder. The folder can be
opened from Inform by selecting "Show Installed Extensions Folder" from the
File menu. In the Vorple package we downloaded, inside the Extensions folder, is 
a folder called "Juhana Leinonen". Move or copy this folder into Inform's 
extensions folder. If it's already there, copy only the contents, overwriting
any files that already exists. 

The interpreter template must be installed by hand. The easiest way to find the
template folder is to open Inform's extensions folder as described in the previous
paragraph and then moving up one level (on a Mac: <kbd>&#8984;</kbd> <kbd>&uarr;</kbd>).
The folder is called Templates. Move the Vorple folder here. If there already is 
a folder called Vorple there, overwrite it with the new one.


## Troubleshooting

#### The Extensions folder is in the project's Materials folder but Inform says it can't find the extensions

You probably have an older version of Inform that doesn't support project-specific
extensions. Vorple requires the latest version of Inform (6M62).


#### When compiling, Inform reports errors in the Vorple extensions

If this happens even in a simple project (only including the Vorple extensions), 
as above, it's likely that the Inform version is too old. Upgrade to 6M62.


#### When compiling, Inform reports "... my copy stipulates that it is 'for Z-Machine only'."

Inform is trying to include an old version of a Vorple extension. 
Make sure that the new extensions are installed correctly.


#### When compiling, Inform reports "... my copy stipulates that it is 'for Glulx only'."

The current version of Vorple is compatible with Glulx only. Change the story 
file format to Glulx in Inform settings.


#### When releasing, Inform reports "You asked to release along with a copy of the 'Vorple' in-browser interpreter, but this can't handle story files which use the Glulx story file format."

Inform can't find the latest version of the interpreter. Make sure that the
new interpreter is in the correct place, either in the materials folder or
in the global template folder.


#### When playing the game, the player's command shows on a separate line below the `>` prompt

This happens when trying to play a non-Vorple game in the Vorple interpreter.
You need to include at least one of the Vorple extensions to set up the
interpreter correctly.


#### The game runs, but it's just plain text with none of the Vorple features working

The game is most likely running on a normal interpreter instead of the Vorple
interpreter. Rember to include the Vorple interpreter:

```
Release along with the "Vorple" interpreter.
```

Also note that the built-in interpreter in the Inform 7 IDE doesn't support any
Vorple features, so you'll have to use a web browser to test the game.
Similarly you have to publish the game online instead of distributing only the
story file, because normal interpreters won't support Vorple features.