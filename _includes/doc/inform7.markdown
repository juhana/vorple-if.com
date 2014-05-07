# Inform 7 Interactive Fiction with Vorple


## Introduction to Vorple

Vorple is a custom web interpreter and a set of extensions for
[Inform 7](http://inform7.com) that lets you do things that so
far haven't been possible such as displaying images, playing sounds,
adding tooltips and notifications and much more.
Take a look at the [demo page](/demo/#inform7) for some examples.

For an explanation on how the system works, see chapter
[Vorple in depth](#vorple-in-depth) below.


### Known limitations

Vorple is experimental software and in early stages of development.
There are a number of known issues that will be fixed in later releases:

* Command history (browsing old commands with the up arrow key) isn't available.
* Undoing is not reliable if the browser communicates with the story file using
  hidden commands.
* Saving and restoring stories is likely to work erratically.

At the moment only Z-machine is supported. Glulx support is on the works.


## Installation and usage

### Getting started

First of all, you need Inform 7 which can be downloaded from its web site at
[inform7.com](http://inform7.com). We're assuming you know the
basics, but if not, a good place to start is the included manual or
[other available documentation](http://www.intfiction.org/forum/viewtopic.php?f=7&t=3988).

(If hypertext fiction is more your thing, Vorple is available for
[Undum](http://undum.com) as well.)

In addition to Inform 7 we need the custom Vorple interpreter and the
Vorple extensions. Luckily the latest Inform 7 release already comes with
the interpreter built-in, and installing the extensions is easy from the new
Public Library.

Open the Extensions pane and click on the Public Library tab.
The Vorple extensions are under subheading §12.5.

![Downloading Vorple extensions from the Public Library]({{site.url}}/media/image/doc/public-library-download.png)

Download and install the extensions by clicking on the "download" buttons.

<div class="note">
The Public Library is at the moment available only in the OS X IDE. Windows
and Unix users have to download and install the extensions separately from the
<a href="/downloads">downloads page</a>. The Inform 7 manual has instructions
on how to install them.
</div>

The extension "Vorple by Juhana Leinonen" contains the basic definitions that
are needed for the system to work. It's required by all other extensions, so
it's the one extension that must be installed. The other extensions are:

* Vorple Hyperlinks: Clickable web links and commands
* Vorple Multimedia: Images, sounds and videos
* Vorple Notifications: Notifications as text banners
* Vorple Screen Effects: Text and font effects. Roughly the equivalent of
  the built-in Basic Screen Effects extension.
* Vorple Tooltips: Pop-up tooltips, timed or on mouse hover


### Using the extensions

Now that we have the extensions we can start developing. Let's pick the Vorple
Notifications extension which lets us show information on banners outside the
actual story text. Start a new project and type the following:

    Include Vorple Notifications by Juhana Leinonen.

The functionality of each extension varies, but in addition to including the
extension(s) we need, the custom Vorple interpreter must be specified.

    Release along with the "Vorple" interpreter.

As per the extension's documentation we can display banners with a
`show notification` phrase.

    The Parade is a room.

     When play begins:
         show notification "Welcome to Vorple!".

Time to see how it looks like! Vorple is Z-Machine only so before compiling
the project we need to change the settings to make the project use Z-Machine
instead of Glulx. It can be done in the "Settings" pane.

![Setting the project to Z-Machine]({{site.url}}/media/image/doc/z8-settings.png)

![The release button]({{site.url}}/media/image/doc/release-button.png){: class="floatimg" }

If we would now click on the "Go" button the story would be compiled and run
inside the Inform IDE. The problem is that the IDE interpreter is of standard
Z-Machine variety which doesn't support Vorple so we wouldn't see the banner
that way. Instead we have to click on the "Release" button to make the project
generate a web page with the custom interpreter.

After Inform has compiled and built the release package, it shows a summary of
directories and files it has created.
Click on the "browse play-in-browser page" button to open the web interpreter.

![Browse play-in-browser page button]({{site.url}}/media/image/doc/browse-button.png)

If everything went as planned, we should now see the story start and our welcome
message pop up in the lower right corner of the web page.

![Interpreter view with the notification]({{site.url}}/media/image/doc/notification-example.png)

From now on instead of going this long route we can just push the release
button, switch to the browser and reload the page.

<div class="note">
A story compiled this way doesn't have debugging commands available.
To re-enable them, try the
<a href="http://inform7.com/extensions/Erik%20Temple/Extended%20Debugging/index.html">
    Extended Debugging extension by Erik Temple</a>.
Just remember to disable it again when actually releasing the story.
</div>


### A note about Internet Explorer

Vorple is compatible with Internet Explorer, but __only if played online__.
If you try to open the interpreter directly from the hard drive (as you do
when you open the online interpreter using the "browse" link as discussed above)
the page will crash in the loading screen.

The simple solution to this problem is to use some other browser, like Chrome
or Firefox. If the "browse" link opens the interpreter in Internet Explorer,
copy the address from the address bar, open the other browser, and paste it in
the other browser's address bar instead.


## Compatibility with non-Vorple interpreters

The Z-code story files that use Vorple are compatible with offline interpreters
and non-Vorple web interpreters. In most cases the Vorple-specific features
just do nothing.

The story file can test whether it's being run on the Vorple interpreter or not
using an `if Vorple is [not] supported` test:

    When play begins:
         if Vorple is supported:
             show notification "Welcome to Vorple!";
         otherwise:
             say "Welcome to a boring old interpreter!"

It's a good idea to make sure that a text-only version of the story works
as intended, for accessibility and archiving reasons.


## Vorple in depth

Back in the days when home computers first entered consumer markets there
were many competing companies selling computers that weren't compatible with
each other. To maximize the amount of potential customers
[Infocom](http://en.wikipedia.org/wiki/Infocom) had to solve the problem of
programming and distributing their games to a wide array of computers with
varying specifications and limitations.

The solution was to create a virtual machine that would harmonize the
differences between computer systems. The game file would always be the same
for each system and there would be a system-specific interpreter program that
would translate the game file into instructions the computer understood.
This way the game could be programmed and compiled only once and it would work
on any system that had an interpreter written for it.

![Virtual machine inside operating system]({{site.url}}/media/image/doc/virtual-machine.png)


The virtual machine was called _Z-machine_ after Zork, the first game
that used it. Decades later Inform 7 still compiles to Z-machine (and Glulx,
the contemporary virtual machine that works basically the same way).

To a modern consumer of interactive fiction the virtual machine model has
other benefits in addition to being able to play the stories in a wide
selection of devices. The virtual machine is effectively a _sandbox_
that limits what story files are allowed to do. They can't, for example,
delete files from the computer, install malicious software or access your
webcam. When you download an interactive fiction story file you can be certain
that it isn't a virus and it can't do anything harmful.

To an author of interactive fiction the sandbox can sometimes feel rather
limiting. We've come a long way since the early days of Infocom and the
things we now casually do with computers is far more than anyone could have
dreamed of 30 years ago. Yet interactive fiction is still confined to
streaming text, displaying pictures, playing sounds and performing some
limited file operations.

Cue the Internet age. Parchment is an online Z-machine/Glulx interpreter
that lets you play interactive fiction on any computer with Internet access
and a web browser. A modern web browser is also a sandbox, but with quite
a lot of more capabilities (but still with restrictions in place so that in
theory you can visit any web page and be sure that you can't catch anything
malicious).

![Virtual machine inside web browser inside operating system]({{site.url}}/media/image/doc/parchment.png)

Parchment was a small revolution in itself and turned the community focus
from downloadable story files to Internet play, but Parchment is still
"only" an implementation of existing virtual machines. It restricts the
story files to the same sandbox as offline interpreters do.

This is where Vorple comes in. It makes a small addition to the interpreter
so that the story files can break free of the Z-machine sandbox and
communicate with the browser running the interpreter.

![Vorple creating a bridge between the virtual machine and the browser]({{site.url}}/media/image/doc/vorple-bridge.png)

With this bridge in place the story file can do pretty much whatever it
wants with the user interface and the story text&mdash;even story text that
has already been printed.

Additionally Vorple provides a JavaScript library that makes it easier to
add features specifically to interactive fiction stories (as opposed to
usual web pages). The Inform 7 extensions are mainly interfaces to the
underlying JavaScript library.

To recap, Vorple for Inform consists of three main features:

* JavaScript library for building and handling user interface elements
* Inform 7 extensions that can use the library
* Customized interpreter that lets the extensions access the library

The project's headquarters are at [vorple-if.com](http://vorple-if.com) where
you'll find all the official materials and downloads. JavaScript developers who
want to dig into the innards of the system can find the source code at
[GitHub](http://github.com/juhana/vorple).

The library and all official materials are open source and free for anyone
to use for any purpose. (Mandatory footnote: Do still read all the licenses
if you want to use it commercially or as a part of a closed system.
Some third party themes, for example, are subject to slightly more
restrictive licenses.)


## Support

The best place to look for assistance is the community forum at
[intfiction.org](http://intfiction.org/forum). Vorple's author
frequents the forum, as do other experienced authors who are happy to
answer civilized help requests about authoring with Inform, Vorple or other
systems.

Bugs can be reported at the project's
[GitHub pages](https://github.com/juhana/vorple/issues) or by
sending mail to [bugs@vorple-if.com](mailto:bugs@vorple-if.com).
