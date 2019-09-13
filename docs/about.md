---
id: about
title: What is Vorple?
---

Vorple is a toolkit for [Inform 6](http://inform-fiction.org) and [Inform 7](http://inform7.com) that includes a custom web interpreter and a set of extensions/libraries for Inform. The combination of the interpreter and the extensions lets you add features that would otherwise be impossible in standard Inform, such as tooltips, modal windows, and more options for text formatting and multimedia. In fact, you can do anything that's possible in a modern web browser environment, which is quite a lot.

Inform games run in a rigid virtual environment. Vorple "pokes a hole" into this environment and lets you run JavaScript commands directly from Inform code. Some basic functionality is provided as Inform 6 libraries and Inform 7 extensions, so they can be used without any knowledge of JavaScript.

The extensions included are:

* **Command Prompt** – manipulating the user's commands and command history
* **Element Manipulation** – a low-level extension for manipulating the interpreter's HTML elements
* **Hyperlinks** – links that open web pages, run commands, or execute code
* **Modal Windows** – popup windows for displaying additional information
* **Multimedia** – displaying pictures and playing audio
* **Notifications** – small information displays that appear and disappear automatically, for notifying about achievements and such
* **Screen Effects** – text formatting, expanding the capabilities of the standard Glulx Screen Effects extension in Inform 7
* **Status Line** – an extended and adaptive version of the normal status line
* **Tooltips** – tooltips to draw attention to points of interest or showing information about elements when the mouse cursor is on them

A good way to get a feel of what kind of things are possible with Vorple is to
watch the short video below that showcases many of Vorple's features.

<iframe src="https://www.youtube-nocookie.com/embed/Haol9P1Vi-8?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width: 784px; height: 441px"></iframe>

<p>

The game featured in the video is [playable online](https://hlabrande.itch.io/neon-vertex)
and the Inform 6 source code is in the 
[Vorple community contributions GitHub repository](https://github.com/vorple/contributions/tree/master/games/neon-vertex).

A more technical introduction to Vorple is in the [Vorple in depth](in-depth.html) article.