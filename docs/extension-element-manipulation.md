---
id: extension-element-manipulation
title: Element Manipulation
---

```inform7
Include Vorple Element Manipulation by Juhana Leinonen.
```

Vorple Element Manipulation includes some convenience phrases to manipulate DOM elements on the web interpreter page.

This extension is mainly a low-level helper extension for other extensions, and provides some tools for authors who want the Inform code to interact with their own JavaScript code. It isn't directly useful to most other authors.


## Clearing, removing, hiding and moving elements

```inform7
clear the element called "myElem";
remove the element called "myElem";
hide the element called "myElem";
show the element called "myElem";
move the element called "myElem" under "target";
move the element called "myElem" at the start of "target";
move the element called "myElem" after "target";
move the element called "myElem" before "target";
```

The difference between `clear` and `remove` is that clearing empties the element but leaves it in place, whereas removing takes it out completely. `Move the element under` puts the element at the end of the target element.

The `called` specifier is a class of the element. All phrases target only the last element on the page with the given class, and they all have an `all elements` counterpart that targets all elements with that class.

```inform7
clear all elements called "myElem";
remove all elements called "myElem";
```

and so on.


## Adding and removing names

These phrases add and remove names (classes) of elements.

```inform7
add name "newName" to the element called "myElem";
remove name "oldName" from the element called "myElem";
rename the element called "oldName" to "newName";
```

Names are HTML classes, so if we have an element that looks like this:
	
```html
<div class="myElem"></div>
```

...and we 

```inform7
add name "newName" to the element called "myElem";
```

...it will then look like this:
	
```html
<div class="myElem newName"></div>
```

The `rename` phrase only changes the name of the one class it targets, so it doesn't clear all class names from the element.
	
Similar to other phrases, these too target only the last element with that name. To target all elements:

```inform7
add name "newName" to all the elements called "myElem";
remove name "oldName" from all the elements called "myElem";
rename all the elements called "oldName" to "newName";
```	


## Examples

### Sonnet Carousel

*Showing poems one at a time by showing and hiding elements*

In the grand tradition of hammering in a nail with a wrecking ball, this example creates a "carousel" of a selection of Shakespeare's sonnets. Everything else is removed, including the command prompt, except two links that show next and previous sonnets. When the links are clicked, the previously shown sonnet is hidden and the next one is show instead.

We're including some other Vorple extensions as well to handle the clickable links, font effects, and hiding the command prompt.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=qt7jvp"></iframe>
