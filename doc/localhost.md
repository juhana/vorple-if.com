---
layout: default
title: Installing a local server for Vorple
desc: Instructions for installing a local server for Vorple development. 
permalink: /doc/localhost
---

Installing a local server for Vorple
====================================

To play the Vorple stories you've made, you'll need to either upload them to the
Internet or install a local server. Below are instructions for installing
the server on different operating systems.

Windows
-------

- Download Nginx from 
  [nginx.org/en/download.html](http://nginx.org/en/download.html). From that 
  page choose the Stable version. The link looks like "nginx/Windows-x.x.x"
  where "x.x.x" is the version number. When writing this the latest version was
  1.12.0 but new versions are released regularly.
  
  [![nginx download page]({{site.url}}/media/image/doc/nginx-download.png)](http://nginx.org/en/download.html)
- Unzip the package you just downloaded. Inside is a folder called "html". Put 
  the whole Inform 7 project and its materials folder there directly under the 
  html folder so you'll end up with `html/Project Name.inform` and 
  `html/Project Name.materials` folders (but with your project's name instead
  of "Project Name").
- Run nginx.exe which is also inside the zip. Nothing visible happens, but it 
  starts the local server. You can confirm by opening 
  [http://localhost](http://localhost) in a web browser (just typing "localhost"
  to the address bar should be enough) which should show a welcome message. 
  (The message says that further configuration is needed but for us the
  default configuration is good enough.) The server will keep running until you 
  reboot the computer, after which you'll have to run nginx.exe again.
- ![The release button]({{site.url}}/media/image/doc/release-button.png){: class="floatimg" }
  Build the Inform 7 project by clicking Release. Don't click on the "Browse" 
  buttons that Inform offers after releasing, they won't work.
- Open a browser, type 
  `http://localhost/Project Name.materials/Release/play.html` to the address bar 
  but replace "Project Name.materials" with the actual name of the materials 
  folder.


macOS
-----

- Open Terminal (Applications/Utilities/Terminal.app). You can find the Terminal
  app easily by opening the Spotlight search by pressing &#8984;-space or by 
  clicking on the magnifying glass icon in the top right corner of the screen,
  and searching for "terminal". The application's icon is a black screen with a
  white `>_` icon. This route is especially useful if you have a non-English
  operating system and the application and the folder it's in is called 
  something else (see the screenshot below).
  
  ![Finding the Terminal application in non-English spotlight search]({{site.url}}/media/image/doc/terminal-spotlight.png)
- Navigate to the Inform project's materials folder. The easiest way to do that
  is typing `cd` + one space character and dragging the 
  materials folder from Finder to the Terminal window to get the full path. The 
  command line should now read something like 
  `$ cd /home/myusername/path/to/project/My Project.materials` but with the
  materials folder's actual path (make sure that space after "cd" is there!) 
  Then press enter.
- Type `python -m SimpleHTTPServer` and press enter. You should see a message
  that says `Serving HTTP on 0.0.0.0 port 8000 ...` 
- Keep the Terminal window open. When you're done, press CTRL-C to stop the
  server. It'll show an error message when it shuts down, but that's normal.
- Release the project in Inform, open a web browser, and go to 
  [http://localhost:8000/Release/play.html](http://localhost:8000/Release/play.html)


Linux
-----

Same as macOS above, although the method for opening the terminal depends on
the Linux distribution and the windowing system. Googling for "open terminal in
X" where X is the name of the distribution should find plenty of information. 
The terminal might also be called "console", "shell" or "command line".

If the `python` command displays a "command not found" error, you need to 
install Python 2 with the distribution's package manager or alternatively try 
with Python 3:

     python3 -m http.server

{% include doc/footer.html %}
