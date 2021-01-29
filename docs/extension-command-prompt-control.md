---
id: extension-command-prompt-control
title: Command Prompt Control
---

```inform7
Include Vorple Command Prompt Control by Juhana Leinonen.
```

## Queueing parser commands

The phrase

```inform7
queue a parser command "test me";
```

adds a command to a queue that executes it as player input as soon as the prompt becomes available. For example, the following code runs the commands ABOUT and INVENTORY when the play begins, just as if the player would have typed the commands:

```inform7
When play begins:
    queue a parser command "about";
    queue a parser command "inventory".
```

Specifying `without showing the command` hides the command from view, but not the result of the command. The following example runs the command INVENTORY whenever the player examines the player character:
	
```inform7
After examining the player:
    queue a parser command "inventory", without showing the command.
```

The modifier causes the output to be something similar to:

```text
>x me
As good-looking as ever.

You are carrying nothing.
```

Hiding the command is purely a visual effect. It doesn't stop the turn counter from incrementing or block every turn rules from running, or in any other way differ from commands that the player types. The player can also bring up the hidden command from the command history by pressing the up key (see the next chapter).
	
The feature should be used sparingly: unless there's a specific reason to pass the commands through the parser this way, in vast majority of cases it's better to trigger actions using the standard `try` construct. In the previous example we should rather write `After examining the player: try taking inventory.`

Why queue the commands instead of just passing them to the prompt immediately? Whenever any Inform code is executed, the game loop is processing a turn. Technically the input prompt is available only between turns, so we must wait for it to become available. The story can't start processing a new turn while it's still processing the previous one. 


## Manipulating the command history

The command history is the list of commands that the player has typed previously and can be browsed by pressing the up and down keys on the keyboard. The phrases to add, remove, change and clear the command history are these:

```inform7	
add the command "version" to the command history;
remove the last command from the command history;
change the last command in the command history to "examine mailbox";
clear the command history;
```

Additions, removals and changes always operate on the most recent command in the history. Trying to remove commands from the history when there's nothing to remove doesn't cause an error, the phrase just doesn't do anything. The `clear the command history` wipes out all of them at once.

This feature can be useful when combined with hidden parser commands described in the previous chapter:
	
```inform7
queue a parser command "act secretly", without showing the command;

Before acting secretly when "[player's command]" is "act secretly":
    remove the last command from the command history.
```

...although this is somewhat cumbersome and, as said before, much easier with a standard "try acting secretly" unless there's a very good reason to pass the command through the parser.


## Prefilling the command line

We can insert some text into the command line:

```inform7
prefill the command line with "look";
```

At the end of the turn when it's the player's turn to type a command, the word "look" is already entered into the command line. The player can then either continue to type the rest of the command or delete the prefilled text and issue some other command.


## Changing the previous command

We can also visually change the text of the command the player just typed. The following example changes the abbreviation L to LOOK:

```inform7
After reading a command:
    if the player's command matches "L":
        change the text of the player's previous command to "LOOK".
```
			
This only changes the text on the screen, nothing else. The story file still receives the original command and the command history will show the original command as well, unless changed with the "change the last command in the command history" phrase.


## Hiding and showing the prompt

>This feature is for advanced usage only and not useful unless there's custom JavaScript code involved, so the documentation gets somewhat technical.

The phrases `hide the prompt` and `unhide the prompt` hide and show the command prompt. When the prompt is hidden, the player can't type any commands. This feature is useful for custom JavaScript actions that take some time to finish, e.g. retrieving data from a server, and we don't want the player to take any actions while something triggered by the previous action is still being processed.

Hiding the prompt is needed only for asynchronous operations that don't already block script execution in the browser. It's not necessary to hide the prompt for slow synchronous operations that just take some time to finish.

In most cases the JavaScript code itself will unhide the prompt when it's ready. The JavaScript command to show the prompt is `vorple.prompt.unhide()`. The script can also hide the prompt with `vorple.prompt.hide()`.

`Hide the prompt` only prevents user input. Passing commands to the prompt programmatically with `queue a parser command` still works even when the prompt is hidden.

As the name suggests, the `unhide` phrase only undoes what the `hide the prompt` phrase does. If the prompt is hidden for some other reason (e.g. the story is waiting for a keypress) it will not force the prompt to appear.


## Examples

### Let Me Show You

*A walkthrough command that automatically runs commands*

Many stories include a WALKTHROUGH command that either shows the list of commands that get you to the end or tells you where to find it. Here we're making a walkthrough command that actually enters the commands on the player's behalf.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=nb7kz8"></iframe>


### Clarification Helper

*Prefilling the command line with a partial command*

This example shows brings the player's command back to the command prompt after the story has shown the "What do you want to..." clarification request. If the player types just "take", the story asks "What do you want to take?". The word "take" is added to the next prompt and the player can continue typing with the name of the thing that they wanted to take.
	
<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=9k8dpj"></iframe>


### The Manchurian Candidate 

*Retroactively replacing the player's commands*

A common trick to force the player to type a specific command is to print a fake command prompt, wait for keypresses and print the predetermined command one character at a time, regardless of what keys the player actually presses.

Thanks to the full control we have over the command line and the output, we can take the effect one step further and switch the player's command to something else after the player has already typed it.

This example gives the effect the full treatment: the player's command is intercepted and replaced with a new one inside the game itself, in the scrollback, and in the command history. The fake commands are functionally identical to any commands the user would have typed themselves.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=7vq6ks"></iframe>
