# Inform 6 Interactive Fiction with Vorple

{% include doc/intro.markdown %}

## Installation and usage

### Getting started

First of all, you need both the [Inform 6 compiler](https://github.com/DavidKinder/Inform6/)
and the [Inform 6 libraries](https://github.com/DavidGriffith/inform6lib). We're
assuming you know the basics, but if not, you can look at the
[Inform Beginner's Guide](http://inform-fiction.org/manual/download_ibg.html) to get you started.

Note that Vorple is also available for [Inform 7](http://inform7.com).

Vorple is structured around a core extension, contained in the "vorple.h" file.
The other extensions provide the following capabilities:

* Vorple Hyperlinks: Clickable web links and commands
* Vorple Multimedia: Images, sounds and videos
* Vorple Notifications: Notifications as text banners
* Vorple Screen Effects: Text and font effects. Roughly the equivalent of
  the built-in Basic Screen Effects extension.
* Vorple Tooltips: Pop-up tooltips, timed or on mouse hover

### Using Vorple

After downloading the extensions, you can start using them! The rule is simple:
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

After compiling it, you should have a .z5 (or .z8) file -- remember that
Vorple doesn't work with Glulx for now. If you run it in a standard
interpreter, it likely won't support Vorple -- but it won't crash, and your
game will still be playable. However, we have a web interpreter
that will run the Vorple effects correctly!

In the [download package](/download/#inform6) there is a file called "play.html".
If you edit the file you should see a line that looks like like
 
    parchment.options.default_story = [ "test.z5" ];

Just replace "test.z5" by the name of your story file, and you're good to go!
To publish your work, upload the "play.html" file and the "interpreter"
directory along with its contents to a web server.


### Technical note about I6 stubs

Vorple makes use of a few I6 entry points that are defined as stubs in the
I6 librairies (usually at the end of your language grammar definition file).
Those stubs are ParserError (called every time the parser didn't understand
the sentence) and LookRoutine (called after each >look command including the
initial one).

You might have defined (un-stubbed) those routines in your code, before
including "grammar"; if that is the case, the I6 compiler will return an
error. However Vorple creates 2 stubs with the names "MyParserError" and
"MyLookRoutine", that are called in those routines. Hence, you simply need
to rename your "ParserError" routine in "MyParserError" (and same for
LookRoutine), and move the definition of those routines to *before including
a vorple file for the second time*. And everything should be fine! (See the
"How to II" example for sample code.)

Additionally, Vorple defines the stub "VorpleStartup", that allows you to
do things while Vorple is initialising (i.e. during VorpleInitialise). This
is useful mostly for one thing, which is queueing commands so that they are
parsed and executed before the game even starts.


## Compatibility with non-Vorple interpreters

The Glulx story files that use Vorple are compatible with offline interpreters
and non-Vorple web interpreters. In most cases the Vorple-specific features
just do nothing.

The story file can test whether it's being run on the Vorple interpreter or not
using a call to the Vorple function `isVorpleSupported()`. Like this:

	if (isVorpleSupported() == 0)
		print "Welcome to a boring old interpreter!"
	else
		VorpleNotification("Welcome to Vorple!");

It's a good idea to make sure that a text-only version of the story works
as intended, for accessibility and archiving reasons.


