# Undum Hypertext Fiction with Vorple

## Introduction to Vorple

_Vorple_ is a user interface library for interactive literature.
Its goal is to let online hypertext fiction and parser interactive fiction systems
break out of their sandboxes and let story authors use the full scale of the vast
possibilities of technologies that are commonly used in the World Wide Web.

An author might use Vorple only to theme their story with one of the
provided custom themes, or make a multimedia spectacle with pictures, video,
sound effects and interactive elements, or anything in between.

A web developer might ask if we really need Yet Another JavaScript Library.
There are many general-purpose libraries, like
[jQuery](http://jquery.com) which Vorple uses extensively,
but there are none made specifically for this purpose.
Libraries for "normal" web sites work usually by modifying the page elements
directly, which is the best choice when you are building on top of an existing
structure, but interactive fiction is different in that the content is
continuously being pushed from an engine that runs the story.

The project's headquarters are at
[vorple-if.com](http://vorple-if.com) where you'll find all
the official material and downloads. JavaScript developers who want to dig
into the innards of the system can find the source code at
[GitHub](http://github.com/juhana/vorple).

The library and all official material are open source and free for anyone
to use for any purpose. (Mandatory footnote: Do still read all the licenses
if you want to use it commercially or as a part of a closed system.
Some third party themes, for example, are subject to slightly more restrictive licenses.)


## Introduction to Undum

_[Undum](http://undum.com)_ is a JavaScript framework
for creating works of hypertext and CYOA games.
It is completely browser-based and provides beautiful visual
design and smooth interaction out of the box.
Undum is created and maintained by I D Millington.

Undum is programmed purely in JavaScript, the native language of all modern web
browsers. The framework is very loose, providing only the basic functionality,
which makes it easy to add more elements if so needed.

Here are some examples of stories authored with Undum:

* The official [Undum tutorial](http://undum.com/games/tutorial.en.html)
by I D Millington
* [The Matter of the Monster](http://eblong.com/zarf/zweb/matter/)
by Andrew Plotkin
* [Cavity of Time](http://diden.net/~maga/undum/idmillington-undum-2cd8eac/games/cavity.en.html)
by "Ed Packer" (adult content)
* [Leaks](http://www.jeremiasbabini.com.ar/leaks/en/)
by Jeremias Babini, Eva Bisceglia and Sebastian Garcia
* [The Play](http://www.deirdrakiai.com/theplay)
by Deirdra Kiai
* [Living Will](http://markcmarino.com/tales/livingwill.html)
by "E R Millhouse"
* [Almost Goodbye](http://almostgoodbye.textories.com/)
by Aaron A. Reed

More Undum stories can be found at
[IFDB](http://ifdb.tads.org/search?searchfor=system%3Aundum).

As mentioned before, it's relatively easy to modify Undum's functionality and
_The Matter of the Monster_, _Leaks_ and _Almost Goodbye_
all use this possibility to add more features to the stories.
The official Undum tutorial uses only the basic features,
as do _Cavity of Time_, _The Play_ and _Living Will_.

As a contrast to "vanilla" Undum stories, _Starborn_ is a story that
uses Vorple to add multimedia features and e.g. an interactive map.
_Autumn's Daughter_ uses Vorple, not for extra features but to facilitate
the generation of HTML with Vorple's helper functions.

* [Starborn](http://transcripts.game-testing.org/undum/starborn/)
by Juhana Leinonen
* [Autumn's Daughter](http://www.devolution-games.com/games/ifcomp2013/)
by Devolution Games


## How to read this manual

This manual does _not_ teach how to
write hypertext fiction with Undum. At the moment the tutorial game
at [undum.com](http://undum.com) is the best way to learn the
basics. From now on we'll assume that the reader knows at least how to create
situations and actions and the difference between `Situation`
and `SimpleSituation`.

Here's how the rest of this manual is structured:

* [Getting started](#getting-started) instructs on how to install and set up
the system.
* [Developing with Vorple](#developing-with-vorple) tells how to actually use
the system and discusses some of the caveats.
* [Modules](#modules) is a reference for the included features.
* [Complete examples](#examples) introduces Vorple stories
that can be studied to see how different features are used in actual scenarios.

The manual does not try to be a comprehensive reference.
When looking for information about a certain feature,
these are the primary learning resources:

* The [API](#api) for reference
* This manual (under [Modules](#modules)) for usage
* The [examples](#examples) for seeing how it all fits in a larger picture.


### Quick start for the impatient

People have different ways of learning new things.
For those who learn best by getting their hands dirty from the start
and not by reading a book from cover to cover,
here's how to pick the important parts:

* Get the system installed and running using instructions in either
[Starting a new project](#new-project) or
[Migrating an existing project](#migrating), depending
on whether you're starting from a clean slate or from an existing Undum project.
* Skim through the subchapters in
[Developing with Vorple](#developing-with-vorple).
You can probably grasp the syntax from looking at the examples later.
If not, you can always come back and read the
[Using the library functions](#using-library) chapter.
The [API](#api) is at [vorple.if/doc/API](http://vorple-if.com/doc/API/),
remember to keep it at hand. Pay closer attention to the
[Of functions and strings](#functions-and-strings)
chapter so that you don't get bitten by unexpected behavior later.
* Look at the source codes of the example stories:
[One With Everything](#everything) and
[Down the Rabbit-Hole](#rabbithole).
* When you find some element that you want to use, look it up from this manual
(under the [Modules](#modules) chapter) and from the API.


### Different coding practices
{: #coding-practices}

If you have followed the
[official Undum tutorial](http://undum.com/games/tutorial.en.html)
you'll notice that this manual uses slightly different conventions
to structure the code.

The official tutorial builds the situations in a single block:

{% highlight js %}
undum.game.situations = {
    start: new undum.SimpleSituation( "..." ),
    foo: new undum.SimpleSituation( "..." ),
    bar: new undum.SimpleSituation( "..." )
};
{% endhighlight %}

This manual, and the accompanying examples,
create one situation at a time independent of each other.

{% highlight js %}
undum.game.situations.start = new undum.SimpleSituation( "..." );
undum.game.situations.foo = new undum.SimpleSituation( "..." );
undum.game.situations.bar = new undum.SimpleSituation( "..." );
{% endhighlight %}

There's a small caveat associated with the latter method:
Undum allows hyphens in situation names.
If a situation's name contains a hyphen,
it must be created using again a slightly different syntax:

{% highlight js %}
undum.game.situations[ "end-scene" ] = new undum.SimpleSituation( "..." );
{% endhighlight %}

Both approaches are functionally equal. The reason why this manual takes
a different approach is mainly because by creating the situations independently
there's no need to include a complete story for each code snippet,
and secondarily because it reduces the amount of required punctuation and
therefore reduces the possibility of mistakes.

Another difference is that long lines of text are split to multiple lines
by concatenating smaller strings instead of using backslashes at the end of
lines. That is, the Undum tutorial does this:

{% highlight js %}
"<p>Now we're almost at the end of the road. But so\
far you have moved through this tutorial linearly - from one\
situation to the next, without any choice. Undum is designed to\
support narratives that branch and merge.</p>"
{% endhighlight %}

...but we do this instead:

{% highlight js %}
"<p>Now we're almost at the end of the road. But so "
+ "far you have moved through this tutorial linearly - from one "
+ "situation to the next, without any choice. Undum is designed to "
+ "support narratives that branch and merge.</p>"
{% endhighlight %}

Again there's no practical difference, but since Vorple functions must
be concatenated with `+` characters it's simpler to use
the same method with normal text as well.



## Getting started
{: id="getting-started"}

### Starting a new project
{: #new-project}

The [download page at vorple-if.com](http://vorple-if.com/download)
has ready made packages for different themes. Choose a theme that pleases your
eye the most, download the package and unpack.

Each theme package has at least these files and directories:

<ul class="filestructure">
<li class="directory">css</li>
<li class="directory">lib</li>
<li class="directory">media
<ul class="filestructure">
<li class="directory">audio</li>
<li class="directory">image</li>
<li class="directory">music</li>
<li class="directory">video</li>
</ul>
</li>
<li class="code">vorple.game.en.js</li>
<li class="html">index.html</li>
</ul>

The media folder and its subfolders are meant for story-specific
multimedia files.

You can verify that everything works ok by opening
the `index.html` file with your browser.
You should see an extremely minimal but functioning Undum story.

Go through the `index.html` file and replace the placeholder
texts like story title and description.
(You can also do this at any point later.)

`vorple.game.en.js` is an empty story file.
If you want to call it something else, rename it
to whatever you wish and change the filename in `index.html`
so that it gets loaded properly.

Finally, open `vorple.game.en.js` and go through
it, there are more instructions there on how to complete the story's basic setup.

<div class="note">
As with vanilla Undum, if you don't have a local webserver installed on
your computer it's best to use Firefox when developing the stories.
Other browsers might disable features as a security measure when local
web pages contain JavaScript.
</div>


### Migrating an existing project
{: #migrating}

If you already have an existing Undum project
where you want to use Vorple, download any theme package from the
[download page](http://vorple-if.com/download).
You only need the library files so if you don't want to change your existing
theme it doesn't matter which package you download.
Unpack it and copy the library directory `lib/` to
the same directory where the story's HTML file is.

If you want to change the layout as well, skip the rest of this chapter
and read [Migrating to a new theme](#new-theme) for further instructions.

Modify your existing main HTML file
(usually _storyname_.en.html) and add Vorple's libraries
and resources after the line that loads Undum.
In the standard Undum template the line is almost at the end of the file.

{% highlight html %}
<!-- Find this line... -->
<script type="text/javascript" src="media/js/undum.js"></script>

<!-- ...and add these lines below it: -->
<script type="text/javascript" src="lib/jquery.qtip.min.js"></script>
<script type="text/javascript" src="lib/soundmanager.min.js"></script>
<script type="text/javascript" src="lib/vorple.min.js"></script>

<!-- Make sure those lines come before the line that loads your story file,
        for example: -->
<script type="text/javascript"
        src="media/games/tutorial/tutorial.game.en.js"></script>
{% endhighlight %} 

If you plan for the story to feature sounds or music, see chapter
[Mute controls](#mute-controls) for instructions on how
to add the controls to the layout.

Vorple is designed to be fully compatible with stories created for standard
Undum. If you have a story that works with vanilla Undum but not with Vorple,
please file a bug report.


#### Migrating to a new theme
{: #new-theme}

If you want to start using one of the Vorple-provided themes,
download the theme package, unpack it and copy your
_storyname_.game.en.js story file to its main directory.
The theme's `index.html` file becomes the new main HTML file.

You'll need to manually edit `index.html` to match the contents of your
old HTML file (titles, descriptions, other custom content you've added).
At the same time when you go through `index.html`, check
if the theme requires other attention as well. Special instructions will be
given as comments where necessary.

Before you can start using Vorple's features, you have to make the following
changes to the story file:

* Add
[`vorple.core.init( system );`](#initializing)
to the `undum.game.init()` function.</li>
* If you're using `undum.game.afterEnter()` or
`undum.game.afterAction()` global event hooks, you have to make
sure that they run
`vorple.undum.afterEnterTrigger( character, system, from, to );`
and
`vorple.undum.afterActionTrigger( character, system, situation, action );`
respectively by adding them to the beginning of the event hooks.

Without these additions some of Vorple's features might not work
correctly or at all. Refer to the `vorple.game.en.js`
file for an example.


## Developing with Vorple
{: #developing-with-vorple}

### Initializing the library
{: #initializing}

<div class="note floatbox">
Always remember to initialize Vorple. Some features won't work or
work incorrectly if the library isn't initialized.
</div>

Some of Vorple's features are initialized by calling
`vorple.core.init()`[API](/vorple/release/doc/API/core.html#init){: class="api"}.
`undum.game.init()` is a good place to do so. The Undum engine
must be given as the first parameter to the initialization function. The engine
is the `undum.game.init()`'s second parameter, `system`.

{% highlight js %} 
undum.game.init = function( character, system ) {
    // other Undum initialization
    // ...

    vorple.core.init( system );
};
{% endhighlight %} 


### Using the library functions
{: #using-library}

Vorple adds enhancements to Undum's basic functionality
(with the [core module](#core)) and extends its
capabilities (with the [Undum module](#undum-module)).
The setup and usage of these features are covered in the
respective module chapters.

To help write the HTML contents of an Undum story, the
[HTML module](#html) has helper functions
that create HTML tags. For example, here's the
(abbreviated) starting situation from the
[Undum tutorial game](http://undum.com/games/tutorial.en.html):

{% highlight js %} 
start: new undum.SimpleSituation(
    "<h1>Starting Out with Undum</h1>\
    <img src='media/games/tutorial/woodcut1.png' class='float_right'>\
    <p>Welcome to the Undum tutorial. Undum is a tool for writing\
    hypertext interactive fiction. It has some unique features\
    and a visual design that encourages narrative games.</p>\
    \
    <p class='transient'>For now, lets move on with the tutorial.\
    <a href='rooms'>Click this link</a> to move on.</p>"
)
{% endhighlight %} 

Using Vorple's HTML helpers it would be written like this:

{% highlight js %} 
undum.situations.start = new undum.SimpleSituation(
    vorple.html.tag( "h1", "Starting Out with Undum" )
    + vorple.media.image( 'woodcut1.png', { classes: 'float_right' } )
    + vorple.html.p(
        "Welcome to the Undum tutorial. Undum is a tool for writing "
        + "hypertext interactive fiction. It has some unique features "
        + "and a visual design that encourages narrative games."
       ) + vorple.html.p(
        "For now, lets move on with the tutorial. "
        + vorple.html.link( "rooms", "Click this link" )
        + " to move on.", { classes: 'transient' }
       )
)
{% endhighlight %} 

<div class="note floatbox">
See the <a href="#practices">Different coding practices</a> chapter
for an explanation why the long lines are split differently in the
above examples.
</div>

Using the helpers reduces the chance of typos and missing end tags
and they make the code more structured and readable
(although your mileage may vary).

Other functions that don't create story text but do something else like
play sounds or create tooltips are
[called inside functions](#functions).

{% highlight js %} 
undum.situations.maze = new undum.SimpleSituation( function() {
    vorple.media.playMusic({ mp3: "background.mp3", oga: "background.ogg" });
    return vorple.html.p( "You are in a maze of twisty passages, all alike." );
});
{% endhighlight %} 

The exact syntax is described in each feature's documentation in this manual
and in the API.


### Reading the API
{: #api}

Vorple's modules and functions are documented in detail in the API.
The API is included in the zip package and a link to the
[online version](http://vorple-if.com/vorple/release/doc/API/)
is in the main menu of the
[Vorple project website](http://vorple-if.com).

Functions mentioned in this manual have a link appended to them that
takes you to the corresponding place in the API:
`vorple.core.init()`[API](/vorple/release/doc/API/core.html#init){: class="api"}

In the API the "namespaces" top menu leads to the documentation of different
Vorple modules. Clicking on a module's name opens a page that details the fields
(variables) and methods (functions) included in the module.

Here's an example documentation of
`vorple.core.generateId()`[API](/vorple/release/doc/API/core.html#generateId){: class="api"}:

![An example from the API](/media/image/doc/APIexample.png)

The first line tells that this function:

* is called `requireRelease()` (and is part of the `core` namespace, therefore
it's full name is `vorple.core.requireRelease()`)
* accepts one parameter called `length`
* returns a string

The paragraph that follows describes the use and behavior of the function.

Next there's a description of accepted parameters.

* The first column is the parameter's name.
* The second column shows the accepted type or types of the parameter.
* The text "optional" in the third column means that this parameter can be left out.
* If the parameter defaults to some value if it's left out,  it's shown in the
  fourth column.
* The fifth column gives a brief description of the parameter and its purpose.

After the parameters there's a link to the method's source code.
If reading the manual and the API still leaves you wondering what a
function does or how it's used, you can always look at its source code
and try to figure it out from there.

Finally there's the description and type of the return value (if any).
There might also be links to other parts of the API or to external resources.

Remember that Vorple uses the [jQuery library](http://www.jquery.com)
that has its [own API](http://api.jquery.com/).
Other included libraries have their own documentation,
but the API has links to them when necessary.


### Of functions and strings
{: #functions-and-strings}

We need to go through some JavaScript theory for this one.
Let's say we want to make a situation where we show "Hello world!" to the reader.
There are three ways to do it:

{% highlight js %} 
// SimpleSituation with a string argument
new undum.SimpleSituation( "<p>Hello world!</p>" );

// SimpleSituation with a function argument
new undum.SimpleSituation( function() {
    return "<p>Hello world!</p>";
});

// Situation
new undum.Situation({
    enter: function( character, system, from ) {
        system.write( "<p>Hello world!</p>" );
    }
});
{% endhighlight %} 

The end result is always the same, words "Hello world!" displayed on the screen.
The difference is that the first method uses a string argument which is
evaluated on initialization and the two others use functions whose contents
are evaluated when they are called.

What does this fancy tech jargon mean and why is it important?
Let's look at a practical example where we want to play a sound effect
when the reader enters a situation:

{% highlight html %}
// This won't work:
new undum.SimpleSituation(
    "<p>You hear a loud bang.</p>"
    + vorple.media.playSound({ mp3: "gunshot.mp3" })
);

// Do this instead:
new undum.SimpleSituation( function() {
    vorple.media.playSound({ mp3: "gunshot.mp3" });
    return "<p>You hear a loud bang.</p>";
});
{% endhighlight %} 

What happens with the first (incorrect) method is that the string contents
are evaluated when the story loads and therefore you hear the sound effect
right away, not when the reader enters the situation. In the latter version
the sound playing function call is inside a function that's called only
when the situation is entered so the sound plays at the correct time.

Vorple's functions can be divided into two categories: _active_
functions that do something the moment they're called, and
_passive_ functions that return a string of HTML code.

The following modules or functions are always passive and therefore safe
to use in `undum.SimpleSituation` as a string argument:

* everything in the `html` module
* `vorple.media.image()`
* `vorple.media.youtube()`

For everything else it's safer to use them in functions only.



## Modules
{: #modules}

### Cookie
{: #module-cookie}

Cookies are small snippets of text web pages can save to the user's computer.
Cookies can be used to identify a returning user or save data across sessions.

Cookies can be set using the
`vorple.cookie.write()`[API](/vorple/release/doc/API/cookie.html#write){: class="api"}
method and read with
`vorple.cookie.read()`[API](/vorple/release/doc/API/cookie.html#read){: class="api"}.
Cookies can be deleted using
`vorple.cookie.remove()`[API](/vorple/release/doc/API/cookie.html#remove){: class="api"}.
A cookie has text content and a name that's used to identify the cookie.

{% highlight js %} 
vorple.cookie.write( 'greeting', 'Hello!' );  // sets a cookie called "greeting"
vorple.cookie.read( 'greeting' );             // returns "Hello!"
vorple.cookie.remove( 'greeting' );           // removes the cookie
{% endhighlight %} 

The cookie's contents can be updated by overwriting it with
`vorple.cookie.write()`.

By default cookies are set to expire in one year. The expiration period
can be set using an `expires` option while writing the cookie,
as a number of days the cookie is valid or as a JavaScript `Date`
object:

{% highlight js %} 
vorple.cookie.write( 'greeting', 'Hello!', { expires: 7 } );
{% endhighlight %} 

<div class="note floatbox">
There's no guarantee that the user's browser keeps the cookies for the
full duration of the expiration period, or that the browser accepts them at all.
You shouldn't rely on cookies alone for important features.
</div>

The [specification](http://www.ietf.org/rfc/rfc2109.txt)
says that a browser should accept at least 20 cookies per web site, each
with maximum content length of 4096 bytes (characters).
Most browsers allow much more than this, but it's safest to stay within
these boundaries. Some browsers also limit the _total_
length of all cookies per web site to 4096 bytes or some other value.

<div class="resources">Resources</div>

* Wikipedia: [HTTP cookie](http://en.wikipedia.org/wiki/HTTP_cookie)



### Core
{: #core}
The core module has mainly helper functions for other modules and
general settings and features.

#### Settings
{: #settings}

`vorple.core.settings` contains two variables:
`vorple.core.settings.confirmWindowClose` (default `false`)
and `vorple.core.settings.debug` (default `false`).

`vorple.core.settings.confirmWindowClose` defines whether or not
the browser should alert the reader that they're leaving the page when they
close the browser window or try to navigate to another page.
The purpose is to prevent the reader from accidentally leaving the page and
inadvertently erasing their progress at the same time.

<div class="note floatbox">
Firefox versions 4 and up disregard the custom message and always show the
browser's default message in the confirmation dialog.
</div>

If the variable is set to `true` a default message will be used:
_"You are about to leave the story. Any unsaved progress will be lost.
Are you sure you want to continue?"_
If the variable is a string, it will be used as the message:
`vorple.core.settings.confirmWindowClose = "Are you sure you want to
leave the game?"`

The variable `vorple.core.settings.debug` can be set to `true`
while developing the story. The flag can be used to add code used for debugging
so that they don't accidentally appear in the released version of the story:
`if( vorple.core.settings.debug ) { ... }`

Setting the debug flag disables
`confirmWindowClose` so that you don't have to dismiss the confirmation
dialog every time you reload the page.

The setting variables can be set at the beginning of the story file
so that they're immediately active.


#### Version numbers
{: #version-numbers}

`vorple.core.getVersion()` retrieves the Vorple library's version number,
e.g. "2.5".

A plugin or another library can require a certain version of the Vorple library
by calling
`vorple.core.requireVersion()`[API](/vorple/release/doc/API/core.html#requireVersion){: class="api"}.
An error is thrown if the library is not recent enough.

If the page layout contains an element with class `vorple-version`, the contents
of the element are replaced by the Vorple's version number in the
`version.release` format. The default Vorple themes have this in the page footer:

{% highlight html %} 
Powered by <a href="http://undum.com">Undum</a>
and    <a href="http://vorple-if.com">Vorple
<span class="vorple-version"></span></a>.
{% endhighlight %} 

In the page itself it will look like this:

{% highlight html %}
Powered by Undum and Vorple 2.5.
{% endhighlight %}


#### Initialization event

`vorple.core.init()`[API](/vorple/release/doc/API/core.html#init){: class="api"}
triggers an `init.vorple` event that can be used to add custom initialization methods:

{% highlight js %} 
$( document ).on( 'init.vorple', function() {
    // custom initialization here
});
{% endhighlight %} 

This is mostly useful for plugins. Individual stories can just add any
initialization they need to `undum.game.init()` which runs
at the time Undum has been initialized.

`vorple.core.init()` must be called in the Undum's initialization method,
even if there are no custom initialization methods attached to it:

{% highlight js %}
undum.game.init = function( character, system ) {
    // other Undum initialization
    // ...

    vorple.core.init( system );
};
{% endhighlight %}


### HTML
{: #html}

In all HTML module functions that create HTML tags you can add tag
attributes as the last parameter. The attributes are given as an object
that has the attributes' names as keys and contents as values:

{% highlight js %} 
vorple.html.p(
    "Test",
    {
        id: "foo",
        classes: "bar",
        title: "baz"
    }
);
// --> <p id="foo" class="bar" title="baz">Test</p>
{% endhighlight %}

Note how the `class` attribute must be named `classes`
because "class" is a reserved word in JavaScript.


#### Paragraphs
{: #html-p}

`vorple.html.p()`[API](/vorple/release/doc/API/html.html#p){: class="api"}
wraps given contents inside `<p>` tags.
The following are equal:

{% highlight js %} 
// the "pure" Undum method
new undum.SimpleSituation( "<p>Hello World!</p>" );

// with the HTML helper
new undum.SimpleSituation( vorple.html.p( "Hello World!" ) );

// with a custom class
vorple.html.p( "Hello World!", { classes: "transient" } );
// --> <p class="transient">Hello World!);
{% endhighlight %} 


#### Links
{: #html-link}

Links can be added with
`vorple.html.link()`[API](/vorple/release/doc/API/html.html#link){: class="api"}.
The first parameter is the link target, the second parameter the contents,
and the third the `<a>` tag options.


{% highlight js %} 
vorple.html.link( "./book", "Open the book", { classes: 'unique' } );
// --> <a href="./book" class="unique">Open the book</a>
{% endhighlight %} 

The parameters can be given as a single object that has keys for at least
the url and the contents:

{% highlight js %} 
vorple.html.link({
    url: "./book",
    content: "Open the book",
    options: { classes: 'unique' }
});
{% endhighlight %} 


![Choice popup](/media/image/doc/choicepopup.png){: class="floatimg"}

If an array of multiple links is given as the first parameter,
a choice popup is created. A choice popup is a list of choices that
appears when the main link is clicked.

The popup is hidden when any of the choices are selected or if the
reader clicks on outside the popup.

{% highlight js %} 
vorple.html.link([
    {
        url: "http://vorple-if.com",
        content: 'Vorple'
    },
    {
        url: "http://undum.com",
        content: 'Undum'
    }],
    'useful links'
);
{% endhighlight %} 


#### Quotes
{: #html-quotes}
`vorple.html.quote()`[API](/vorple/release/doc/API/html.html#quote){: class="api"}
can be used to wrap contents inside quotes.
The reason you might want to use this helper instead of just writing the
quotes is that this way you can't forget to add the closing quote and
you don't have to escape the quotes as in the example below.

{% highlight js %} 
// vanilla Undum
new undum.SimpleSituation( "<p>\"Hello,\" she said.</p>" );

// HTML helper
new undum.SimpleSituation(
    vorple.html.p( vorple.html.quote( "Hello," ) + " she said." )
);
{% endhighlight %} 

Double quotes (`"`) are used by default but another character or
characters can be given as the second parameter, or an array with two members
where the first member is the opening quote and the second character
the closing quote.
If you assign a character to the `vorple.html.defaults.quotemarks`
variable, it's used as a default from there on.

{% highlight js %} 
vorple.html.quote( "Hello", "'" );                       // --> 'Hello'
vorple.html.quote( "Hello", [ "&laquo;", "&raquo;" ] );  // --> «Hello»
{% endhighlight %} 

([Character entity references](http://en.wikipedia.org/wiki/Character_entity_reference)
were used to create the arrow quotes.)


#### Other tags
{: #html-tag}

You can add any HTML tags using
`vorple.html.tag()`[API](/vorple/release/doc/API/html.html#tag){: class="api"}.
The first parameter is the tag's name, the second is the contents inside the tag
and the third parameter the options and attributes.

{% highlight js %} 
vorple.html.tag(
    "div",
    "Hello World!",
    {
        classes: "transient",
        title: "Greeting"
    }
);
// --> <div class="transient" title="greeting">Hello World!</div>
{% endhighlight %} 

The end tag is added automatically if text content is given, and
the tag is self-closed if the content is not a string.

{% highlight js %} 
vorple.html.tag( "br" );       // --> <br />
vorple.html.tag( "div", "" );  // --> <div></div>
vorple.html.tag(               // --> <hr class="wide" />
    "hr",
    null,
    { classes: "wide" }
);
{% endhighlight %} 

If you want to make sure the end tag is always added,
use `endTag: "always"` option:

{% highlight js %} 
vorple.html.tag(
    "div",
    contents,
    { endTag: "always" }
);
{% endhighlight %} 


Instead of the generic `vorple.html.tag()` use

* [`vorple.html.p()`](#html-p) for `<p>` tags
* [`vorple.html.link()`](#html-link) for `<a>` tags and
* [`vorple.media.image()`](#media-images) for `<img>` tags.


### Media
{: #media}

#### Images
{: #media-images}

`vorple.media.image()`[API](/vorple/release/doc/API/media.html#image){: class="api"}
creates an `<img>` tag. The first parameter is the
picture's file name and the second optional parameter an object with tag attribute options.

{% highlight js %} 
vorple.media.image( 'pic.png', { classes: 'once', title: 'A nice picture' } );
// result: <img src="media/image/pic.png" class="once" title="A nice picture" />
{% endhighlight %} 

Unless an absolute path to the file is given
(`/other/folder/pic.png` or `http://example.com/pic.png`),
a path specified by `vorple.media.defaults.imagePath` is used.
The default is the `media/image/` directory that comes pre-made in
all theme packages. It can be changed by assigning a new path to the variable.


{% highlight js %} 
vorple.media.image( 'pic.png' );    // --> media/image/pic.png

vorple.media.defaults.imagePath = '/resources/pics/';
vorple.media.image( 'pic.png' );    // --> /resources/pics/pic.png
{% endhighlight %} 


#### Preloading images

By default the web browser loads images included in the story only when
they are first encountered. The reader might see the image appear on the page
slightly after the text, or they might see the image slowly loading, depending
on their Internet connection and the size of the image.

This can be countered by preloading the image files.
`vorple.media.preloadImage()`[API](/vorple/release/doc/API/media.html#preloadImage){: class="api"}
makes the browser load the images beforehand so that they can be displayed
immediately when the story actually needs them. Multiple images can be given
to the function as an array at the same time.

{% highlight js %} 
vorple.media.preloadImage([ 'image1.png', 'image2.jpg' ]);
{% endhighlight %} 

`undum.game.init()` is a good place to preload the images.
The default image path is assumed, just like with
`vorple.media.image()`.

The downside is that preloading consumes bandwith unnecessarily if the reader
doesn't actually come to the point in the story where the image is needed.
You might consider preloading images only at some point during the story,
for example one situation before the one that shows the image or at the point
when the reader enters a branch in the story that leads to the situation that
has the image.


#### Sound effects
{: #media-sounds}

<div class="note floatbox">
The sounds are played automatically with sound down if the reader has
<a href="#mute-controls">muted sounds</a>. The same applies to music.
</div>

Audio and local video files are played using the
[SoundManager 2](http://www.schillmania.com/projects/soundmanager2/)
library.

Sound effects can be played by using
`vorple.media.playSound()`[API](/vorple/release/doc/API/media.html#playSound){: class="api"}.
Mp3 files are probably the best supported, but OGG files should work as well.

{% highlight js %} 
vorple.media.playSound( "sound.mp3" );
{% endhighlight %} 

Audio files are loaded from the project's `media/audio` directory
unless other path is given, just like with [images](#media-images).
The default path is stored in `vorple.media.defaults.audioPath`.

`vorple.media.stopSounds()`[API](/vorple/release/doc/API/media.html#stopSounds){: class="api"}
stops all currently playing sounds. If you need to stop or pause
a single sound, you have to manipulate the player object directly.
`vorple.media.playSound()` returns the sound objects id.
If you assign the return value to a variable, you can use
`vorple.media.stopSound()`[API](/vorple/release/doc/API/media.html#stopSound){: class="api"}
to stop the sound, or use any
[SoundManager methods](http://www.schillmania.com/projects/soundmanager2/)
to manipulate the sound.

<div class="note">
iOS devices (iPhone, iPad, iPod) support only _one_ sound playing
simultaneously.
If you specifically target these devices, it's best to use either background
music or sound effects, but not both. Otherwise any sound effect will stop
the background music.
</div>


#### Music

For music these functions can be used:

* `vorple.media.playMusic()`[API](/vorple/release/doc/API/media.html#playMusic){: class="api"}
to start a music track
* `vorple.media.stopMusic()`[API](/vorple/release/doc/API/media.html#stopMusic){: class="api"}
to stop playing music

They work identically to `vorple.media.playSound()` and
`vorple.media.stopSounds()`. There's also
`vorple.media.stopAll()`[API](/vorple/release/doc/API/media.html#stopAll){: class="api"}
that will stop both sound effects and music.

The default directory for music files is `media/music`.
It can be changed by assigning the new directory to
`vorple.media.defaults.musicPath`.

Why not just play background music the same way you'd play sound effects?
There are a couple of key differences:

* You can play only one music track at the same time.
When you start playing a new music track,
you don't have to stop the existing track.
Starting a music track will automatically stop the previous
track from playing.
* You can easily stop or mute only music or only sound effects.
* When loading a saved story, sound effects will not be played again
(remember that Undum replays the whole story from the start when it's
loading from a save). The last played music track will start playing when
the story is loaded unless it was manually stopped.

Another difference is that music is set to loop automatically (the same track
starts again right after it has ended). If looping is not desired it can be
disabled with a `loop: false` option:

{% highlight js %} 
vorple.media.playMusic( "filename.mp3", { loop: false } );
{% endhighlight %} 

Conversely the same option set to `true` can be passed to
`vorple.media.playSound()` to make sound effects looping.


#### Volume, fading out and callbacks

The default volume for sound effects and music is 80, with 100 being the
maximum. It can be changed with the `volume` option.

All functions that stop sounds, including the
`vorple.media.playMusic()` when it stops the previous music,
have an option to fade the sound out gradually instead of stopping it abruptly.

The fade out speed is given as a number between 1 and 100, where higher number
means faster fade out. The volume is decreased every 50 milliseconds
(0.05 seconds) and the number tells
how much the volume is decreased each time until it reaches zero.
With fade out speed 5 it takes 80 / 5 * 50 = 800 milliseconds (0.8 seconds)
for a sound to fade out from the default volume.

Passing a fade out speed of 100 will stop the sound immediately without fading.
`vorple.media.stopSound()` and `vorple.media.stopSounds()`
have 100 as the default. `vorple.media.stopAll()`,
`vorple.media.stopMusic()` and `vorple.media.playMusic()`
have 5.

Functions that stop sounds also have an option to pass a _callback
function_ that's executed when the sound has actually stopped, i.e.
when the fade out has completed.

Here's an example of stopping background music with slow fade out and
showing a notification when the fade out is completed.

{% highlight js %} 
vorple.media.stopMusic(
	3,
	function() {
		vorple.notify.show( 'The music has stopped!' );
	}
);
{% endhighlight %} 


#### YouTube videos

YouTube videos can be embedded with
`vorple.embed.youtube()`[API](/vorple/release/doc/API/media.html#youtube){: class="api"}.
The function takes as the first parameter the id of the video to embed
and as the second parameter the options.

<table class="definitions">
<tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr>
<td>height</td><td>integer</td><td>390</td><td>Height of the video player</td>
</tr><tr>
<td>width</td><td>integer</td><td>640</td><td>Width of the video player</td>
</tr><tr>
<td>parameters</td><td>object</td><td>see below</td><td>YouTube embedding parameters</td>
</tr>
</table>

All available embedding parameters are listed in the
[YouTube API documentation](http://code.google.com/apis/youtube/player_parameters.html).
Default parameters are:

{% highlight js %} 
autoplay: '1',
controls: '0',
disablekb: '1',
modestbranding: '1',
rel: '0'
{% endhighlight %} 

That is, start playing the video immediately, hide controls, disable
keyboard controls, hide YouTube logos and don't show related videos at the end.

When the story is being reloaded from a save position, the video player is
embedded but `parameters.autoplay` is set to 0 so that it won't start
playing automatically.

An example of usage where we show a video in an Undum situation:

{% highlight js %} 
undum.game.situations.livingroom = new undum.SimpleSituation(
    vorple.html.p(
        "You find yourself in a living room where a film has just "
        + "started playing on the DVD player."
    ) + vorple.html.p(
        vorple.embed.youtube(
            'bsGEWHNJ3s8',
            {
                width: '500',
                height: '280',
                parameters: {
                    controls: '1',  // allow the user to control the video
                    loop: '1'       // start again from beginning when playback ends
                }
            }
        )
    )
);
{% endhighlight %} 


#### Mute controls
{: #mute-controls}

<div class="note floatbox">
Themes included with Vorple already have the mute checkboxes in the HTML
files, but by default they are not displayed. Remove the
<code>&lt;!--  --&gt;</code> tags around the checkboxes to enable them.
</div>

If the story uses audio, it's polite to offer the reader a possibility to
mute sounds. If you put the following piece of code into the story's
HTML file, that is, checkboxes with class `mute` and
value `sound`, `music` or `all`,
Vorple will automatically make them function as you'd expect.

{% highlight html %} 
<div>
    <input type="checkbox" id="muteMusic" class="mute" value="music" />
    <label for="muteMusic">Mute music</label>
</div>
<div>
    <input type="checkbox" id="muteSound" class="mute" value="sound" />
    <label for="muteSound">Mute sound effects</label>
</div>
<div>
    <input type="checkbox" id="muteAll" class="mute" value="all" />
    <label for="muteAll">Mute all</label>
</div>
{% endhighlight %} 

If you want to use the opposite scheme where a checked box means that
sounds are _enabled_, you can use the `unmute` class instead.
The functionality is identical but reversed.

{% highlight html %} 
<div>
    <input type="checkbox" id="unmuteMusic" class="unmute" value="music" />
    <label for="unmuteMusic">Music</label>
</div>
<div>
    <input type="checkbox" id="unmuteSound" class="unmute" value="sound" />
    <label for="unmuteSound">Sound effects</label>
</div>
<div>
    <input type="checkbox" id="unmuteAll" class="unmute" value="all" />
    <label for="unmuteAll">All sounds</label>
</div>
{% endhighlight %} 

The mute status is written to a browser cookie every time it changes.
In other words if the reader mutes audio, the preference is automatically
remembered the next time they load the story.

To toggle the mute state manually you can use
`vorple.media.mute()`[API](/vorple/release/doc/API/media.html#mute){: class="api"}
to mute or unmute sounds, music or videos, or
`vorple.media.muteAll()`[API](/vorple/release/doc/API/media.html#muteAll){: class="api"}
to mute or unmute all sounds. `vorple.media.muteAll()` is a shortcut for
`vorple.media.mute({ sound: true, music: true })`.

`vorple.media.mute()` uses an object that describes what elements
to mute or unmute:

{% highlight js %} 
vorple.media.mute( { music: true } );                // mute music
vorple.media.mute( { music: true, sound: false } );  // mute music and unmute sound
{% endhighlight %} 

`vorple.media.muteAll()` is used by giving the mute status as a parameter:

{% highlight js %} 
vorple.media.muteAll( true );    // mute everything
vorple.media.muteAll( false );   // unmute everything
{% endhighlight %} 

<div class="note floatbox">
Local videos respect the mute sound option.
Embedded YouTube videos are always played with the sound on.
</div>

The mute checkboxes are automatically toggled to reflect the current mute
status even when the muting is done manually.

Mute status can be toggled with
`vorple.media.toggleMute()`[API](/vorple/release/doc/API/media.html#mute){: class="api"}.
It will unmute muted media and vice versa. The return value is true if the
new status of the media is muted and false if it's now unmuted.


#### Limitations

Native audio and video support in web browsers is still far from standard.
Some browsers can play only MP3 files, some only OGG files, some both, some
neither.
SoundManager uses primarily a Flash player and tries to use the browser's native
playback capabilities if Flash player isn't available.

YouTube videos always require Flash (with some exceptions;
iOS browsers (iPhone, iPod, iPad) can launch YouTube videos in a separate
player).

Mobile Safari (iPhone, iPad, iPod) supports only one sound channel.
If you start a new sound while another is playing, the other sound will be
stopped. If you target mobile devices, it's best to disable either
background music or sound effects (if you have them), otherwise any sound
effect during the story will make background music stop abruptly.


### Notify

Vorple uses the [noty](http://needim.github.com/noty/)
library to create notifications. They can be used to e.g. inform the reader of
important events or acknowledge their actions.

Notifications are created using
`vorple.notify.show()`[API](/vorple/release/doc/API/notify.html#show){: class="api"}
with the content of the notification as the first parameter.
The notification's behavior can be altered with options given as
the second parameter. All the available options can be found on
[noty's web site](http://needim.github.com/noty/#options).

{% highlight js %} 
vorple.notify.show(
	'Note this!',
	{
		speed: 2000,  // animations take 2 seconds (2000 ms)
		closeOnSelfClick: false  // don't close the notification on click
	}
);
{% endhighlight %} 

The notification's position can be given with the `layout`
option. The available positions are the four corners
of the screen ([`topLeft`](topLeft" class="notifyTest),
[`topRight`](topRight" class="notifyTest),
[`bottomLeft`](bottomLeft" class="notifyTest) and
[`bottomRight`](bottomRight" class="notifyTest)),
as a wide bar on the top or the bottom of the screen
([`top`](top" class="notifyTest) or
[`bottom`](bottom" class="notifyTest)),
in the center on top
([`topCenter`](topCenter" class="notifyTest)),
or in the middle of the screen
([`center`](center" class="notifyTest)).
The default is bottom right.

Multiple notifications in the four corners of the screen are displayed
simultaneously. In every other position the notifications are put into
a common queue and displayed sequentially. The queue can be emptied with
`vorple.notify.clearQueue()`[API](/vorple/release/doc/API/notify.html#clearQueue){: class="api"}.

The oldest notification can be dismissed with
`vorple.notify.close()`[API](/vorple/release/doc/API/notify.html#close){: class="api"}
and all notifications dismissed with
`vorple.notify.closeAll()`[API](/vorple/release/doc/API/notify.html#closeAll){: class="api"},
which will also empty the queue.

In the noty library the default duration of notifications is 5 seconds
(5000 ms), but Vorple's default is that the notifications are
automatically hidden after seven seconds. The average reading speed is about
three words per second so 7 seconds is good for messages of about 20 words.
In addition to the default location (bottom right) this is the only change to
[noty's defaults](http://needim.github.com/noty/#options).

`vorple.notify.defaults` contains the story-specific defaults.

{% highlight js %}
vorple.notify.defaults.textAlign = 'left';
vorple.notify.defaults.timeout = false;

vorple.notify.show( "This notification's text is aligned left "
    + "and it must be clicked to dismiss." );
{% endhighlight %} 


### Tooltip
{: #tooltip }

#### Creating tooltips

Vorple comes bundled with the
[qTip<sup>2</sup>](http://craigsworks.com/projects/qtip2/)
tooltip library.

To add a tooltip to every link in the game, we'll add the
`vorple.tooltip.enable( 'a' )`[API](/vorple/release/doc/API/tooltip.html#enable){: class="api"}
to `undum.game.init()`:

{% highlight js %} 
vorple.tooltip.enable( 'a' );
{% endhighlight %} 

As simple as that! Now every link that has the `title` attribute
will show the contents of the title as a tooltip when the mouse is put over them.

{% highlight html %} 
<a href="foo" title="This is the tooltip's text!">Link</a>
{% endhighlight %} 

Or using the HTML module:

{% highlight js %} 
vorple.html.link(
    'foo',
    'Link',
    { title: "This is the tooltip's content!" }
);
{% endhighlight %} 

The parameter is a jQuery selector. If you need to add tooltips more accurately
or to other elements, refer to the
[jQuery documentation](http://api.jquery.com/category/selectors/).

All qTip<sup>2</sup> options are supported. The documentation is at
[http://craigsworks.com/projects/qtip2/docs/](http://craigsworks.com/projects/qtip2/docs/)
(look under "Options").


#### Manually triggered tooltips

Sometimes we might want to display a tooltip in response to an unrelated event
or as part of the story's plot.
`vorple.tooltip.show()`[API](/vorple/release/doc/API/tooltip.html#show){: class="api"}
creates a tooltip and shows it after a delay, then hides it again
after another delay.

{% highlight js %} 
vorple.tooltip.show(
    '.targetClass',
    'Tooltip content',
    {
        delay: 1000,    // 1 second
        duration: 5000    // 5 seconds
    }
);
{% endhighlight %} 

The first parameter is the element's jQuery selector,
the second the text to be displayed in the tooltip,
and the third is the options, including the
delay before showing the tooltip
and the duration how long the tooltip is displayed in milliseconds.
The defaults for the delay and duration are
3000 milliseconds and 10000 milliseconds respectively.


### Undum
{: #undum-module}

#### Disposable links

Undum's
[once](http://undum.com/API.html#h_8)-links disable themselves
after they've been clicked, but the effect is temporary. If the reader
encounters the same link later, it's active again.

Disposable links are similar to once-links, but the effect is permanent:
after the reader has clicked on a disposable link,
it will never be shown during the same story again. (Links with the same target
(`href`-attribute) are considered being the same link.)

There are two ways to define disposable links: either give them as a list,
or specify that _all_ links should be disposable and list only
the exceptions.

The disposable link list should be assigned as an array to
`vorple.undum.settings.disposableLinks`:

{% highlight js %} 
vorple.undum.settings.disposableLinks = [ 'discard', 'these', 'links' ];
{% endhighlight %} 

To use the latter method and specify that all links should be disposable,
set `vorple.undum.settings.allDisposable` to `true`
and, if necessary, list the exceptions as an array in
`vorple.undum.settings.disposableExceptions`.

{% highlight js %} 
vorple.undum.settings.allDisposable = true;
vorple.undum.settings.disposableExceptions = [ 'non-disposable', 'links' ];
{% endhighlight %} 

If `vorple.undum.settings.allDisposable` is `true`,
`vorple.undum.settings.disposableLinks` will be ignored.

<div class="note floatbox">
Disposing a link will dispose of both actions and situations with the same name,
so it's generally best to always use unique action and situation names.
</div>

Disposable links don't make a difference between situations and actions.
Links to actions should be listed without the `./` prefix.

Disposable links can be defined anywhere in the story file.
Using `undum.game.init()` is recommended.

A link's status can be checked with
`vorple.undum.isDisposed()`[API](/vorple/release/doc/API/undum.html#isDisposed){: class="api"}
which will return `true` if the link has been disposed.


##### Disposing links manually

Links can be disposed manually by calling
`vorple.undum.dispose()`[API](/vorple/release/doc/API/undum.html#dispose){: class="api"}.
The function can dispose any number of links at the same time,
given either as separate arguments or as an array.

{% highlight js %} 
vorple.undum.dispose( 'name' );
vorple.undum.dispose( 'first', 'second', 'third' );
vorple.undum.dispose( [ 'first', 'second', 'third' ] );
{% endhighlight %} 

You can dispose even links that are not in the
`vorple.undum.settings.disposableLinks` list.



##### Reactivating disposed links

To reactivate a link call
`vorple.undum.reactivate()`[API](/vorple/release/doc/API/undum.html#reactivate){: class="api"}.
You can reactivate one or multiple links at the same time, just like with
`vorple.undum.dispose()`.

{% highlight js %} 
vorple.undum.reactivate( 'name' );
vorple.undum.reactivate( 'first', 'second', 'third' );
vorple.undum.reactivate( [ 'first', 'second', 'third' ] );
{% endhighlight %} 

Reactivation applies only to future links. Any inactive links currently visible
on the screen will not be activated. Reactivated links are not automatically
removed from  the list of disposable links,
so clicking on them later will again dispose of them.



#### Unique links

If a link has class `unique` applied to it, all other instances
of the same link will be automatically disabled. This can be used to make
sure that only one instance of a link will be visible at the same time.

{% highlight html %} 
Here's a <a href="name" class="unique>link</a>
and <a href="name">another</a>
but only the former one will be active because it's marked as unique
and the latter links to the same place.
{% endhighlight %} 

Or, using Vorple's HTML helpers:

{% highlight js %} 
vorple.html.link( 'name', 'link', { classes: 'unique' } );
// --> <a href="name" class="unique>link</a>
{% endhighlight %} 

<div class="resources">Resources</div>

* The Outgribe:
[More Undum link types](http://vorple-if.com/outgribe/2011/more-undum-link-types/)



#### `doClick()` and `doLink()` exposures

`undum.doClick()` and `undum.doLink()` are exposed as
`vorple.undum.doClick()`[API](/vorple/release/doc/API/undum.html#doClick){: class="api"}
and
`vorple.undum.doLink()`[API](/vorple/release/doc/API/undum.html#doLink){: class="api"}.
This lets the author use them outside Undum's own methods, when the
`undum` object is not available.


## Complete examples
{: #examples}

The examples can be downloaded separately from the
[download page](http://vorple-if.com/download).


### One With Everything
{: #everything}

The example story _One With Everything_ uses all standard Vorple
features. It's not really a story or a game by itself,
but if you want to see a real-life code example of any of the features
you can probably find it in the story's source code.

* _[One With Everything](../../stories/undum/everything/)_
* [Source code](../../stories/undum/everything/everything.game.en.js)


### Down the Rabbit-Hole
{: #rabbithole}

_Down the Rabbit-Hole_ showcases Vorple's features. It doesn't
include every feature like _One With Everything_ does and it uses
some more advanced techniques to e.g. show custom popup windows.

* _[Down the Rabbit-Hole](../../stories/undum/rabbithole/)_
* [Source code](../../stories/undum/rabbithole/rabbithole.game.en.js)


### Starborn
{: #starborn}

_Starborn_ is an Undum/Vorple adaptation of an
[Inform 7](http://inform7.com) keyword-based
story. The adaptation adds background music, an interactive map, clickable
buttons and other eye candy. Some of the features are straight-up Vorple,
some are custom-made for the story.

* _[Starborn](http://transcripts.game-testing.org/undum/starborn/)_
* [Source code](http://transcripts.game-testing.org/undum/starborn/starborn.game.en.js)
* [The original Inform 7 version](http://ifdb.tads.org/viewgame?id=xxzy1f49yw1n6ghj)
