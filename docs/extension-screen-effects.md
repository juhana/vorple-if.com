---
id: extension-screen-effects
title: Screen Effects
---

```inform7
Include Vorple Screen Effects by Juhana Leinonen.
```

Vorple Screen Effects duplicates in Vorple the effects provided by Basic Screen Effects by Emily Short and adds a couple of new ones.

Vorple Screen Effects includes Basic Screen Effects and uses its definitions when the game is played in a non-Vorple interpreter.


## Differences with Basic Screen Effects

The following phrases work identically in both Vorple and non-Vorple interpreters. See the documentation of Basic Screen Effects for more information.

```inform7
clear the screen;
wait for any key;
wait for the SPACE key;
pause the game;
stop game abruptly;
```

The following phrase from Standard Rules is modified to display a boxed quote in Vorple:
	
```inform7
display the boxed quotation (text);
```

The phrase `show the current quotation` in Basic Screen Effects is unnecessary in Vorple so it doesn't do anything, except when the game is played in a non-Vorple interpreter.
	
The following phrases are available but behave slightly differently in Vorple:

```inform7
center (text);
```

Vorple doesn't have a status line by default so any phrases related to changing or displaying the status line do not do anything (except in offline interpreters). The phrase "clear only the main screen" does the same as "clear the screen". To include a status line in Vorple, see the [Vorple Status Line](extension-status-line.html) extension.

These phrases not found in Basic Screen Effects have been added:

```inform7
right-align (text);
turn the foreground (color);
(color) background;
```

Vorple is Glulx-only, but an equivalent mechanism to Basic Screen Effect's Z-machine specific text and background color changing is included, as well as a phrase to choose any arbitrary color for text or background.

And finally, there are some helper phrases that let create header and list elements.


## A note about Glulx Text Effects

Vorple Screen Effects is compatible with Glulx Text Effects in that the Glulx text effects are ignored in the Vorple interpreter, but they can be used to provide fallback styles for non-Vorple interpreters.


## Text styles

The following styles are provided with the extension:

```inform7
cursive font
emphasized font
fantasy font
monospace font
nowrap font
strikethrough font
strong font
underlined font
```

The `cursive font` style displays text in a font resembling cursive writing, `fantasy font` uses a decorative font resembling handwriting and `monospace font` is a fixed width font (corresponding to Inform's `[fixed letter spacing]`). The actual font used depends on the web browser, operating system, user preferences and any custom CSS directives. 

`Emphasized font` and `strong font` are usually (but not guaranteed to be) italic and bold text respectively.

The `nowrap font` style does not allow line breaks inside the style. It's mostly used when displaying numbers that use space as a separator. For example, we don't want the text `"The suitcase contains a statue worth 100 000 dollars"` to be split between "100" and "000":

```text
The suitcase contains a statue worth 100
000 dollars.
```	

If we add the `nowrap font` style (`"The suitcase contains a statue worth [nowrap font style]100 000[end style] dollars."`) the number is guaranteed to stay on the same line:

```text
The suitcase contains a statue worth
100 000 dollars. 
```

We should take care not to apply the nowrap style to very long pieces of text. If the text is longer than the normal line width it overflows beyond the normal text area. 

The following styles can be used to change the font size, proportional to the default font, from smallest to largest:

```inform7
xx-small font
x-small font
small font
large font
x-large font
xx-large font
```

New styles can be added if a CSS file with corresponding style instructions is supplied with the story.

```inform7
Release along with style sheet "emotions.css".
Angry is a Vorple style.

When play begins:
    say "You are feeling [angry style]especially furious[end style] today!".
```
		
The "emotions.css" file:

```css
.angry {
    color: red;
    font-size: larger;
    font-weight: bold;
}
```

The style's name is applied to the text as a class. Uppercase characters are converted to lowercase and spaces are replaced with dashes, e.g. `My Custom Font` style in Inform becomes a class called `my-custom-font`. Style names should only contain alphanumeric characters (a-z, 0-9), dashes, underscores and spaces.


## Colors

16 colors are provided to be used as foreground and background colors:

```inform7
white 
black 
blue 
green 
cyan 
red 
magenta 
brown 
yellow 
dark gray 
light gray 
light blue 
light green 
light cyan 
light red 
light magenta 
```

Text colors are called `<color> letters` and background colors are `<color> background`, e.g. `blue letters` and `green background`.

This basic set of colors can be used like font styles described in the previous chapter:

```inform7
say "A [green letters style]frog[end style] jumps into the [white letters style][blue background style]pond[end style][end style].";
```

The entire page's colors can be changed with these phrases:
	
```inform7
apply (Vorple style) style to the entire page;
remove (Vorple style) from the entire page;
```


## Centering and aligning text

Offline interpreters can't center variable width text, but for Vorple it's not a problem. 

```inform7
center "I'm centered!";
```
	
In non-Vorple interpreters the text is displayed in a fixed width font, but in Vorple it uses whatever the page's default font style is. To mimic the standard behavior we can apply style instructions in the text that's printed:

```inform7
center "[monospace font style]I'm centered![end style]";
```

We can also display text aligned right:

```inform7
right align "Over here!";
```

This will only work in Vorple. In other interpreters the text will be shown left-aligned.


## Headers and lists

The extension provides helper phrases for creating headers and lists ("helpers" because they're just shortcuts to phrases in the core Vorple extension.)

Headers come in six different sizes, from level 1 to 6 where 1 is the largest and 6 is the smallest. In the default Vorple theme level 1 header is about 4 times larger than the normal text size.

```inform7
place a level 3 header called "myheader" reading "Meanwhile...";
place a level 3 header reading "":
```

(The `called` part is again for naming the element.)

Lists come in two different variations: ordered and unordered. Items in an ordered list are numbered, and items in an unordered list have bullet points. These phrases turn an Inform list of text into HTML lists.

```inform7
display an ordered list { "One", "Two", "Three" } called "mylist";
display an unordered list { "One", "Two", "Three" };
```


## Examples

### Letters from a Madman

*An example of all different styles available in the extension*

The letter in this example story has all the styles defined in the extension, plus a couple of combinations and colors.

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=q8fdxd"></iframe>


### Monty Hall

*A game show where the result is displayed with fancy font effects*

Imagine a game show where you are presented with three doors. Behind one of them is a brand new car, and behind the rest are goats. You get to choose one of the doors. Then the game host opens one of the other doors revealing a goat, and you are given a chance to either switch to the one remaining door or open the one you picked originally. The Monty Hall paradox is a counterintuitive statistical fact that switching the door gives a much higher chance at finding a car behind it.

We'll display the game's result using a custom-made CSS style file. It also styles the room header and uses a font from [Google Fonts](https://fonts.google.com).

The CSS file can be downloaded from [here](https://vorple-if.com/resources.zip).

```inform7
"Monty Hall"

Include Vorple Screen Effects by Juhana Leinonen.
Release along with the "Vorple" interpreter.
Release along with style sheet "montyhall.css".

Let's Make a Deal is a room.	

Chapter 1 - Game rules

A gamedoor is a kind of container.

door A, door B and door C are fixed in place closed gamedoors in Let's Make a Deal.

A goat is a kind of thing. There are 2 goats. A car is a thing.

Definition: a gamedoor is unused if nothing is in it.
Definition: a gamedoor is wrong if a goat is in it.
Definition: a gamedoor is correct if the car is in it.

To decide which gamedoor is the remaining gamedoor which is not (first - a gamedoor) or (second - a gamedoor):
    repeat with X running through gamedoors:
        if X is not the first and X is not the second:
            decide on X.

When play begins:
    now the car is in a random gamedoor;
    repeat with G running through goats:
        now G is in a random unused gamedoor.
        
Instead of opening a gamedoor when every gamedoor is closed:
    let host-chosen door be a random wrong gamedoor which is not the noun;
    let optional door be the remaining gamedoor which is not the host-chosen door or the noun;
    say "'But wait!' the host says. 'You still have a chance to change your mind.' He opens [host-chosen door] which reveals a goat.

'You can still open [noun], or you can switch and open [optional door] instead. Which one will you choose?'";
    now the host-chosen door is open.
    
Instead of opening a closed gamedoor:
    say "'Congratulations!'";
    end the story saying "You win [a random thing in the noun]!".


Chapter 2 - Room header style

Room header is a Vorple style.

Rule for printing the name of a room (called the place) while looking:
    say "[room header style][printed name of place][end style]".


Chapter 3 - Epitaph style

Prize is a Vorple style.

Before printing the player's obituary:
    say prize style;

After printing the player's obituary:
    say end style.

Test me with "open A / open A".
```
