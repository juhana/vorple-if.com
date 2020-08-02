---
id: glulx-compatibility
title: Compatibility with other interpreters
---

The Inform story files that use Vorple are compatible with offline Glulx interpreters and non-Vorple web interpreters. In most cases Vorple-specific features just do nothing unless otherwise noted in the documentation.


## Testing for Vorple support

The same .gblorb or .ulx file can be used either in the Vorple interpreter or in standard interpreters. The story file can test whether it's being run on the Vorple interpreter.
 
In Inform 6, the Vorple function `isVorpleSupported()` can be used to detect the Vorple interpreter. It works only after initialisation with `VorpleInitialise()` which is safe to call in any interpreter.

```
if (isVorpleSupported() == 0)
	print "Welcome to a boring old interpreter!"
else
	VorpleNotification("Welcome to Vorple!");
```

In Inform 7 Vorple support can be tested with `if Vorple is supported` and `if Vorple is not supported`:

```inform7
When play begins:
	if Vorple is not supported:
		say "Welcome to a boring old interpreter!";
	otherwise:
		show notification "Welcome to Vorple!"
```

It's a good idea to make sure that the text-only version of the story works as intended, for accessibility and archiving purposes. It's also easier to develop the game locally in Inform 7 when you can test it quickly in the IDE's built-in interpreter.


## Omitted Glulx features

Vorple replaces the standard Glk interface almost completely with its own system. For convenience basic text formatting (bold and italic text) works identically in all interpreters, but any other formatting (colors, font variations) does not. The Vorple Screen Effects extension provides similar text styling features as a replacement.

Any other advanced Glulx features are omitted, including:

* Graphics
* Sounds 
* Windowing system
* Timers

If needed in a Vorple game, these must be implemented with Vorple extensions or custom JavaScript code.

Most Glulx features do nothing in the Vorple interpreter, but if there's a conflict, the story file can be made to skip Glulx instructions with the `isVorpleSupported()` or `if Vorple is supported` test.
