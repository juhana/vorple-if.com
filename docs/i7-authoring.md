---
id: i7-authoring
title: Authoring with Vorple in Inform 7
---

As a practice task let's try the Vorple Notifications extension which lets us show information banners outside the actual story text. 

Start a new project and type the following:

```inform7
Include Vorple Notifications by Juhana Leinonen.
```

In addition to including the extensions we need, the custom Vorple interpreter must be specified. (This step is not necessary when [writing online with Borogove](borogove.html).)

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

The extensions contain more detailed instructions on how to use them, so for example if you wish to add pictures or sounds to the story, open the Vorple Multimedia extension and read its documentation.

Time to see how it looks like! If everything goes as planned, we should see our welcome message pop up in the top right corner of the web page when the game starts.

<img src="/img/borogove-go.png" alt="Go button in Borogove" class="float-right">
**Online version**: When [writing online with Borogove](borogove.html) we can just click on the "Go" button and see the result appear on the right side of the screen.

<img src="/img/release-button.png" alt="The release button in Inform IDE" class="float-right">
**Offline version**: If we were to now click on the "Go" button the story would be compiled and run inside the Inform IDE. The problem is that the IDE interpreter is of standard Glulx variety which doesn't support Vorple so we wouldn't see the notification there. Instead we have to click on the "Release" button to make the project generate a web page with the custom interpreter. 

After Inform has compiled and built the release package, follow the instructions given in the [local server installation instructions](localhost.md) and open the web address `http://localhost/Project Name.materials/Release/play.html` in a browser (where `Project Name.materials` is replaced with the materials folder's actual name). 

From now on after making changes to the Inform code we can just push the release button, switch to the browser and reload the page. 

A story compiled this way doesn't have debugging commands like ACTIONS or SHOWME available. To re-enable them, choose "Release for Testing" in the Release menu instead of pushing the "Release" button.

![Release - Release for Testing in the Inform IDE menu](/img/release-for-testing.png)



