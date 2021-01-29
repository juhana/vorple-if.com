---
id: extension-modal-windows
title: Modal Windows
---

```inform7
Include Vorple Modal Windows by Juhana Leinonen.
```

A modal window is a screen that pops up on top of the interpreter with text content and a button that closes the modal.


## Simple modals

A modal window with plain text content can be created with:
	
```inform7
show a modal window reading "Hello World!";
```

The modal pops up with the text and an OK button and waits for the player to either click on the button, press enter, space or esc, or click somewhere outside the modal window.

By default the game will pause to wait for the user to dismiss the modal window. This behavior can be switched off with a `without pausing` option:

```inform7
show a modal window reading "Merry Christmas!", without pausing;
say "And a happy new year!";
```

In the above example the modal doesn't pause the game, so the player can see the text "And a happy new year" printed immediately in the game's normal text flow below the modal window. Without the `without pausing` option the text would appear only after dismissing the modal.


## Modals with styled content

The `show a modal window reading ...` lets us show only plain text, but if we want more complex content, we can open the modal without any content and then redirect all following output to it. Anything between phrases `set output focus to the modal window` and `set output focus to the main window` is printed inside the modal.

```inform7
show a modal window;
set output focus to the modal window;
say "[bold type]Welcome![roman type]";
place the image "Cover.jpg" with description "Cover page", centered;
set output focus to the main window;
wait for any key;
```

(`Place the image` phrase is from the [Vorple Multimedia](extansion-multimedia.html) extension.)

Note that when creating a modal window this way we should `wait for any key` after creating the modal so that the game pauses to wait for the player to act.


## Examples

### The Greeter

*Showing a modal at the start of the play*
	
This basic example pops up the modal when the play begins and displays the story title and some basic gameplay instructions.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=jsqsjf"></iframe>


### Version Popup

*Showing the version information in a modal window*

We have two rules here that cause the normal banner to show in a modal instead of in the story text. The first check rule shows a modal window and sets the output focus to it. From then on everything that the game prints (the banner, in this case) will be printed inside the modal. The second report rule runs after the banner has been printed, resuming output back to the normal flow of the game text.
	
<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=w5ztj9"></iframe>
