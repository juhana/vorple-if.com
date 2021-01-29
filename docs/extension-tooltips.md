---
id: extension-tooltips
title: Tooltips
---

```inform7
Include Vorple Tooltips by Juhana Leinonen.
```

The Tooltips extension lets the story display small notifications above target elements. Tooltips can be activated when the mouse pointer is over them or at request.


## Tooltips on mouseover

Text with a tooltip can be created with:

```inform7
place text "examine" with a tooltip reading "You can also use the short form X";
```

The tooltip is shown when the reader puts the mouse cursor over the text and hidden when the mouse cursor is moved away.

A tooltip can be added to existing elements (see the Vorple core extension for more on how to create elements):

```inform7
place an inline element called "secret" reading "a mysterious box";
attach a tooltip "You found me!" on the element called "secret";
```

If there are many elements with the same name, the tooltip is attached to the last of them. The tooltip can also be attached to all elements with the same name.

```inform7
attach a tooltip "You found me!" to all elements called "secret"; 
```


## Tooltips on request 

Tooltips can also be triggered manually on existing elements.

```inform7
display a tooltip "Take a look here" on the element called "important";
```

By default the tooltip appears immediately and is hidden in 7 seconds. The delay how long until the tooltip appears and the duration of the tooltip can be changed:

```inform7
display a tooltip "Take a look here" on the element called "important" after 3 seconds for 10 seconds;
```	

The duration can also be "indefinitely" which keeps the tooltip visible until it's manually hidden.

```inform7
display a tooltip "Take a look here" on the element called "important" indefinitely;
```

The default duration can be changed globally. The following example makes all tooltips display for 4 seconds unless otherwise specified:

```inform7
The default tooltip duration is 4.
```

As with tooltips that are activated on mouseover, if there are multiple elements with the same name the tooltip is shown only on the last one. 

A tooltip can be placed on the prompt (handy for giving a hint on how to play to people who aren't familiar with interactive fiction):

```inform7
When play begins:
    display a tooltip "Type something here!" on the prompt.
```		


## Hiding tooltips

The currently open tooltip can be closed immediately with:
	
```inform7
hide the tooltip;
```

An optional duration can be provided:

```inform7
hide the tooltip after 5 seconds;
```

Only one tooltip can be open at a time. Tooltips are automatically closed when a new tooltip is shown.
		

## Examples

### Medical Dictionary

*Technical terms that have their definitions shown in a tooltip*

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=3j4zjd"></iframe>


### How To II

*More tips to new players who might not be familiar with standard IF conventions*

We'll show a tooltip on the prompt to direct the player to use the keyboard, hint about what kind of commands to use if the first command they try is an error and direct their attention to parts of items. 

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=hkgkcv"></iframe>


### Ibid. (2)

*Footnotes that can be read by placing the mouse cursor over them*

We're modifying example 300 (Ibid.) from Writing with Inform to show the footnotes when the mouse cursor is on top of the footnote reference numbers.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=8kkzqg"></iframe>
