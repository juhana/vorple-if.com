---
layout: default
title: Installing Vorple
desc: Installing Vorple to Inform 7 and setting up the development environment
permalink: /doc/inform7/setup
---

# Installing Vorple for Inform 7

## Quickstart

1. Create a new Inform 7 project, or open an existing project with which you 
   wish to use Vorple.
   
2. From Inform, open the project's Materials folder by selecting from the
   top menu *Release &rarr; Open Materials Folder* or pressing &#8984;M on Mac.
   Inform creates the Materials folder if it doesn't already exist and opens it
   in the operating system.
   
3. [Download the latest Vorple](/download#inform7), unpack it, and move the
   Extensions and Materials folders to the project's Materials folder. 
   The Extensions folder contains the Vorple extensions and the Templates folder 
   contains the interpreter. The folder structure should look like this:
   
   ![Vorple directory structure](/media/image/doc/directory-structure.png)

4. Follow the [instructions for setting up a local server](/doc/localhost) so
   that you can test and play the story.


## Installing Vorple for all projects

To install Vorple so that it's available for all projects, you need to install
the Vorple extensions and the Vorple interpreter.



## Troubleshooting

### The Extensions folder is in the project's Materials folder but Inform says it can't find the extensions

You probably have an older version of Inform that doesn't support project-specific
extensions. Vorple requires the latest version of Inform (6M62).


### When compiling, Inform reports errors in the Vorple extensions

As above, it's likely that the Inform version is too old. Upgrade to 6M62.


### When compiling, Inform reports "... my copy stipulates that it is 'for Z-Machine only'."

Inform is trying to include the old version of Vorple that's included with the 
Inform installation. Make sure that the new extensions are installed correctly.
 

### When releasing, Inform reports "You asked to release along with a copy of the 'Vorple' in-browser interpreter, but this can't handle story files which use the Glulx story file format."

Inform can't find the latest version of the interpreter. Make sure that the 
new interpreter is in the correct place, either in the materials folder or
in the global library folder.


{% include doc/footer.html %}