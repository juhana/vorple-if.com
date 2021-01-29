---
id: extension-hyperlinks
title: Hyperlinks
---

```inform7
Include Vorple Hyperlinks by Juhana Leinonen.
```

There are three kinds of hyperlinks that we can add to the story with this extension: a link to another web site, a link that triggers a parser command, or a link that runs JavaScript code.

In non-Vorple interpreters the links are just plain text that can't be clicked.


## Links to web sites

Hyperlinks open web pages in new browser windows. The addresses should include the "http://" or "https://" prefix, unless the link is pointing to another file on the same server.

```inform7
place a link to web site "https://vorple-if.com" reading "Vorple web page";
```

An optional "called" part defines the link element's additional classes.

```inform7
place a link to web site "https://vorple-if.com" called "system-credits" reading "Vorple web page";
[creates <a href="https://vorple-if.com" class="system-credits weblink">Vorple web page</a>]
```

Clicking on the links open the target web page on a new browser window. The link can be opened in the same window by passing an option:

```inform7
place a link to web site "https://vorple-if.com" reading "Vorple web page", opening in the same window;
```

If the story is run in a standard interpreter, the link description text is displayed but not the web site address (and clicking on the text won't do anything).


## Links to commands

Links to commands by default work just as if they would have been typed on the prompt.

```inform7
place a link to command "open door" reading "door";
```

Leaving out the text content will print the link target instead (so you don't have to write `place a link to "ask the custodian about the missing artifacts" reading "ask the custodian about the missing artifacts"` and so on).

```inform7
say "Feel free to ";
place a link to command "look";
say " around.";
```

The option `without showing the command` runs the command but doesn't show it in the scrollback. The story's response is still printed.

```inform7
place a link to command "inventory" reading "my stuff", without showing the command;
```

In a non-Vorple interpreter only the link text is displayed.


## Links that execute JavaScript code

Links that execute JavaScript code can be created with the following command:

```inform7
place a link to execute the JavaScript command "alert('Hello!')" called "greeting" reading "Hello?";
```

The `called` part is optional.
	
The click event object is available in the execution scope as a variable called `e`. The object is the jQuery's event object in response to the click.


## Examples

### Click to Learn More

*Hyperlinks to external web pages, email links and action links, with a fallback if Vorple is not available*

Email links ("mailto:") open an external mail program with the address pre-filled.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=dg3twj"></iframe>

		
### Click to Retry 

*Clickable options when play ends*

If the story makes use of hyperlinks, we will probably want the options presented when the play ends be clickable as well. This example replaces the rule in the Standard Rules with one that prints the options as hyperlinks.

Because we can't print the topic entry that contains the actual command, we'll assume that the word written in all caps is the correct command.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=kcxfj8"></iframe>


### Mood Swings

*Changing the text of clicked links*

A commonly used technique in modern hypertext IF is to make a linked text cycle through a set of options that changes the story state. For example, clicking on the word "happy" in the text "Alice is happy" changes the sentence to "Alice is sad" without otherwise advancing the story.

Here we do the same thing by making links in character descriptions trigger a hidden command that changes the property called appearance and then changing the link to reflect the new property. The phrase that changes the link (`display text...`) is from the core Vorple extension.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=kcxfj8"></iframe>
