---
id: filters
title: Input and output filters
---

As we learned in the previous article, [event listeners](/docs/listeners.html)
are used to react to events happening in the interpreter without interfering.
If we want to modify the input or output, we'll use filters.


## Input filters

Input filters observe and can potentially change commands that the user types 
before they reach the interpreter. Some use cases could be for example allowing
characters that Inform doesn't usually accept as input, or expanding the parser
in ways that would be impossible or impratical to do with Inform.

If the player input changes after going through filters, Inform receives this
changed input as if it were what the player typed. There's no way to tell from
inside Inform that the input was modified or what the original input was.


### Adding and removing input filters

Registering an input filter is done by creating a function and passing it to 
`vorple.prompt.addInputFilter()`:

```javascript
function myInputFilter( input, meta ) {
    // do something with input
}

// register the function as a filter - do not call the function at this point,
// only pass it as a reference!
vorple.prompt.addInputFilter( myInputFilter );
```

The function is now called every time the user types a command or presses a key
when the game expects a keypress. Whatever text the function returns becomes
the new command.

All filters trigger for both line input events (player types a command)
and character input events (game is waiting for a keypress.) See the `meta.type`
parameter in the next section on how to check what the current event is.

Input filters can be removed with `vorple.prompt.removeInputFilter()` or
calling the function that's returned by the  `vorple.prompt.addInputFilter()`
method:

```javascript
const removeFilter = vorple.prompt.addInputFilter( myInputFilter );

// to unregister later:
vorple.prompt.removeInputFilter( myInputFilter );
// ...or...
removeFilter();
```

> See the "Adding and removing listeners" section in the 
> [Event listeners article](/docs/listeners.html) for general caveats about
> removing filters.


### Filter parameters

The filter function receives the player's input as a string and a meta object
that has more information about the input event (`input` and `meta` parameters
in the examples on this page.) The meta object contains the following data:

```javascript
{
    input: "...",       // same as the first parameter
    original: "...",    // the original input before previous filters changed it
    type: "line",       // either "line" or "char"
    userAction: true,   // if false, the input was sent programmatically
    silent: false       // was the command set "silent" (not visible) programmatically
}
```

If there's more than one filter, they are called one after another in the
order that they were registered. If a filter changes the input, 
**the changed input is passed to the next filter**. The original, unchanged
input is in `meta.original`.

Input filters are called every time input is passed to the interpreter, even
when it's done programmatically with `vorple.prompt.queueCommand()` or
`vorple.prompt.queueKeypress()`. Commonly we would want to react only to actual
user input and typically only to line input, so the filter would start with
something like this:

```javascript
function userLineinputFilter( input, meta ) {
    if( !meta.userAction || meta.type !== "line" ) {
        // not a user action or not line input, skip this one!
        return;
    }

    // do something with input
}
```


### Return values

A filter must return one of the following:

* A string, which will then become the new input
* Nothing (`undefined`), `null` or `true`, to not apply this filter
  (doesn't change the input)
* `false`, to cancel the input event
* A promise that resolves to any of the previously described values,
  or rejects to cancel the event

Canceling the input event by returning `false` will stop the input event and any
consequent filter functions will not be called. Note that canceling the event
won't clear the player's command from the prompt, so it must be cleared manually
with `vorple.prompt.setValue("")` if that's the required behavior. 

If a filter returns a promise, the entire filter chain pauses to wait for the
promise to resolve. Rejecting the promise is equivalent to resolving to `false`
(the input event will be canceled.) Note that the game will get stuck forever if
the promise never resolves, so make sure to resolve or reject from all possible
situations.

Returning nothing, `null` or `true` signifies that this filter should be ignored
and it won't change the input (but the effect of any previous or following
filters won't be canceled.) The following filters are all equivalent as they
won't change the input:

```javascript
function returnSameFilter( input ) {
    return input;   // returns unchanged input
}

function nullFilter() {
    return null;    // or true or just "return;"
}

function brokenFilter( input ) {
    input = "changed input";

    // doesn't return anything so change doesn't apply,
    // remember to return the changed value!
}

function promiseFilter( input ) {
    return new Promise( function( resolve ) {
        // do some asynchronous work here

        // continue with unchanged input
        resolve( input );
    })
}

// same as above, but using an async function
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
async function asyncFilter( input ) {
    // do some asynchronous work here

    // continue with unchanged input
    return input;
}
```

When the player types a command and a filter changes it, Inform receives the
changed command but **the original, unchanged command remains in the prompt**.
If the prompt should reflect the changed command, we can change it with
`vorple.prompt.setValue()`:

```javascript
function confusionFilter( input ) {
    // .toLowerCase().trim() changes to lowercase and removes extra spaces
    switch( input.toLowerCase().trim() ) {
        case "yes":
            vorple.prompt.setValue( "no" );
            return "no";
    
        case "no":
            vorple.prompt.setValue( "yes" );
            return "yes";
    }
}
```

If the command isn't canceled and `vorple.prompt.setValue()` is used to change
the user's command inside a filter, the command history (accessible within the
game with up and down arrow keys) will also use the new value.


### Examples

#### Character replacements

In this example we want to let the player type the special characters with
diacritics used in Esperanto: ĉ, ĝ, ĥ, ĵ, ŝ, and ŭ. Inform usually can't read
these characters from the prompt, but we can change them to *cx*, *gx*, *hx*,
*jx*, *sx* and *ux* substitutions before sending the commands on to Inform.

```javascript
function esperantoFilter( input, meta ) {
    // applies only to line input
    if( meta.type !== "line" ) {
        return;
    }

    const replacements = [ 
        { from: "ĉ", to: "cx" },
        { from: "ĝ", to: "gx" },
        { from: "ĥ", to: "hx" },
        { from: "ĵ", to: "jx" },
        { from: "ŝ", to: "sx" },
        { from: "ŭ", to: "ux" }
    ];

    return replacements.reduce( function( result, item ) {
        return result.split( item.from ).join( item.to );
    }, input );
}

vorple.prompt.addInputFilter( esperantoFilter );
```

Now when the player types "eksiĝu", Inform receives it as "eksigxu".

> The `.split().join()` "trick" is commonly used to search-and-replace strings
> in JavaScript: it splits the string in parts using the given string as a 
> separator, and then joins the parts together with the replacement string in
> between.

The above function can be used for other character substitutions with small
modifications, with the caveat that it makes the next substitution using the
previous step, which means that some care must be taken not to accidentally
substitute something that was already substituted earlier.


#### Rejecting input

Here's an example for rejecting some of user's keypresses. Let's say we have a
minigame that has the player move around a map using W, A, S and D keys.
Pressing any other key continues the normal Inform game. We can register a
filter before starting the minigame that doesn't pass those keypresses on to
Inform.

```javascript
function rejectKeysFilter( input, meta ) {
    // applies only to user action and char input
    if( !meta.userAction || meta.type !== "char" ) {
        return;
    }

    // convert the keypress to a string that contains the character
    const key = String.fromCharCode( input ).toLowerCase();

    // returns false (reject input) if input is one of the options,
    // otherwise returns true (accept input)
    return [ "w", "a", "s", "d" ].indexOf( key ) === -1;
}

vorple.prompt.addInputFilter( rejectKeysFilter );
```

In Inform we would register this filter when the minigame starts and unregister
it when the minigame ends, to avoid blocking the keypresses when not necessary.

```inform7
[when minigame begins:]
execute JavaScript command "vorple.prompt.addInputFilter(rejectKeysFilter)";

[when minigame ends:]
execute JavaScript command "vorple.prompt.removeInputFilter(rejectKeysFilter)";
```


#### Pausing the game

In this example we're literally delaying the game for a fixed amount of time,
but in real life scenarios we'd more likely use this to wait for a response
from an Ajax call or for further input from the user. The game is effectively
paused until the promise resolves.

```javascript
function processingEffectFilter( input, meta ) {
    // let the effect happen also when input is given programmatically,
    // but not when it's completely hidden
    if( meta.type !== "line" || meta.silent ) {
        return;
    }

    // toastr is the notification library that's bundled with Vorple.
    toastr.info( "Processing...", { timeOut: 3000 } );  // 3000 ms = 3 seconds

    // when the notification has disappeared, continue with the game
    return new Promise( function( resolve ) {
        setTimeout( resolve, 3000 );
    });
}

vorple.prompt.addInputFilter( processingEffectFilter );
```

(Players generally dislike artificial delays, but for a simplified example's 
sake let's assume that the effect would be used sparingly.)


## Output filters

Output filters are used to read and/or modify the story's raw text output.
The filters are called every time the interpreter flushes the output buffer
(unless the buffer is empty and nothing would be printed.)


### The output buffer

The game text comes out of the interpreter typically in many smaller parts.
Technically the interpreter collects the output to a *buffer*, and at certain
points "flushes" the buffer which displays the text that's currently in the 
buffer. The buffer is then emptied and the interpreter continues collecting
further output into the buffer. This is done for performance reasons: printing
the output immediately one character at a time would create an unwanted
"typewriter effect" and slow down the output. 

Because of how the display system works, the output buffer must be flushed
whenever the text style changes. In Vorple, the buffer is also flushed when the
story file executes JavaScript code or creates HTML elements. There are also
other situations when the output buffer is flushed so relying on it happening
at only certain points is inadvisable.

When printing the following Inform 7 code:

```inform7
say "Such a [italic type]lovely[roman type] evening!";
```

...the buffer would be flushed *at least* three times: First to get "Such a ",
then "lovely" and finally " evening!" although it's not guaranteed that the
output won't be split into even smaller parts.


### Adding and removing output filters

The procedure for adding and removing output filters is the same as with 
input filters and [event listeners](/docs/listeners.html) but with
`vorple.output.addOutputFilter()` and `vorple.output.removeOutputFilter()`:

```javascript
function myOutputFilter( output, meta ) {
    // output contains the text to be printed
}

const remover = vorple.output.addOutputFilter( myOutputFilter );

// remove the filter
vorple.output.removeOutputFilter( myOutputFilter );
// ...or...
remover();
```

The first parameter contains the output that will be printed after the filters
have run, the second one is an object with the following information about the
event:

```javascript
{
    output: "...",      // same as the first parameter
    original: "...",    // the original output before filters changed it
    style: {            // what basic style will be applied to the text
        bold: true,
        italic: false
    }
}
```

The style object contains basic font styles that the text will have when
printed to the screen. Note that these are styles that are "built-in" to Inform,
not custom Vorple styles in the Screen Effects extension/library.

Output filters can't change text styles so modifying the style object won't have
any effect.


### Return values

If the filter returns:

* a string, the output will be changed to whatever that string is.
* `false`, any further output filters will not run. Any filters run previously
  will still stay in effect.

Returning anything else won't have any effect (the output stays unchanged.)


### Accessing the HTML output

The browser will use HTML to show the final output (just like all web pages),
but the output filter can only catch the raw text output. The HTML content is
built as a combination of the story text, native Glulx styling features and
JavaScript commands.

The best way to access the final HTML (and potentially change it) is by 
registering an event listener for the `expectCommand` and `expectKeypress` 
events. A stream of text output from Inform always ends in either one of these
two events or the `quit` event. The previous turn's output will be rendered in
HTML at that point. The current turn is contained in a HTML element that has
classes `turn` and `current`.

If the turn has already ended, the previous turn is in an element with class
`previous` instead of `current`. All other turns have just the class `turn`
alone.

The following event listener grabs the latest turn's HTML content:

```javascript
function htmlListener( event ) {
    let htmlContent = $( ".turn.current" ).html();
    // or without jQuery:
    // let htmlContent = document.querySelector( ".turn.current" ).innerHTML;

    // do something with the HTML
    htmlContent += " :)";
    $( ".turn.current" ).html( htmlContent );
}

vorple.addEventListener( [ "expectCommand", "expectKeypress" ], htmlListener );
```

The turn content includes the player's command and the prompt, so 
`$( ".turn.current" ).children.not( ".lineinput" )` would select only the story
output without the prompt.

> Pausing the story by waiting for a keypress doesn't end or start a turn.


### Examples

#### Modifying output

Let's say we have a game with a broken robot and as a visual effect we want to
add random characters to the output when it talks. This is a good use case for
output filters because string manipulation can be very slow in Inform.

First, let's create the filter:

```javascript
function garbageFilter( output ) {
    // the probability of adding a garbage character, between 0 and 1 (0.1 = 10%)
    const chanceOfGarbage = 0.1;
    const garbageCharacters = "#%&+=*^|{}§";
    let result = "";

    // go through the output one character at a time, each time checking if a
    // garbage character should be added as well
    for( let i = 0; i < output.length; ++i ) {
        if( Math.random() <= chanceOfGarbage ) {
            result += garbageCharacters.charAt( Math.round( Math.random() * garbageCharacters.length ) );
        }

        result += output.charAt( i );
    }

    return result;
}
```

In Inform we can then create phrases to register the filter when the robot
starts talking and remove it when it stops.

```inform7
To say robot starts talking:
    execute JavaScript command "vorple.output.addOutputFilter(garbageFilter)".

To say robot stops talking:
    execute JavaScript command "vorple.output.removeOutputFilter(garbageFilter)".

The factory is a room. The robot is a device in the factory.

After switching on the robot:
    say "The robot says: '[robot starts talking]Booting up... System integrity
        at 42 percent. Ready to receive instructions.[robot stops talking]'".
```

The output will be something like *The robot says: "Booti^ng up... S=ystem=
integri§ty at 42 p=ercent. Ready t#o rec§eive instru+ct^ions."*


#### Collecting full turn output

As discussed earlier, the turn output could and will be printed in pieces and
each piece triggers the output filters separately. If we need the full text
of each turn, there are a couple of options available.

In most cases we can just use an event listener at the end of a turn and check
what's on the screen:

```javascript
function textListener() {
    let turnContent = $( ".turn.current" ).text();

    // turnContent is now the full text of the turn
}

vorple.addEventListener( [ "expectCommand", "expectKeypress" ], textListener );
```

Sometimes this isn't good enough, if output is printed in other elements or the
text is manipulated during the turn and we want the raw, original output. In
that case we can combine the pieces together during the turn and at the end
we'll have the entire output as a whole.

```javascript
// the variable that holds the content
let turnContent = "";

// at the start of a turn, empty the variable
function emptierListener() {
    turnContent = "";
}

vorple.addEventListener( [ "submitCommand", "submitKeypress" ], emptierListener );

// during the turn, keep adding output to the variable
function collectorFilter( output ) {
    turnContent += output;
}

vorple.output.addOutputFilter( collectorFilter );

// at the end of the turn we have our full output
function turnContentListener() {
    // turnContent now contains the turn output
}

vorple.addEventListener( [ "expectCommand", "expectKeypress" ], turnContentListener );
```


## Best practices

Filters are mainly meant for things that would not be possible to do with Inform
itself or when Inform is clearly unsuitable for the task.

Especially with input filtering in most cases you really want the game to parse
the player's command first before handling it any further. The input filter
receives the input exactly as the player typed it without any cleanup that
Inform would do automatically like removing extra spaces before, after or in
between words, ignoring casing, handling multiple commands in one input
("go east then attack troll") and so on.

Therefore if you find that it's possible to do the same thing with or without
filters, it's generally advisable to do it purely in Inform unless there's a 
clear and compelling reason to use filters.
