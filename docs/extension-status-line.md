---
id: extension-status-line
title: Status Line
---

```inform7
Include Vorple Status Line by Juhana Leinonen.
```

By default Vorple doesn't show the standard Glulx status line that you'd see in a traditional non-Vorple interpreter. This extension re-adds the status line feature, with some extra functionality.


## Constructing the status line

The Vorple status line can have either 1, 2 or 3 columns. The status line is created by calling the phrase `construct the Vorple status line with N columns` where N is the number of required columns.

```inform7
When play begins:
    construct the Vorple status line with 2 columns.
```

The contents of the status line are determined by variables called left hand Vorple status line, middle Vorple status line, right hand Vorple status line and mobile Vorple status line. The default contents of left and right hand columns are the same as the contents of the Glulx status line, and the middle column is empty (except in the 1-column status line, where the middle column has the contents of the Glulx left hand status line).

The following example creates a 3-column status line with different content in each column.

```inform7
The left hand Vorple status line is "You are: [the printed name of the player]".
The middle Vorple status line is "Location: [the player's surroundings]".
The right hand Vorple status line is "Time: [time of day]".

When play begins:
    construct the Vorple status line with 3 columns.
```

(Note that instead of `location` it's better to use `the player's surroundings` because it'll print "in darkness" instead when there's no light in the room, or the container's name if the player is inside an opaque container.)

Column contents can also be changed during the play with `now the left hand Vorple status line is ...` and so on.

When the status line is constructed with 1 column, only the middle column is shown. When constructed with 2 columns, only left and right hand columns are shown.

The contents of the columns are automatically aligned left in the left hand column, centered in the middle column and aligned right in the right hand column.

The columns of the standard Glulx status line have a fixed height. The Vorple status line adapts its height to its contents, so any text that doesn't fit in a column automatically wraps to a new line. Each column takes an equal amount of space on the screen, so a 2-column status line's columns both occupy half the width and 3 columns take one third each.

The status line can be removed at any point with:

```inform7
remove the Vorple status line;
```

After removing the status line it can be recreated with the `construct the status line` phrase. Changing the amount of columns is also possible by constructing the status line with a new column count.

We can also remove the contents of the status line with

```inform7
clear the Vorple status line;
```

which removes the contents but leaves the columns in place, but that's useful only in custom status line construction rules because the default status line construction rule will just fill the columns again at the end of the turn.


## Mobile status line

If the browser screen is 568 pixels wide or smaller, the usual status line columns are replaced with a special mobile status line. The idea is to automatically reduce two and three column status lines to just one so that individual columns don't become too narrow on small screens.

The contents of the mobile status line can be changed by setting the value of `mobile Vorple status line`. The default content is the same as the left hand Vorple status line, except when the status line is constructed with 1 column. In that case the default content is the same as the column that is shown in the wide view (middle Vorple status line.) 

Here we'll set the mobile status line to all three columns separated by slashes. This works well when the columns have very short content.

```inform7
The mobile Vorple status line is "[left hand Vorple status line] / [middle Vorple status line] / [right hand Vorple status line]".
```

When there content is longer it's often better to place the columns on top of each other, or just omit the less important information.

```inform7
The mobile Vorple status line is "[left hand Vorple status line][line break][middle Vorple status line][line break][right hand Vorple status line]".
```

We can test the mobile status line by resizing the browser window. The mobile status line toggles automatically when the screen width crosses the 568 pixel limit.


## Using together with the standard status line

The Vorple left hand and right hand status lines are initially defined to have the same content as the standard Glulx status line (which you see in non-Vorple interpreters). The extension initializes the status line contents with this code:

```inform7
The left hand Vorple status line is usually " [left hand status line]".
The right hand Vorple status line is usually "[right hand status line] ".
```

If left as is, changing the `left hand status line` and `right hand status line` variables will change both the Vorple status line and the Glulx status line. Changing the Vorple status line variables to something else will break this connection.

The Glulx right hand status line has a character limit of 14 characters. Vorple doesn't have this limitation, but if the same content is used for both status lines, the right hand should be limited to 14 characters.


## Manually refreshing the status line

The status line is automatically refreshed to show current information at the end of each turn. Sometimes we might want to refresh manually, for example when waiting for a keypress or an answer to a yes/no question. It can be done with:
	
```inform7
follow the refresh Vorple status line rule;
```


## Custom status line construction rules

An activity called `constructing the Vorple status line` is responsible for updating the status line. The default rule creates the status line as described earlier, but it any custom rules can be added to the activity. The example [Petting Zoo](#petting-zoo) below shows an example of how that can be done. Adding `rule succeeds` at the end will block the default rule from running (which would usually otherwise overwrite whatever the custom rule has done.)

For the purposes of adding content to the status line columns, the elements are named `status-line-left`, `status-line-middle`, `status-line-right` and `status-line-mobile`. The entire status line is called `status-line-container`.


## Styling the status line

By default the status line is as wide as the column that displays the story text. The status line can be made to span the entire screen width with the `full-width status line` option:

```inform7
Use full-width status line.
```

CSS can be used to style the status line in virtually any fashion. For example, the following CSS rule changes the line below the status line from double lines to a single line and makes the background light blue:

```css
.status-line-container {
    border-bottom: 1px solid;
    background-color: #ddddff;
}
```

The relevant CSS classes are `status-line-container`, `status-line-left`, `status-line-middle`, `status-line-righ` and `status-line-mobile`, as described in the previous chapter.

See the [Styling the game with CSS](css.html) for more information about CSS.


## Examples

### Petting Zoo

*An icon in the status line to show the player character's mood*

This example shows how to insert images to the status line. The status line reflects a change in a value - the player character's mood - by showing appropriate icons in the left column. In the mobile view the icons are shown in the middle of the status line.

Because the extension doesn't directly have features to insert images into the status line, we'll write a custom status line construction rule for it. The rule first removes old content from the status line, then puts the image in the left column and the location to the right column.

The image files used in this example can be downloaded from [here](https://vorple-if.com/resources.zip).

<iframe width="780" height="450" src="https://embedded-snippet.borogove.app/?id=f38qxq"></iframe>
