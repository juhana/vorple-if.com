---
id: i7-authoring
title: Authoring with Vorple in Inform 7
---

After [installing Vorple](i7-installation.md) we can start making a 
Vorple-powered game. As a practice task let's try the Vorple Notifications 
extension which lets us show information banners outside the actual story text. 

Start a new project and type the following:

```inform7
Include Vorple Notifications by Juhana Leinonen.
```

In addition to including the extensions we need, the custom Vorple interpreter 
must be specified.

```inform7
Release along with the "Vorple" interpreter.
```

As per the extension's documentation we can display banners with a
`display a notification` phrase.

```inform7
The Parade is a room.

When play begins:
    display a notification reading "Welcome to Vorple!".
```

<img src="/img/release-button.png" alt="The release button" class="float-right">
Time to see how it looks like! If we were to now click on the "Go" button the 
story would be compiled and run inside the Inform IDE. The problem is that the 
IDE interpreter is of standard Glulx variety which doesn't support Vorple so we 
wouldn't see the notification there. Instead we have to click on the "Release" 
button to make the project generate a web page with the custom interpreter.

After Inform has compiled and built the release package, follow the instructions
given in the [local server installation instructions](localhost.md) and open the
web address `http://localhost/Project Name.materials/Release/play.html` in a
browser (where `Project Name.materials` is replaced with the materials folder's 
actual name). 

If everything went as planned, we should now see the story start and our welcome
message pop up in the top right corner of the web page.

From now on after making changes to the Inform code we can just push the release
button, switch to the browser and reload the page.

A story compiled this way doesn't have debugging commands like ACTIONS or SHOWME available.
To re-enable them, try the extension
[Extended Debugging by Erik Temple](http://inform7.com/extensions/Erik%20Temple/Extended%20Debugging/index.html).
Just remember to disable it again when actually releasing the story.

The extensions contain more detailed instructions on how to use them, so for example
if you wish to add pictures or sounds to the story, open the Vorple Multimedia
extension and read its documentation.

