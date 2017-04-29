## Introduction to Vorple

Vorple is a custom web interpreter and a set of extensions for
that adds features to [Inform 6](http://inform-fiction.org) and
[Inform 7](http://inform7.com) by letting the Inform story file execute
JavaScript commands in the browser where it's running. Some examples of such
features are font styles, tooltips, notifications, and popup modals, but the
possibilities are virtually limitless. Take a look at the
[demo page](/demo/) for some examples.

For a more thorough explanation on how the system works, see chapter
[Vorple in depth](#vorple-in-depth) below.


### Known issues

The previous versions of Vorple worked only in the Z-machine format, which
severely limited the size of the stories that were possible to write, especially
with Inform 7. The current release is compatible with Glulx which in practice
eliminates all size limitations. **The latest version is still a preview**,
so while it's stable and works, it hasn't gone through rigorous testing
and may contain unexpected problems.

These are the currently known major issues:

* No Internet Explorer support — the system should support the latest versions
  of all major browsers, but the interpreter engine uses a feature that doesn't
  work in IE 11.
* Some planned features are not ready yet. In Vorple Screen Effects setting font
  styles for the entire page isn't implemented, neither is setting colors to an
  arbitrary value from inside Inform. The transient text feature is removed from
  the Screen Effects extension and will be included in a future text animation
  extension. Vorple Modal Windows has only the basic functionality.
* Executing JavaScript commands may cause insertion of additional line breaks
  to the story output in Inform 7. This happens depending on the punctuation in the command
  and the location in the Inform code where it's executed. Most noticeably
  the Vorple Status Line extension may add extra line breaks in the output.
* The prompt is printed twice when the story ends.
* Opening multiple modal windows in succession with Vorple Modal Windows
  may cause the modals to act erratically.

The full list of known issues is [for the interpreter here](https://github.com/vorple/vorple/issues?utf8=%E2%9C%93&q=is%3Aissue%20created%3A%3E2017-04-26%20)
and [for the extensions here](https://github.com/vorple/inform7/issues?utf8=%E2%9C%93&q=is%3Aissue%20created%3A%3E2017-04-26%20).

