---
id: i6-authoring
title: Authoring with Vorple in Inform 6
---

The rule is simple: you need to include Vorple twice: once before including the parser, and once after including the verblib. (Those are usually defined together anyway.) Don't worry, Vorple will handle everything correctly; it's just that some things need to be defined before including the parser and others after including it. So your code would look like:

    Include "vorple.h";
    Include "parser.h";
    Include "verblib.h";
    Include "vorple.h";
    ! and then write your game

If you are using another extension relying on Vorple (say, vorple-notifications.h), you need to include the extension after including the parser, but don't forget to include Vorple! So your code will be:

    Include "vorple.h";
    Include "parser.h";
    Include "verblib.h";
    Include "vorple-notifications.h";

In either case, the other thing you need to do is initialise Vorple, which you do in your Initialise routine:

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


## Technical note about I6 stubs

Vorple defines the stub "VorpleStartup", that allows you to do things while Vorple is initialising (i.e. during VorpleInitialise). This is useful mostly for one thing, which is queueing commands so that they are parsed and executed before the game even starts. Note that you can also use the VorpleInterfaceSetup rulebook (see [the section on user interface](ui-state.md)) to add code to be executed at startup.

Vorple also defines the "MyVorplePrompt" stub, if you want to define your own prompt rather than the standard one. An alternative is to modify `L__M(##Prompt)` directly in the grammar file; but do not use LibraryMessages to change the prompt, as it will not be taken into account.

Finally, Vorple replaces `Banner` and `L__M` in order to add a little bit of code and some important Vorple functionalities. If this creates a conflict with your code (for instance because you replaced them too), define the constant `VORPLE_NO_REPLACES`; you then have to add the Vorple behavior to your routines manually.