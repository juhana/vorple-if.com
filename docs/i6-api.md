---
id: i6-api
title: Inform 6 library reference
---

Here's a handy list of the functionalities that Vorple can provide, and what the corresponding functions are.

## Vorple.h

This provides the basic functionality of Vorple:

* `VorpleInitialise()`: initialises Vorple; call once, in your Initialise routine. This **must** be called before any other Vorple functions are used, as early as possible.
* `isVorpleSupported()`: returns 0 if Vorple isn't supported, 1 if it is. Note: calling the functions from the Vorple extensions will not create any side-effects if the interpreter doesn't support Vorple; rather, Vorple will fail silently. But this function could be interesting if you wanted to change what your game says or does depending on this!

Other functions are available:

* Executing JavaScript commands:
  * `VorpleExecuteJavaScriptCommand(str)`: the javascript command `str` will be sent to the interpreter, which will execute it.
  * `VorpleWhatWasReturned()`: returns a buffer array containing what the last JS call returned.
  * `VorpleWhatTypeWasReturned()`: returns a string with the type of the object returned in the last JS call.
  * `VorpleWhatTextWasReturned()`, `VorpleWhatNumberWasReturned()`, `VorpleWhatBooleanWasReturned()`: returns the string, number or boolean which was returned by the last JS call; throws a runtime error if the last JS call returned something with a different type.

* Manipulating HTML elements (more functions are available in vorple-element-manipulation.h):
  * `VorplePlaceElement(elt, name, text)`: create a HTML tag of type `elt` (this could be `<tag>`, `<div>`, anything!), with the name `name` and containing the text `text`. The shorthands `VorplePlaceSpanElement(name,txt)` (to place `<span>`) or `VorplePlaceDivElement(name,txt)` (for `<div>`) are also available.
  * `VorplePutContentInAllElements(name, text)`: put the text `text` in all HTML elements that have the name `name`. You can put it only in the last (or only) one created with this name using `VorplePutContentInElement(name,text)`.
  * `VorpleCountElements(elt)` : count the number of elements with this name.
  * `VorpleElementExists(elt)` : checks whether there is an element with this name.

* User interface:
  * The `VorpleInterfaceSetup` and `VorpleInterfaceUpdate` objects are used to execute code related to the user interface; see [the corresponding section](ui-state.md) for more info.
  * `VorpleSetOutputFocus(target)`: sets the output focus to the given frame.
  * `VorpleSetOutputFocusMainWindow()`: sets the output focus back to the main window.
  * `VorpleBlockUserInterface()` and `VorpleUnblockUserInterface()` (self explanatory).
  * `VorpleScrollToElement(elt)` : makes the screen scroll to a particular HTML element.
  * `VorpleScrollToBottom()`, to have the screen scroll to the bottom of the page.

As well as utility functions:

* `bp_output_stream(3, str, MAX_LEN)`: the equivalent of `@output_stream 3` in Z-Machine : any subsequent `print` statement will write into the `str` array, until you use `bp_output_stream(-3)`. Very useful to build custom strings.
* `UniqueIdentifier()`: generates a 12-digit unique identifier; you can use that for the names of your HTML elements.
* `IntToString(i)`: returns an array representing the integer i.
* `StringToInt(str)`: returns the integer represented in the string str.
* `PrintStringOrArray(txt)`: displays the given string or buffer array.
* `BuildCommand(str1, ..., str7)`: concatenates strings. The string is written in a string called `hugehugestr`, which means this function should not be nested or used in anything else than a call to `VorpleExecuteJavaScriptCommand`.

Additionally, two "rulebooks" are used: VorpleInterfaceSetup, and StatusLineRulebook. If you declare an object as contained in either object, its description routine will be executed, respectively upon Vorple initialisation and when drawing the status line.

Relevant examples: Convenience Store, Spy Games, Scrambled Eggs, The Sum of Human Knowledge (note that this one uses its own CSS sheet), and all the other ones.

## Vorple-command-prompt-control.h

* `VorpleQueueCommand(cmd)`: queues a command to be executed as soon as the command line is available; optional second argument can be SHOW_QUEUED_COMMAND (so the player knows that this happened) or HIDE_QUEUED_COMMAND (so the player doesn't know).
* Command history manipulation: `VorpleAddCommandToHistory(cmd)` adds a command to the history as if the player had typed it, `VorpleRemoveLastCommandInHistory()` removes it, `VorpleClearCommandHistory()` clears the whole command history.
* `VorplePrefillPrompt(cmd)`: pre-fills the command line with a command (that the player is free to erase).
* `VorpleChangeLastCommand(cmd)`: replaces the last command typed by the player so that it shows something else.
* `VorpleHidePrompt()`, `VorpleShowPrompt()`: self-explanatory; careful, this means the player cannot type anything anymore!

Relevant examples: The Manchurian Candidate.

## Vorple-element-manipulation.h

This extension provides the functions `VorpleClearElement(elt)`, `VorpleRemoveElement(elt)`, `VorpleHideElement(elt)`, `VorpleShowElement(elt)`; `VorpleMoveElementUnder(elt, target)`, `VorpleMoveElementAtStart(elt, target)`, `VorpleMoveElementBefore(elt, target)`, `VorpleMoveElementAfter(elt, target)`; and `VorpleAddNameToElement(newname, elt)`, `VorpleRemoveNameFromElement(newname, elt)`, `VorpleRenameElement(newname, elt)`. The names of these functions are pretty self-explanatory.

For each of these functions, there is another one to apply it to all elements with a given name; for example `VorpleClearAllElements(elt)`, `VorpleRemoveAllElements(elt)`, etc.


## Vorple-hyperlinks.h

* `VorpleLinkWebsiteText(url, text, flag)`: this allows you to create a hypertext link on the text pointing to the specified url; the optional flag can be set to `SAME_WINDOW` if you want the page to open in the same window (for instance, if your game is over).
* `VorpleLinkWebsite(url, sameWindow)`: similar, but the link will read the explicit url.
* `VorpleLinkCommandText(cmd, text, dontShow)`: this creates a hyperlink showing the text such that when the player clicks on it, the command cmd is sent to the parser; use this for example to have clickable directions, by putting a link to "go north" on the word "north". The optional argument dontShow can take the following values: `0` by default (show the command and the response), or any of `DONT_SHOW_COMMAND`, `DONT_SHOW_RESPONSE` or `DONT_SHOW_COMMAND_OR_RESPONSE`.
* `VorpleLinkCommand(cmd, dontShow)`: similar, but the link will read the explicit command.
* `VorpleLinkJavaScript(cmd, text)`: creates a hyperlink which executes the given JavaScript command upon clicking.
* `VorpleLinkDisableName(name)`, `VorpleLinkDisableInElement(elt)`, `VorpleLinkDisableAll()`: disables the hyperlinks respectively with a given name, in an element with the given name, or all hyperlinks.

Relevant examples: Click to Learn More, Click to Retry.


## Vorple-modal-window.h

* `VorpleShowModalWindow(text)`: shows a window with the given text, with an 'OK' button the user has to click to dismiss the window.
* `VorpleSetFocusToModalWindow()` and `VorpleCloseModalWindow()`: self-explanatory.


## Vorple-multimedia.h

In order to use this extension, you have to point the interpreter to the folder where your multimedia files are. This is done by modifying the play.html file. For example, change

    vorple.media.defaults.audioPath = 'examples/resources/';

to set the folder in which Vorple will look for your audio files.

* `VorpleImage(file, desc, alignment)`: display the image in the file, with alternate description desc, and a given alignment, among `IMAGE_CENTERED`, `IMAGE_LEFT_ALIGNED`, `IMAGE_RIGHT_ALIGNED`, `IMAGE_LEFT_FLOATING`, and `IMAGE_RIGHT_FLOATING`.
* `VorplePreloadImage(file)`: preload the image, i.e. have the interpreter load the image before it is displayed (for instance, to avoid loading times).
* `VorplePreloadImages(list)`: preload all images in the table.

* `VorplePlaySoundEffect(file, loop)`: play the specified sound; put the second argument to `LOOP_SOUND` (or `1`) to loop it.
* `VorplePlayMusic(file, loop)`: play the specified music; put the second argument to `LOOP_MUSIC` (or `1`) to loop it.
* `VorpleStopMusic()`: stop all music.
* `VorpleStopSoundEffects()`: stop all sounds.
* `VorpleStopAudio()`: stop all music and sounds.
* `VorpleStartPlaylist(playlist, option)`: plays the playlist (which must be a table); the optional argument can be set to `PLAYLIST_REPEAT`, `PLAYLIST_SHUFFLE`, `PLAYLIST_REPEAT_SHUFFLE`. `VorpleClearPlaylist()` clears the current playlist.
* `VorpleIsMusicPlaying()`, `VorpleIsASoundEffectPlaying()`, `VorpleIsAudioPlaying()` all return booleans, while `VorpleIsAudioFilePlaying(file)` returns true if the given file is currently playing; you can also get the name of the currently playing music file using `VorpleGetMusicFilePlaying`.

Relevant examples: Serinette, Port Royal Reggae.


## Vorple-notifications.h

Note: change `NOTIFICATION_DURATION` if you need to change the default value, which is 7 seconds.

* `VorpleNotification(text,type,title, duration)`: shows the notification with the given text, of one of four types (`NOTIFICATION_INFO`, `NOTIFICATION_SUCCESS`, `NOTIFICATION_WARNING` and `NOTIFICATION_ERROR`), with the given title and the given duration (in seconds).

Relevant examples: How to I, Score Notifications.

## Vorple-status-line.h

* `VorpleConstructStatusLine(nb_cols)` creates the required number of HTML objects to construct a status line with the required number of columns. By default, the routine is called as part of the interface setup with 2 columns (location name on the left, score on the right); change the value of `VorpleStatusLineColumns` if you want to change this.
* `VorpleStatusLineUsualInfo` updates the correct variables (`VorpleStatusLineLeftHand` and `VorpleStatusLineRightHand`) so they contain respectively the location name and the score/number of turns. This routine is called only if `VORPLE_USUAL_STATUS_LINE` is set to 1 (it is by default).
* The object StatusLineRulebook governs the structure of the status line. If it is empty (it is by default), the status line is filled with the contents of `VorpleStatusLineLeftHand`, `VorpleStatusLineMiddleHand` and `VorpleStatusLineRightHand` depending on the number of columns. If you want to add your own custom code, write it in the description of an object that you put in the StatusLineRulebook.

Relevant examples : Petting Zoo.

## Vorple-screen-effects.h

* `VorpleStyle(style)`: from then on, write the letters in a specific style. The values are `STYLE_CURSIVE`, `STYLE_EMPHASIS`, `STYLE_FANTASY`, `STYLE_MONOSPACE`, `STYLE_NOWRAP`, `STYLE_STRIKETHROUGH`, `STYLE_STRONG`, `STYLE_UNDERLINE`, `STYLE_XXSMALL`, `STYLE_XSMALL`, `STYLE_SMALL`, `STYLE_LARGE`, `STYLE_XLARGE`, `STYLE_XXLARGE` for the font; `STYLE_BLACK_LETTERS`, `STYLE_RED_LETTERS`, `STYLE_GREEN_LETTERS`, `STYLE_YELLOW_LETTERS`, `STYLE_BLUE_LETTERS`, `STYLE_MAGENTA_LETTERS`, `STYLE_CYAN_LETTERS`, `STYLE_WHITE_LETTERS`, `STYLE_BROWN_LETTERS`, `STYLE_DARK_GRAY_LETTERS`, `STYLE_LIGHT_GRAY_LETTERS`, `STYLE_LIGHT_BLUE_LETTERS`, `STYLE_LIGHT_GREEN_LETTERS`, `STYLE_LIGHT_CYAN_LETTERS`, `STYLE_LIGHT_RED_LETTERS`, `STYLE_LIGHT_MAGENTA_LETTERS` for the color of the letters; `STYLE_BLACK_BACKGROUND`, `STYLE_RED_BACKGROUND`, `STYLE_GREEN_BACKGROUND`, `STYLE_YELLOW_BACKGROUND`, `STYLE_BLUE_BACKGROUND`, `STYLE_MAGENTA_BACKGROUND`, `STYLE_CYAN_BACKGROUND`, `STYLE_WHITE_BACKGROUND`, `STYLE_BROWN_BACKGROUND`, `STYLE_DARK_GRAY_BACKGROUND`, `STYLE_LIGHT_GRAY_BACKGROUND`, `STYLE_LIGHT_BLUE_BACKGROUND`, `STYLE_LIGHT_GREEN_BACKGROUND`, `STYLE_LIGHT_CYAN_BACKGROUND`, `STYLE_LIGHT_RED_BACKGROUND`, `STYLE_LIGHT_MAGENTA_BACKGROUND` for background color.
* `VorpleEndStyle()`: disable the latest style.
* `VorpleEndAllStyles()`: disable all text styles.

* `VorpleCenterText(text)`: print the text with fixed width and centered.
* `VorpleRightAlign(text)`: print the text with right alignment.
* `VorpleBoxedQuotation(text)`: displays a box with a quotation (Glulx fallback not available yet).
* `VorplePlaceHeader(number, text, name)`: place a "h" element of the given number.
* `VorpleDisplayOrderedList(list)`: displays a list with each element numbered starting from 1.
* `VorpleDisplayUnorderedList(list)`: displays a list with bullets.

Relevant examples: Letters from a Madman, Monty Hall (note that it uses its own CSS sheet).


## Vorple-tooltips.h

* `VorpleTooltipMouse(text, tip)`: writes the text, and opens a tooltip showing the tip when the player points their mouse to the text.
* `VorpleTooltipAllElementsMouse(tip, name)`: if the player hovers over any HTML element named `name` in the page, there will be a tooltip.
* `VorpleTooltipElementMouse(tip, name)`: the same but for the latest of the elements named `'name'`.
* `VorpleTooltipElement(tip,name,delay)`: after `delay` milliseconds, a tooltip showing `tip` displays on the element named `name`.
* `VorpleTooltipPrompt(tip,delay)`: after `delay` milliseconds, a tooltip showing `tip` displays on the prompt.
* `VorpleTooltipHide(delay)`: hide all tooltips after this many milliseconds.

Note: there is also `VorpleTooltipElementDuration` and `VorpleTooltipPromptDuration`, with an extra argument to be specified in milliseconds; and `VorpleTooltipElementIndefinitely` and `VorpleTooltipPromptIndefinitely`, for which the tooltip does not disappear.

Relevant examples: Medical Dictionary, How to II, Ibid (2).