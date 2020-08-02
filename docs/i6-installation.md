---
id: i6-installation
title: Installing Vorple for Inform 6
---

> These instructions apply when you have Vorple installed locally on your own computer. They are not necessary when [writing online with Borogove](borogove.html) — you can skip this article and go directly to [Authoring with Vorple in Inform 6](i6-authoring.html).

First [install a local server following these instructions](localhost.html). If you then [download the extensions package](/download) and unzip it, you can use it as a base to build your project, or copy the extensions (.h files) to an existing project. See the [authoring with Vorple in Inform 6](i6-authoring.html) article for details on how to use them.

After compiling the project with Inform you should have a .ulx file. If you run it in a standard interpreter, it likely won't support Vorple — but it won't crash, and your game will still be playable. However, we have a web interpreter that will run the Vorple effects correctly!

In the [download package](/download) there is a file called "play.html". If you edit the file you should see a line that looks like like
 
```js
// URL to the game file
story: "test.ulx"
```

Just replace "test.ulx" with the name of your story file. While the [local server is running](localhost.html), open a web browser and go to `http://localhost/play.html` (Windows with nginx) or `http://localhost:8000/play.html` (Mac/Linux with Python) to play the game.