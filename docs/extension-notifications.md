---
id: extension-notifications
title: Notifications
---

```inform7
Include Vorple Notifications by Juhana Leinonen.
```

Notifications are messages that show briefly in the top right corner of the page and then fade away. A notification can be displayed with:

```inform7
display a notification reading "Hello World!";
```

Notifications can have a title that's shown in bold type above the notification text:
	
```inform7
display a notification with title "Welcome" reading "Have fun!";
```

The notification is shown for seven seconds before it disappears. The duration can be changed per notification:

```inform7
display a notification reading "Time passes..." for 10 seconds;
```

or globally by changing the `default notification duration` number variable:
	
```inform7
now the default notification duration is 10;
```

There are four different notification types that have different background colors and icons: info, success, warning and error. The default notification type is info.

```inform7
display a warning notification reading "Tread carefully!";
display a success notification with title "Achievement unlocked" reading "You found the secret passage";
```
	

## Fallback

If Vorple isn't available, the fallback is to display the notifications at the end of turn as plain text. The feature can be overridden by checking Vorple's availability:

```inform7
if Vorple is available:
    display a notification reading "Click on your inventory items to examine them more closely";
otherwise:
    say "Type EXAMINE followed by an inventory item's name to examine them more closely.";
    
if Vorple is available:
    display a notification reading "Welcome to Vorple-enhanced [story title]!";
```

The default fallback can also be turned off completely:

```inform7
The print notifications fallback rule is not listed in any rulebook.
```

## Examples

### How To I

*Showing small tips to new players who might not be familiar with the standard IF conventions*

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=t9xjv2"></iframe>


### Score Notifications

*A visual notification when the player is awarded points*

We'll create a rule that will show the score change as a Vorple notification, or use the original score notification rule if the game is being played in a non-Vorple interpreter.
	
<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=hhqjpd"></iframe>
