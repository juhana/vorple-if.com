# Inform 7 Interactive Fiction with Vorple

{% include doc/intro.markdown %}

## Installation and usage

### Getting started

First of all, you need Inform 7 which can be downloaded from its web site at
[inform7.com](http://inform7.com). From now on we're assuming you know the
basics of Inform, but if that's not the case, a good place to start is the
built-in manual or
[other available documentation](http://www.intfiction.org/forum/viewtopic.php?f=7&t=3988).

(If Inform 7 isn't to your taste, Vorple is available for
[Inform 6](http://inform-fiction.org) as well;
[documentation here]({{site.url}}/doc/#inform6).)

In addition to Inform 7 we need the custom Vorple interpreter and the
Vorple extensions. They can be downloaded from the
[download page]({{site.url}}/download). After downloading, you'll need to
install the interpreter and the extensions, and then install a local server so
that you can play the stories you create. The instructions are in these two
documents:

* [Installation guide]({{site.url}}/doc/setup)
* [Setting up a local server]({{site.url}}/doc/localhost)

<div class="note">
Inform 7 comes bundled with a previous version of the Vorple interpreter,
and the Public Library extension repository hosts old versions of the Vorple
extensions. You'll have to make sure your Inform project uses the new version of
the interpreter and extensions. See the
<a href="{{site.url}}/doc/setup">troubleshooting section of the installation
guide</a> if you run into problems.
</div>

The extension "Vorple by Juhana Leinonen" contains the basic definitions that
are needed for the system to work. It's required by all other extensions, so
it's the one extension that must be installed. Some extensions depend on each
other, so installing all of them is recommended.


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
         display a notification reading "Welcome to Vorple!".

![The release button]({{site.url}}/media/image/doc/release-button.png){: class="floatimg" }

Time to see how it looks like!
If we were to now click on the "Go" button the story would be compiled and run
inside the Inform IDE. The problem is that the IDE interpreter is of standard
Glulx variety which doesn't support Vorple so we wouldn't see the notification
that way. Instead we have to click on the "Release" button to make the project
generate a web page with the custom interpreter.

After Inform has compiled and built the release package, open a web browser and
type `localhost` to the address bar. Remember to
[install a local server]({{site.url}}/doc/localhost) first.

If everything went as planned, we should now see the story start and our welcome
message pop up in the top right corner of the web page.

From now on after making changes to the Inform code we can just push the release
button, switch to the browser and reload the page.

<div class="note">
A story compiled this way doesn't have debugging commands like ACTIONS or SHOWME available.
To re-enable them, try the extension
<a href="http://inform7.com/extensions/Erik%20Temple/Extended%20Debugging/index.html">
    Extended Debugging by Erik Temple</a>.
Just remember to disable it again when actually releasing the story.
</div>

The extensions contain more detailed instructions on how to use them, so for example
if you wish to add pictures or sounds to the story, open the Vorple Multimedia
extension and read its documentation.

For more basic information, see the documentation for the core Vorple extension.


## Compatibility with non-Vorple interpreters

The Glulx story files that use Vorple are compatible with offline interpreters
and non-Vorple web interpreters. In most cases the Vorple-specific features
just do nothing.

The story file can test whether it's being run on the Vorple interpreter or not
using an `if Vorple is supported` (or `if Vorple is not supported`) test:

    When play begins:
         if Vorple is supported:
             show notification "Welcome to Vorple!";
         otherwise:
             say "Welcome to a boring old interpreter!"

It's a good idea to make sure that a text-only version of the story works
as intended, for accessibility and archiving purposes.

