---
id: ui-state
title: Managing the user interface state
---

Vorple lets us build custom user interfaces and have the Inform story exchange
information with the web browser where it's running so that both Inform and the 
browser are aware of the current state of the game. For example, the top half of 
the screen could show a picture of the current location and there might be a
separate list of the player's inventory in a sidebar. When the player moves
around in the game world and picks up things, the Inform game messages the 
browser to update the picture and the inventory list to match where the player
is and what they're carrying.

Conceptually there's two ways to update the user interface state: reactive and 
state-based. Reactive updates mean that the user interface changes as a direct
and immediate consequence of what the player does. The location picture changes 
only when the player moves to another room, and the inventory list is updated 
only when the player picks up or drops something. This is the logic that Inform 
code usually follows ("After going to ..." or "Carry out taking ..." and so on.)

A state-base system doesn't react to user actions but instead monitors the game
state to decide how the user interface should look like. So instead of changing
the location picture when the player moves around, it checks actual location
every turn and shows whichever picture is relevant for that location. Similarly
instead of updating the inventory only when it changes, the inventory listing
is updated every turn.

The upside of a state-based system is that the user interface state is guaranteed
to match the game state, and the downside is that the checks need to be done
every turn (or even more often) instead of only when necessary. 

Because with Vorple the user interface is often a completely separate system 
from the Inform game, a state-based system is more suitable and avoids many issues
related specifically to undo and restoring game sessions.   
 
Here's an example of a problem caused by a reactive user interface update.

* The player goes from room A to room B.
* The game has a trigger in the going action that changes the location image 
  into room B's picture (i.e. the game reacts to the player moving between rooms.)
* The player commands UNDO which leaves them in room A, but Vorple doesn't know 
  that and still shows room B's picture.

The problem is solved by changing the location image based on game state so
that the image shown depends on what the current location is, not what the user 
just did.   


## UI state in Inform 

In code terms the mechanism for changing the location image using standard
reactive technique might look something like this:

Inform 6:

```
Object roomB "Room B"
    with description [;
        VorpleClearElement("location-pictures");
        VorpleSetOutputFocus("location-pictures");
        VorpleImage("room-b.jpg", "Room B");
        VorpleSetOutputFocusMainWindow();
        "A nice room";
    ],
has light;
```

Inform 7:

```inform7
After going to Room B:
	clear the element called "location-pictures";
	set output focus to the element called "location-pictures";
	place an image "room-b.jpg" with the description "Room B";
	set output focus to the main window.
```

To implement the same code as a state-based system, in Inform 6 we add an object 
named `VorpleInterfaceUpdate` which functions as a container of objects, each 
holding in its description a bit of code that does something with the interface.
Any time a prompt is printed (at the end of a turn, after an undo, a restart or 
a restore), the code in each object inside the `VorpleInterfaceUpdate` object 
is run.

```
Object displayRoomB "" VorpleInterfaceUpdate
    with description [;
        if (location == roomB) {
            VorpleClearElement("location-pictures");
            VorpleSetOutputFocus("location-pictures");
            VorpleImage("room-b.jpg", "Room B");
            VorpleSetOutputFocusMainWindow();
        }
    ];
```

In Inform 7 Vorple adds a new rulebook called `Vorple interface update rules`.
This rulebook is run at the end of turn and after the game state has been
restored, either through undoing a turn, restoring a save game, or restarting
the game.

Now the location image is always correct, even after undo and restore. 
Note that using every turn rules is not enough because they don't run after
undo or restore.

```inform7
A Vorple interface update rule:
	if the location is room B:
		clear the element called "location-pictures";
		set output focus to the element called "location-pictures";
		place an image "room-b.jpg" with the description "Room B";
		set output focus to the main window.
```

(In real code we'd probably change the picture based on a property of rooms,
but this is a simplified example.)

If we need to run the interface update manually (for instance while waiting for
a keypress), we can do it by calling the `VorpleUpdateTheInterface()` function
(Inform 6) or with `follow the Vorple interface update rules` (Inform 7).


## Other considerations

The UI update rules should not assume that they're run only once per turn, as 
they could be run at any time to update the UI state. For example the rules 
shouldn't advance any kind of turn counter or otherwise assume that a turn has 
passed since the last time it was run. In general the UI update rules should not
change the game state, only the user interface. 

When using the basic features of extensions included with Vorple we don't need 
to worry about the UI state mechanism — they already handle it correctly. 
UI state is something to take into account only when we're building custom user
interfaces. It's also not necessary if the game has disabled undo and save/restore.

In addition to the Vorple interface update that run every turn, there's a 
similar object in Inform 6 called `VorpleInterfaceSetup` and in Inform 7 a 
rulebook called `Vorple interface setup rules` which work similar to the update 
rules, but are ran only once when the web page is loaded and the game starts. 
The purpose is to set up the user interface, like building the HTML elements 
that the game will need during the play. In contrast to the interface update
rules, the setup rules are guaranteed to run only once and will not run again if
the player restarts the game by commanding RESTART (but will run again if the
player reloads the web page.)
