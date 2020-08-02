---
id: js-eval
title: Executing JavaScript code
---

Vorple can execute JavaScript code from Inform with the 
`VorpleExecuteJavaScriptCommand()` function (I6) or `execute JavaScript command`
phrase (I7). The code is evaluated in strict mode and inside a function, so 
variables declared with `var` (or `let`, `const`, `function`) are created as 
local variables that are discarded after evaluation ends.

Each `execute JavaScript command` call is in a different scope, so the following
won't work (I6 and I7 code, respectively):

```
VorpleExecuteJavaScriptCommand("var localVar = 7");
VorpleExecuteJavaScriptCommand("return localVar");   ! error: localVar is not defined
```

```inform7
execute JavaScript command "var localVar = 7";
execute JavaScript command "return localVar";   [error: localVar is not defined]
```

Any strings that can potentially contain quotes or line breaks must be escaped 
with the `VorpleEscape()` function (I6) or the `escaped` say phrase (I7). 
See the main Vorple extension's documentation for details. 


## Vorple JavaScript API

Vorple exposes a JavaScript API that controls the interpreter and has some 
helper methods for the official Inform extensions. [The API is here](/api). 
The methods are in a `vorple` namespace, so for example a method called 
`audio.clearPlaylist()` can be run with `vorple.audio.clearPlaylist()` (except 
methods that already start with `vorple` like `vorple.init()`). 


## Debugging

The methods `vorple.debug.on()` and `vorple.debug.off()` toggle debugging mode
on and off. When in debug mode, all JavaScript commands coming from the Inform
story and their return values are printed on screen and in the browser console.


## Namespacing

For storing data between JavaScript calls it's advisable to create a global
object to act as a namespace for the variables instead of using individual 
global variables. The global object can be created in a separate JavaScript file
(recommended) or within the interface setup as follows:

In Inform 6:

```
Object createNamespace "" VorpleInterfaceSetup
    with description [;
        VorpleExecuteJavaScriptCommand("window.myNamespace = { jumpCount: 0 }");
    ];
    
[ MyJump ;
    JumpSub();
    if (isVorpleSupported()) {
        VorpleExecuteJavaScriptCommand("myNamespace.jumpCount++; return myNamespace.jumpCount");
        print "You have jumped ";
        print VorpleWhatNumberWasReturned();
        print " times!";
    }
    rtrue;
];
```

In Inform 7, in the Vorple interface setup rulebook:

```inform7
Vorple interface setup rule:
	execute JavaScript command "window.myNamespace = { jumpCount: 0 }".
	
After jumping:
	execute JavaScript command "myNamespace.jumpCount++; return myNamespace.jumpCount";
	say "You have jumped [the number returned by the JavaScript command] times!"
```


## Return values

When a JavaScript command explicitly returns a value (e.g. `var a = 3; return a;`)
the return value can be read in Inform with `VorpleWhatWasReturned()` (I6) or
`the value returned by the JavaScript command` (I7).
The raw return value comes back to Inform as text, as one of the following: 

JS type   | Inform type | Example 
----------|-------------|--------
string    | text        | "Vorple" 
number    | number      | 42 
boolean   | truth state | true
array     | list        | [1,2,3] 
object    | object      | {"a": "b", "c": 2}
(empty)   | nothing     | |
undefined | nothing     | undefined
null      | null        | null
NaN       | NaN         | NaN
Infinity  | infinity    | Infinity
-Infinity | infinity    | -Infinity
function  | function    | function() { return true; }

If the return value is something else or malformed (e.g. a string without the 
leading quote) the type is "unknown".

The type of the return value can be retrieved in Inform with `VorpleWhatTypeWasReturned()`
(I6) or `type of the value returned by the JavaScript command` (I7). It will be 
text that contains one of the "Inform types" in the above table. 

Typically `VorpleWhatTextWasReturned()`, `VorpleWhatNumberWasReturned()` and
`VorpleWhatBooleanWasReturned()` (I6) 
/ `text returned by the JavaScript command` and 
`number returned by the JavaScript command` (I7) would be used to get the value 
as the correct type instead of the raw return value:

```
VorpleExecuteJavaScriptCommand("return prompt('Who are you?')");
name = VorpleWhatTextWasReturned();
VorpleExecuteJavaScriptCommand("return parseInt( prompt('How old are you?'), 10)");
age = VorpleWhatNumberWasReturned();
```

```inform7
execute JavaScript command "return prompt('Who are you?')";
let name be the text returned by the JavaScript command;
execute JavaScript command "return parseInt( prompt('How old are you?'), 10 )";
let age be the number returned by the JavaScript command;
```

Additionally in Inform 7 if the value is a boolean, it can be tested with
`if the JavaScript command returned true: ...` (or `returned false`).

Note! The `... returned by the JavaScript command` phrases evaluate to the last 
valid return value. That means that if a command doesn't return anything, or 
returns undefined, the previous valid return value is what you'll get.
This can lead to hard to detect bugs.


```inform7
execute JavaScript command "return 'foo'";
execute JavaScript command "var obj = {test: 'bar'}; return obj.text";  [typo!]
say the text returned by the JavaScript command;  [prints "foo"!]
```

Above Inform would print "foo" because `return obj.text` returns undefined which
is discarded and the previous `return 'foo'` is the last valid return value.


### Numbers

The Inform function that parses the value throws an error if the number is 
beyond Glulx range, greater than 2147483647 or less than -2147483647 (the real 
lower bound is –2147483648 but the parsing method needs the one extra number 
during the process.) If the number is expected to be outside these bounds and 
it's used only for printing, it's better to return the value as a string instead. 

The accurate integer range in JavaScript is between 
[-9007199254740991](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) 
and [9007199254740991](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). 
Outside that range the result may lose accuracy.

Real numbers are not supported. If the return value is not a whole number, 
the Inform function rounds it to the nearest integer (3.2 becomes 3). 
Exact halves are rounded towards zero, i.e. 3.5 becomes 4 but -3.5 becomes -3.

The JavaScript values NaN, Infinity and -Infinity are returned as such. 
The Inform number parsing function shows a runtime error if it finds them.


### Strings

Strings are returned inside double quotes.

Quotes (or any other characters) inside strings are not escaped. The string 
`'a "nice" day'` in JavaScript becomes `"a "nice" day"` in Inform. 
(The outer quotes only signify the data type, and because only one value can be 
returned at a time, escaping the inner quotes is not necessary for the parsing 
to be unambiguous.)


### Booleans

Boolean values `true` and `false` are passed as such. The Inform function 
shows a runtime error if the values are anything else.


### Other values

Other return values aren't officially supported, but an author can write custom 
methods to parse them if they're needed. Otherwise they're useful mainly for 
debugging purposes.

**Objects** and **arrays** are passed through 
[`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). 
The values the object or array holds are converted to standard JSON and don't 
follow the other formatting rules described here (e.g. `['a "nice" day']` 
becomes `["a \"nice\" day"]` whereas the same string by itself would become 
`"a "nice" day"`.)

While it would be possible to write a JSON parser in Inform, it's probably 
always easier to use other data types to pass the same data. `JSON.stringify()` 
may lose information, e.g. `JSON.stringify({ a: function() {}, b: undefined, c: NaN })` 
will return just `"{"c":null}"`.

Objects that have a [`.toJSON()` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
may return any kind of format. Most notably 
[Date objects are converted to strings in ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON),
e.g. "2017-01-01T10:21:13.262Z".

**NaN**, **undefined**, **null**, **Infinity** and **-Infinity** are returned as such.

**Functions** return their [`.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) 
value.

**Sets** are first converted to arrays and then handled as such.


## Managing line breaks in Inform 7

Inform 7 inserts line breaks automatically when text ends in punctuation, which
can interfere with JavaScript code that won't tolerate line breaks. For example: 

```inform7
To say current status:
	say "All is ok."

To print the status to the console:
	execute JavaScript command "console.log('[current status]')".
```

Here Inform (wrongly) assumes that the say phrase (`to say current status`) is
something that will be printed to the screen and inserts a line break after
the punctuation, and the end result is invalid JavaScript:

```js
console.log("All is ok.
")
```

The simple fix here is to use `[escaped current status]` instead which removes
line breaks from the string, but sometimes the code isn't a string and that
can't be used.

Automatic line break insertion might mess up normal output even when the
generated JavaScript is valid, as Inform keeps track of line and paragraph
breaks and might suppress them from the output if it thinks that they've 
already been printed. 

This is an issue especially when the print focus is moved from the normal output 
to another HTML element. It can usually be fixed with the usual methods like
moving punctuation out from the text substitution (e.g. `say "All is ok"` and
`"console.log('[current status].')"`) or strategical placements of 
`[run paragraph on]`.

As the last resort, the main Vorple extension defines phrases 
`save the internal state of line breaks` and 
`restore the internal state of line breaks`. With these phrases the variables
that Inform uses internally to track whether line breaks should be printed
are first saved and then restored to that state, effectively ignoring whatever 
happens in between. 

```plaintext
save the internal state of line breaks;
[run JS code that potentially messes up normal output]
restore the internal state of line breaks;
```

The Status Line extension uses this technique to make sure that output to the
status line doesn't affect line breaks in the main output.

There are some serious caveats associated with these phrases:

* They're using undocumented low-level Inform 6 code that may have 
**unknown side effects**.
* They **can't be nested**, that is, you can't call the "save the internal state"
phrase twice and then "restore the internal state" twice. You must be sure that
the code doesn't accidentally nest the phrases (and because it's using Inform's 
own machinery, you can never be sure when Inform uses them itself.)
* If "save the internal state" is called, then "restore the internal state"
**must be called** too and as soon as possible. Otherwise Inform's own 
bookkeeping of line breaks gets messed up.
* The phrases are **completely unsupported** – if they don't work as expected, 
you're on your own and bug reports about them are likely to be rejected
(unless they contain concrete fixes.)

Needless to say this should be used only when nothing else helps and even then
at your own peril. 