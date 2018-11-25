---
id: i6-authoring
title: Authoring with Vorple in Inform 6
---

After [downloading the extensions](/download.html), you can start using them! The rule is simple:
you need to include Vorple twice: once before including the parser, and once
after including the verblib. (Those are usually defined together anyway.) Don't
worry, Vorple will handle everything correctly; it's just that some things need
to be defined before including the parser and others after including it. So your
code would look like:

    Include "vorple.h";
    Include "parser.h";
    Include "verblib.h";
    Include "vorple.h";
    ! and then write your game

If you are using another extension relying on Vorple (say, vorple-notifications.h),
you need to include the extension after including the parser, but don't forget
to include Vorple! So your code will be:

    Include "vorple.h";
    Include "parser.h";
    Include "verblib.h";
    Include "vorple-notifications.h";

In either case, the other thing you need to do is initialise Vorple, which you do
in your Initialise routine:

    [ Initialise ;
        location = room;
        VorpleInitialise();	! this initialises Vorple
    ];


Time to do a quick example: type the following source code:

    Constant Story "My story";
    Include "vorple.h";
    Include "parser.h";
    Include "verblib.h";
    Include "vorple-notifications.h";
    Include "grammar.h";
    
    [ Initialise ;
        location = room;
        VorpleInitialise();
        VorpleNotification("Welcome to Vorple!");
    ];
    
    Object room "The Room"
        with description "You're in a nondescript room.",
    has light;

After compiling it, you should have a .ulx file. If you run it in a standard
interpreter, it likely won't support Vorple — but it won't crash, and your
game will still be playable. However, we have a web interpreter
that will run the Vorple effects correctly!

In the [download package](download.md) there is a file called "play.html".
If you edit the file you should see a line that looks like like
 
```js
// URL to the game file
story: "test.ulx"
```

Just replace "test.ulx" with the name of your story file. You then need to
[install a local server](localhost.md) on your computer to be able
to test your game. After this is done, open a web browser and
type `http://localhost/play.html` (Windows with nginx) or 
`http://localhost:8000/play.html` (Mac/Linux with Python) to the address bar.


## Technical note about I6 stubs

Vorple defines the stub "VorpleStartup", that allows you to
do things while Vorple is initialising (i.e. during VorpleInitialise). This
is useful mostly for one thing, which is queueing commands so that they are
parsed and executed before the game even starts. Note that you can also
use the VorpleInterfaceSetup rulebook (see [the section on user interface](ui-state.md))
to add code to be executed at startup.

Vorple also defines the "MyVorplePrompt" stub, if you want to define your
own prompt rather than the standard one. An alternative is to modify
`L__M(##Prompt)` directly in the grammar file; but do not use LibraryMessages
to change the prompt, as it will not be taken into account.

Finally, Vorple replaces `Banner` and `L__M` in order to add a little bit of
code and some important Vorple functionalities. If this creates a conflict with
your code (for instance because you replaced them too), define the constant
`VORPLE_NO_REPLACES`; you then have to add the Vorple behavior to your routines
manually.