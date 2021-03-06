---
id: extension-vorple
title: The main Vorple extension
---

```inform7
Include Vorple by Juhana Leinonen.
```

The Vorple core extension defines the basic structure that's needed for the story file to communicate with the web browser, as well as other low-level rules and phrases that other extensions use to add more features to Vorple.

Authors who are not familiar with JavaScript or who wish to just use the basic Vorple features can read only the first three chapters (Vorple setup, compatibility with offline interpreters and the brief note about the command prompt). The rest of this documentation handles more advanced usage. For more practical usage of Vorple, see other Vorple extensions that implement specific features like [multimedia support](extension-multimedia.html) and [hyperlinks](extension-hyperlinks.html).

## Vorple setup

Every Vorple story must include at least one Vorple extension and the custom web interpreter.

```inform7
Include Vorple by Juhana Leinonen.
Release along with the "Vorple" interpreter.
```

All standard Vorple extensions already have the "Include Vorple" line, so it's not necessary to add it to the story project if at least one of the other extensions are used.

In contrast to previous versions that were only for Z-Machine, version 3 of Vorple is for Glulx only. The project's story file format must be set to Glulx in Inform's Settings pane.
	
At the time of release of the current, third version of Vorple, the latest Inform release 6M62 includes the older version 2 of Vorple which is not compatible with the new extensions. The latest Vorple interpreter template is in the same package as these extensions.

Also note that old Vorple extensions are not compatible with the current version of Vorple. If you get en error message about an extension being for Z-Machine only, the project is trying to include an old extension.


## Compatibility with offline interpreters

Even though Vorple can accomplish many things that are plain impossible to do with traditional interpreters, it's always a good idea to make the story playable text-only as well if at all possible. There are many players to whom a web interpreter or Vorple's features aren't accessible, and it's the Right Thing To Do to not exclude people if it's possible to include them.

A story file can detect if it's being run on an interpreter that supports Vorple. The same story file can therefore be run on both the Vorple web interpreter and other interpreters that have text-only features and display substitute content if necessary. We can test for Vorple's presence with `if Vorple is supported`:

```inform7
Instead of going north:
	if Vorple is supported:
		play sound file "marching_band.mp3";
	otherwise:
		say "A marching band crossing the street blocks your way."
```

(The above example uses the [Vorple Multimedia extension](extensions-multimedia.html).)

The say phrase in the above example is called a "fallback" and it's displayed only in normal non-Vorple interpreters.

All Vorple features do nothing by default if they're not supported by the interpreter, unless otherwise stated in the extension's documentation. If substitute content is not necessary, we don't need to specifically check for Vorple compatibility:

```inform7
Instead of going north:
	play sound file "marching_band.mp3".
```

Many Vorple features can be replicated at least to some extent on standard Glulx interpreters, but in general Vorple extensions don't try to use those Glulx features as a default fallback, but opt to printing plain text where applicable or doing nothing at all. Authors can use their choice of Glulx extensions and the above mentioned "if Vorple is supported" checks to make fallbacks that are most suitable for their story.


## The command prompt

To gain more control over the command prompt, Vorple replaces the built-in prompt with its own. The process should be completely automated: changing the `command prompt` variable should change the Vorple prompt as well, apart from some fringe cases where the source text or an extension does something exotic with the Glulx prompt. The prompt and the player's command are printed on the screen with custom techniques so they will not be included in the usual story output flow. It means that Glulx extensions that capture output text will not be able to read them.

The extension [Vorple Command Prompt Control](extension-command-prompt-control.html) offers features to manipulate the command prompt and the interpreter's line input in general.


## Embedding HTML elements

We can embed simple HTML elements into story text with some helper phrases.

```inform7
place an "article" element;
place a "h1" element called "title";
place a block level element called "inventory";
place an inline element called "name";
```

The previous example generates elements equivalent to this HTML markup:

```html
<article></article>
<h1 class="title"></h1>
<div class="inventory"></div>
<span class="name"></span>
```

The element's name should be one word only and a valid CSS class name. It's safest to only use letters, numbers, underscores and dashes.

Text content can be added on creation:

```inform7
place a "h1" element called "title" reading "An exciting story";
place a "h2" element reading "Story so far:";
```

...or after the elements have been created:
	
```inform7
say "You shall be known as ";
place an inline element called "name";
display text "Anonymous Adventurer" in the element called "name";
```

This technique can be used to modify the story output later (see [example "Scrambled Eggs"](#scrambled-eggs)).

If the text is included at the same time when creating the element, the default behavior in non-Vorple interpreters is to print the text normally. Text added later will not do anything. In other words, `place a "h1" element called "title" reading "An exciting story"` will print "An exciting story" in all interpreters, but `display text "Anonymous Adventurer" in the element called "name"` will not print anything in anywhere other than the Vorple interpreter.

In the above examples element contents should be plain text only. Trying to add nested tags or text styles will lead to erratic behavior. For longer and more complex contents the tags can be opened and closed manually:

```inform7
Report reading the letter:
    open HTML tag "div" called "letter";
    place "h2" element reading "Dear Esther,";
    say "I'm writing to tell you...";
    close HTML tag.
```

When there are multiple elements with the same name, only the last element will be updated. This is to accommodate repeat actions and specifically UNDO which can easily generate duplicate content. To modify all elements, use the following phrase:

```inform7
display "Hello World!" in all elements called "greeting";
```

We can also test whether an element exists or not, or count the number of elements:
	
```inform7
let n be the number of elements called "greeting";
if an element called "greeting" exists: ...
if an element called "greeting" doesn't exist: ...
```

The extension [Vorple Element Manipulation](extension-element-manipulation.html) contains more tools for working with the HTML document.
	
Finally, the Vorple interpreter uses a concept called "output focus" to decide where it should print the story text. Any HTML element* can have the output focus, and any text coming from the story will be appended to the end of that element. For example we can have a separate element where the player's inventory is printed:
	
(* The element that has output focus must be able contain child elements, so void elements, for example `<img>` or `<hr>`, can receive output focus but any output is ignored.)

```inform7
Before taking inventory:
    set output focus to the element called "inventory".
    
After taking inventory:
    set output focus to the main window;
    continue the action.
```

`Set output focus to the main window` returns the focus back to the default location.


## Scrolling to elements

The page can be scrolled to bring a named element into view:
	
```inform7
scroll to the element called "target";
```

The page then scrolls so that the target element's top is near the browser window's top. If the element is already fully visible on the page and its top position is on the top half of the window, the phrase does nothing.

A similar phrase can be used to scroll to the bottom of the page:
	
```inform7
scroll to the end of the page;
```


## Executing JavaScript code

Vorple breaks out of the Glulx sandbox by letting the story file send JavaScript code for the web browser to evaluate. An `execute JavaScript command` phrase is provided to do just this:

```inform7
execute JavaScript command "alert('Hello World!')";
```

There are no safeguards against invalid or potentially malicious JavaScript. If an illegal JavaScript expression is evaluated, the browser will show an error message in the console and the interpreter will halt. (Although this might sound ominous, there's no real danger unless you're doing some very complex things that involve evaluating JavaScript from unknown or untrusted sources, and the web browser itself has its own safeguards. Using any of the official Vorple extensions is safe.)

Any value the JavaScript code returns can be retrieved with "the value returned by the JavaScript command" which gives the return value as text. If we know the type of the return value, we can use specific phrases to retrieve values of those types:
	
```inform7
the text returned by the JavaScript command
the number returned by the JavaScript command
```

There's also a shorthand phrase for testing for boolean return values:
	
```inform7
if the JavaScript command returned true:
    say "Yup."
```

The type of the return value can be retrieved with `the type of the value returned by the JavaScript command`. The list of all possible return value types is [here](js-eval.html#return-values).

The return value gets overwritten by the next JavaScript command's return value (or "undefined" if it doesn't return anything), so it's best to save the value immediately to a variable after executing the command. Otherwise another JavaScript between executing the command and reading the value might cause a hard to detect bug. The other code call might not be obvious, for example changing the font style with the Vorple Screen Effects extension involves a JavaScript call.

```inform7
execute JavaScript command "return [bracket]'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'[close bracket][bracket]new Date().getDay()[close bracket]";
let weekday be the text returned by the JavaScript command;
say "It's [weekday]!";
```

>Since version 3.1, the command must explicitly return a value with the "return" keyword for the expression's value to be readable in Inform. If the command returns nothing or undefined, the value of the last command that explicitly returned a value is still what you get when you query it with a `...returned by the JavaScript command` phrase. In other words:
>
>```inform7
>execute JavaScript command "return 'foo'";
>execute JavaScript command "'bar'";
>say the text returned by the JavaScript command;
>```
>
>The above code will print "foo", because the second line doesn't explicitly return anything. In versions 3.0 and before the same code would have printed "bar".

See [Executing JavaScript code](js-eval-html) for more details about JavaScript evaluation.


## Escaping strings

When evaluating JavaScript expressions, quotation marks must often be exactly right. Inform formats quotes according to literary standards which doesn't necessarily work together with JavaScript. Consider the following example:

```inform7
To greet (name - text):
    execute JavaScript command "alert( 'Hello [name]!' )".

When play begins:
    greet "William 'Bill' O'Malley".
```

This leads to a JavaScript error because all single quotes (except the one in "O'Malley") are converted to double quotes, which in turn leads to a JavaScript syntax error. Changing the string delimiters to single quotes wouldn't help because there's an unescaped single quote as well inside the string.

To escape text we can prefix it with "escaped", which adds backslashes before characters that might cause problems inside strings:

```inform7
To greet (name - text):
	execute JavaScript command "alert( 'Hello [escaped name]!' )".
```

Now the string can be safely used in the JavaScript expression.

By default escaping removes newlines. If we want to turn them into, for example, HTML line breaks, or just preserve them:

```inform7
To greet (name - text):
    let safe name be escaped name using "\n" as line breaks;
    execute JavaScript command "alert( 'Hello [safe name]!' )".
```

Remember to use `[bracket]` and `[close bracket]` for square brackets in JavaScript code.

```inform7
execute JavaScript command "var myArray = [bracket]1, 2, 3[close bracket]";
```

Escaping also turns Unicode characters (basically any characters that aren't letters a-z, numbers or common punctuation) into `\uXXXX` format so that they can be passed to the browser intact. We'll have to escape any strings that contain e.g. accented characters:

```inform7
let destination be "Mêlée Island";
execute JavaScript command "var destination = '[escaped destination]'";
```

Non-escaped Unicode characters show up in the output as question marks or empty squares.


## User interface setup and updates

Vorple provides a separate rulebook called Vorple interface setup rules for setting up the user interface on the browser side. It runs during startup before the when play begins rules. The rulebook is meant for rules that build or initialize the user interface that has to be ready before the story does anything else.

The following example sets up a click handler that adds a custom CSS class to the command prompt. Depending on the CSS rule it might flash the prompt to draw attention to it.

```inform7
Vorple interface setup rule:
	execute JavaScript command "$(document).on('click', function() { $('#lineinput').addClass('highlight') })".
```

When building any user interface elements we need to remember that through save/restore the player can continue the story potentially from any point or rewind actions with undo or restart, unless the story has disabled those commands. We can't rely on JavaScript code that has been run during previous commands because the player might have skipped them by restoring a later save, and we can't assume that turns happen only once because the player might undo and replay a turn. Therefore it's best to initialize the user interface at story start instead of along the way as the story progresses.

There's a mechanism in place that prevents the interface setup rules from running more than once during one session, even if the player restarts the story. In other words the interface setup rules run only when the web page loads. This guarantees that we can't add duplicate event handlers by mistake or otherwise run things twice that should only be run once.

For keeping the web interface up to date there's a rulebook called Vorple interface update rules that's run at the end of every turn and after undoing a turn, restoring a save and restarting the game.

```inform7
Vorple interface update rule:
	execute JavaScript command "document.title = '[escaped printed name of the player][']s adventures'".
```


## Blocking the user interface

If at some point we need to wait for a network request or some other asynchronous operation to finish before continuing with the story, we can prevent the player from doing anything in the meanwhile by blocking the user interface. When the user interface is blocked the player can't type or click on anything, but they can still scroll the page normally. The phrases to block and unblock the user interface are:
	
```inform7
block the user interface;
unblock the user interface;
```

Usually it's the JavaScript code that will unblock the user interface when it's ready by running a `vorple.layout.unblock()` call, but the Inform 7 phrase is provided for cases where the script executes a parser command that causes the story to continue normally.

Note that manually blocking the user interface is necessary only in asynchronous operations, most notably network requests via Ajax. Normal synchronous code already blocks the user interface so the turn can't end before all code has been executed.

The [example "The Sum of Human Knowledge"](#the-sum-of-human-knowledge) shows one use case where we might want to block the user interface: it takes some time for the request to Wikipedia to finish and we don't want the player to continue before the response has been shown on the screen.

Even though typing is disabled while the user interface is blocked, the command prompt is still visible by default (if the story is waiting for line input). In the extension [Vorple Command Prompt Control](extension-command-prompt-control.html) there are phrases to hide the command prompt which can be used together with or instead of blocking the user interface.

		
## Examples

### Convenience Store

*Displaying the inventory styled as a HTML list*

We'll display the inventory listing using HTML unordered lists ("ul"). It might not be immediately obvious why one would want to do this, but if the items are displayed in a proper HTML structure it's possible to use CSS to style them further.
		
<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=3q3znp"></iframe>


### Scrambled Eggs

*Hints that are initially shown obscured and revealed on request*

The hint system works by wrapping scrambled hints in named elements. Their contents can then be later replaced with unscrambled text.
	
<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=4nns2s"></iframe>


### The Grandfather Clock

*Setting the story time to match the real-world time*

In the "synchronize clocks" phrase the system time is retrieved by JavaScript and the story's internal "time of day" variable is changed to match the system time. 

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=jjh2qt"></iframe>
		

### The Sum of Human Knowledge

*Retrieving and displaying data from a third party service*

Here we set up an encyclopedia that can be used to query articles from Wikipedia. The actual querying code is a bit longer so it's placed in an external encyclopedia.js file, which can be downloaded [here](/resources/javascript/encyclopedia.js). Put the file in the project's Resources folder to include it with the release.

Note that the pause between issuing the lookup command and the encyclopedia text appearing on the screen is caused by the time it takes to send a request to and receive a response from Wikipedia.

```inform7
"The Sum of Human Knowledge"

Include Vorple by Juhana Leinonen.
Release along with the "Vorple" interpreter.
Release along with JavaScript "encyclopedia.js".

Library is a room. "The shelves are filled with volumes of an encyclopedia. You can look up any topic you want."

Looking up is an action applying to one topic.
Understand "look up [text]" as looking up.

Carry out looking up when Vorple is supported:
    place a block level element called "dictionary-entry";		
    execute JavaScript command "wikipedia_query('[escaped topic understood]')";
    
Report looking up when Vorple is not supported:
    say "You find the correct volume and learn about [topic understood].".
    
Test me with "look up ducks / look up mars / look up interactive fiction".
```
	