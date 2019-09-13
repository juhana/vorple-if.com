---
id: listeners
title: Event listeners
---

Event listeners are custom JavaScript functions that are called whenever a
certain event happens. They can be used to hook into interpreter-level actions
(waiting for input, starting and ending the game.)

Listeners are closely related to [filters](/docs/filters.html). The main 
difference is that listeners can't change or cancel the event, they are meant
for purely reacting to what the interpreter is doing.

The following events can be listened to:

* `init`: triggers when the game is about to start (`vorple.init()` is called)
* `expectCommand`: triggers after the game starts waiting for lineinput from
  the player (command line input)
* `submitCommand`: triggers after the user has submitted the lineinput and
  after [input filters](/docs/filters.html) have run, but before the input has
  been sent to the Inform game
* `expectKeypress`: triggers after the game starts waiting for a keypress 
  (charinput)
* `submitKeypress`: triggers after the player has pressed a key in response to
  the game expecting a keypress and after input filters have run, but before the
  keypress has been sent to the Inform game
* `quit`: triggers after the engine ends the game, e.g. the player commanded
  QUIT

(The words "before" and "after" in the above list mean "immediately 
before/after".)

> The events won't know how Inform will react to the event. For example the
> `submitKeypress` event will trigger for all keypresses, even if Inform is
> expecting a specific key like space bar and rejects all other keys.

The return value of a listener function is ignored, **except** if the listener
returns a JavaScript promise. In that case the interpreter is paused until the 
promise resolves. The listener chain waits for the promise as well (the next 
listener won't be called before the previous resolves.)


## Adding and removing listeners

The method `vorple.addEventListener()` method is used to add listeners:

```javascript
function myEventListener( event ) {
    // do something with event
}

vorple.addEventListener( 'init', myEventListener );
```

The first parameter is the event's name and the second is the listener function
that's called when the event is triggered. Note that event names are case sensitive.

The same listener can be registered to multiple events at the same time by
passing the event names as an array:

```javascript
vorple.addEventListener( [ 'init', 'quit' ], myEventListener );
```

To stop listening to an event, use `vorple.removeEventListener()` and pass
the same function that was used to register the listener:

```javascript
// removes listener from one event type
vorple.removeEventListener( 'init', myEventListener );

// removes listener from multiple event types
vorple.removeEventListener( [ 'init', 'quit' ], myEventListener );

// removes listener from all event types
vorple.removeEventListener( myEventListener );
```

Remember that in JavaScript two functions are considered the same only if they
refer to the same object, not only if they have the same content. Therefore
`vorple.removeEventListener()` must be called with the *exact same* function.
For example 
`vorple.addEventListener('init', function(event) { console.log(event); })`
and then
`vorple.removeEventListener(function(event) { console.log(event); })` won't work
because those are considered separate functions.

If the same function has been registered multiple times, calling
`vorple.removeEventListener()` will only remove one instance of it at a time.


## Listener parameters

When an event happens, the listener functions are called with one parameter
that's an object that contains information about the event.

All event objects have a key `type` which contains the event's name.

```javascript
{
    type: "init"
}
```

The `submitCommand` receives the following data:

```
{
    type: "submitCommand",

    // the input that will be sent to the interpreter
    input: "...",               

    // the original input before being passed through input filters
    original: "...",            

    // if false, the input was sent programmatically
    userAction: true,

    // was the command set "silent" (not visible) programmatically
    silent: false
}
```

`submitKeypress` gets the following data:

```
{
    type: "submitKeypress",

    // the key that will be sent to the interpreter as a charcode,
    // or null for mouse clicks
    input: 32,  // space

    // the original input before being passed through input filters,
    // or null for mouse clicks
    original: 32,            

    // if false, the input was sent programmatically
    userAction: true,

    // the original keyboard event, or null if keypress was sent programmatically
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    event: KeyboardEvent | MouseEvent,

    // if true, the event was a mouse click (or a tap on a touchscreen)
    // instead of pressing a key on the keyboard
    mouseClick: false
}
```

> [`String.fromCharCode()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
> can be used to get the string representation of the character pressed,
> if one exists.

`init`, `expectCommand`, `expectKeypress` and `quit` don't have any additional
data except the event type.


## Examples

### Redirection when game ends

Normally when the game ends, nothing happens – the interpreter just stops.
By adding a listener for the quit event we can make it do something like
redirect to some other web site.

```javascript
function redirectAfterQuit() {
    window.location.href = "https://vorple-if.com";
}

vorple.addEventListener( "quit", redirectAfterQuit );
```

As a slightly more complex task, the following example asks if the player would
like to give feedback and then redirects them to the feedback form. We're using
[Vex modals](https://github.hubspot.com/vex/) that comes bundled with Vorple and
[Google Forms](https://www.google.com/forms/about/) for the form, but there are
several other similar services available as well.

```javascript
function offerSurvey() {
    vex.dialog.open({
        message: "Thanks for playing! Would you like to help us by filling " +
            "out a short feedback survey? It takes less than two minutes.",
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Sure' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'No thanks' })
        ],
        callback: function( data ) {
            if( data ) {
                // Player answered yes, redirect to the feedback form.
                // URL is found in Google Forms by clicking "Send" in 
                // the editor and selecting the Link icon.
                window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSdKrdELSf8I1yGYBIO2xipDJyVPgKW9Q3eoNUR4mt9HFVlfJw/viewform?usp=sf_link";
            } else {
                // Player answered no, redirect to home page
                window.location.href = "https://vorple-if.com";
            }
        }
    });
}

vorple.addEventListener( "quit", offerSurvey );
```
