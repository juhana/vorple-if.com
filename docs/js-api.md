<a name="module_audio"></a>

## audio

* [audio](#module_audio)
    * [.defaults](#module_audio.defaults) : <code>Object</code>
    * [.clearPlaylist()](#module_audio.clearPlaylist)
    * [.currentMusicPlaying()](#module_audio.currentMusicPlaying) ⇒ <code>string</code> \| <code>null</code>
    * [.fadeOut(element, [duration], [callback])](#module_audio.fadeOut) ⇒ <code>boolean</code>
    * [.isAudioPlaying()](#module_audio.isAudioPlaying) ⇒ <code>boolean</code>
    * [.isEffectPlaying()](#module_audio.isEffectPlaying) ⇒ <code>boolean</code>
    * [.isElementPlaying(audioElement)](#module_audio.isElementPlaying) ⇒ <code>boolean</code>
    * [.isMusicPlaying()](#module_audio.isMusicPlaying) ⇒ <code>boolean</code>
    * [.playMusic(url, [options])](#module_audio.playMusic)
    * [.playSound(url, [options])](#module_audio.playSound)
    * [.setPlaylist(list, [options])](#module_audio.setPlaylist)
    * [.stopMusic([fadeoutDuration])](#module_audio.stopMusic)

<a name="module_audio.defaults"></a>

### audio.defaults : <code>Object</code>
Default values for durations.

**Kind**: static constant of [<code>audio</code>](#module_audio)  
<a name="module_audio.clearPlaylist"></a>

### audio.clearPlaylist()
Clears the playlist and the music queue. Does not stop music that's
currently playing.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<a name="module_audio.currentMusicPlaying"></a>

### audio.currentMusicPlaying() ⇒ <code>string</code> \| <code>null</code>
Gets the name of the currently playing music file, or null if nothing
is playing. If music has been asked to stop, returns the
music that will play next.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<a name="module_audio.fadeOut"></a>

### audio.fadeOut(element, [duration], [callback]) ⇒ <code>boolean</code>
Fades out sound.

**Kind**: static method of [<code>audio</code>](#module_audio)  
**Returns**: <code>boolean</code> - False if the element doesn't exist or is not an audio
     element, true otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>element</td><td><code>string</code> | <code>object</code></td><td></td><td><p>The audio element that should fade out</p>
</td>
    </tr><tr>
    <td>[duration]</td><td><code>number</code></td><td><code>1000</code></td><td><p>The duration of the fade in milliseconds,
     default 1000 ms (1 second) or the value set in
     vorple.defaults.fadeDuration. Note that the duration is calculated from
     100% volume, even if the current volume of the sound is less than that.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td></td><td><p>Function that is called when the audio has
     stopped completely with a boolean as the first parameter that matches
     what this function returned</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_audio.isAudioPlaying"></a>

### audio.isAudioPlaying() ⇒ <code>boolean</code>
Checks if any audio is playing. Note that sound that is being loaded or
has received a play command but isn't playing for some other reason
isn't considered as playing, even though it's about to start.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<a name="module_audio.isEffectPlaying"></a>

### audio.isEffectPlaying() ⇒ <code>boolean</code>
Checks if any sound effect is playing.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<a name="module_audio.isElementPlaying"></a>

### audio.isElementPlaying(audioElement) ⇒ <code>boolean</code>
Checks if an audio element is playing.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>audioElement</td><td><code>string</code> | <code>object</code></td><td><p>DOM element, jQuery object or jQuery
     selector of the audio element</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_audio.isMusicPlaying"></a>

### audio.isMusicPlaying() ⇒ <code>boolean</code>
Checks if music is playing. Returns true if music is actually playing
and it isn't fading out at the moment.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<a name="module_audio.playMusic"></a>

### audio.playMusic(url, [options])
Starts playing music. If the same music file is already playing, does nothing
except sets the looping property. If another music file is playing,
fades out the old one before playing the new one.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>url</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.looping]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the track keeps repeating</p>
</td>
    </tr><tr>
    <td>[options.restart]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, always starts playing from
  the start, even when this track is already playing</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_audio.playSound"></a>

### audio.playSound(url, [options])
Starts playing a sound effect.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>url</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.looping]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the sound effect keeps repeating</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_audio.setPlaylist"></a>

### audio.setPlaylist(list, [options])
Sets a playlist and starts playing it.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>list</td><td><code>Array.&lt;string&gt;</code></td><td></td><td><p>An array of music file URLs</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.looping]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the playlist starts playing again
     from the start when it ends</p>
</td>
    </tr><tr>
    <td>[options.restart]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, always play from the start even
     when a track in the playlist is already playing</p>
</td>
    </tr><tr>
    <td>[options.shuffle]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, shuffles the playlist in random
     order before playing it</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_audio.stopMusic"></a>

### audio.stopMusic([fadeoutDuration])
Stops playing music. Clears the music queue and the playlist.

**Kind**: static method of [<code>audio</code>](#module_audio)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[fadeoutDuration]</td><td><code>number</code></td><td><code>1000</code></td><td><p>The duration of the fadeout. Set to 0
     to stop immediately.</p>
</td>
    </tr>  </tbody>
</table>


<hr>
<a name="module_debug"></a>

## debug

* [debug](#module_debug)
    * [.error(text)](#module_debug.error) ⇒ <code>boolean</code>
    * [.log(text)](#module_debug.log) ⇒ <code>boolean</code>
    * [.off()](#module_debug.off) ⇒ <code>boolean</code>
    * [.on()](#module_debug.on) ⇒ <code>boolean</code>
    * [.status()](#module_debug.status) ⇒ <code>boolean</code>
    * [.toggle()](#module_debug.toggle) ⇒ <code>boolean</code>

<a name="module_debug.error"></a>

### debug.error(text) ⇒ <code>boolean</code>
Show an error in the console and on the screen.

**Kind**: static method of [<code>debug</code>](#module_debug)  
**Returns**: <code>boolean</code> - Always returns true, for consistency with log()  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>text</td><td><code>string</code></td><td><p>Error message</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_debug.log"></a>

### debug.log(text) ⇒ <code>boolean</code>
Print a logging message to console and on the screen if debugging mode is on.

**Kind**: static method of [<code>debug</code>](#module_debug)  
**Returns**: <code>boolean</code> - True if a debugging message was printed, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>text</td><td><code>string</code></td><td><p>Text to log</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_debug.off"></a>

### debug.off() ⇒ <code>boolean</code>
Set the debugging status off.

**Kind**: static method of [<code>debug</code>](#module_debug)  
**Returns**: <code>boolean</code> - the new status (always false)  
<a name="module_debug.on"></a>

### debug.on() ⇒ <code>boolean</code>
Set the debugging status on.

**Kind**: static method of [<code>debug</code>](#module_debug)  
**Returns**: <code>boolean</code> - the new status (always true)  
<a name="module_debug.status"></a>

### debug.status() ⇒ <code>boolean</code>
Returns the current state of the debugging flag.

**Kind**: static method of [<code>debug</code>](#module_debug)  
<a name="module_debug.toggle"></a>

### debug.toggle() ⇒ <code>boolean</code>
Set or unset the the debugging flag.

**Kind**: static method of [<code>debug</code>](#module_debug)  
**Returns**: <code>boolean</code> - The new status of the debugging flag.  

<hr>
<a name="module_layout"></a>

## layout

* [layout](#module_layout)
    * [.block()](#module_layout.block)
    * [.closeTag([targetWindow])](#module_layout.closeTag) ⇒ <code>boolean</code>
    * [.focus(targetElement, [targetWindow])](#module_layout.focus) ⇒ <code>boolean</code>
    * [.openTag(tagName, classes, [targetWindow])](#module_layout.openTag) ⇒ <code>boolean</code>
    * [.scrollTo(target)](#module_layout.scrollTo) ⇒ <code>boolean</code>
    * [.scrollToEnd()](#module_layout.scrollToEnd)
    * [.unblock()](#module_layout.unblock)

<a name="module_layout.block"></a>

### layout.block()
Blocks the UI so that the user can't type anything or click any elements.

Use layout.unblock to remove the block.

**Kind**: static method of [<code>layout</code>](#module_layout)  
<a name="module_layout.closeTag"></a>

### layout.closeTag([targetWindow]) ⇒ <code>boolean</code>
Close a tag that is currently open.

Because the tags are added as DOM elements, the tag isn't really "open"
in the sense that it would be missing the closing tag. Instead we jump
out of the tag and set output focus back to its parent element.

**Kind**: static method of [<code>layout</code>](#module_layout)  
**Returns**: <code>boolean</code> - True if a tag was open, false if we were already
 at the top window level and nothing was done  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[targetWindow]</td><td><code>number</code></td><td><code>0</code></td>
    </tr>  </tbody>
</table>

<a name="module_layout.focus"></a>

### layout.focus(targetElement, [targetWindow]) ⇒ <code>boolean</code>
Set output focus to an element.

**Kind**: static method of [<code>layout</code>](#module_layout)  
**Returns**: <code>boolean</code> - True if the focus was set successfully, false if the
  element wasn't found  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>targetElement</td><td><code>string</code> | <code>object</code></td><td></td>
    </tr><tr>
    <td>[targetWindow]</td><td><code>number</code></td><td><code>0</code></td>
    </tr>  </tbody>
</table>

<a name="module_layout.openTag"></a>

### layout.openTag(tagName, classes, [targetWindow]) ⇒ <code>boolean</code>
Create a new HTML element, append it to the target window, and set the output
focus to the element.

Example:
 layout.openTag( 'div', 'vorple', 0 )  -->  <div class="vorple"></div>

**Kind**: static method of [<code>layout</code>](#module_layout)  
**Returns**: <code>boolean</code> - True  
**See**: layout.closeTag  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>tagName</td><td><code>string</code></td><td></td><td><p>Name of the tag to create</p>
</td>
    </tr><tr>
    <td>classes</td><td><code>string</code></td><td></td><td><p>Class names to add to the element</p>
</td>
    </tr><tr>
    <td>[targetWindow]</td><td><code>number</code></td><td><code>0</code></td><td><p>The number of the target window</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_layout.scrollTo"></a>

### layout.scrollTo(target) ⇒ <code>boolean</code>
Scroll an element into view. Scrolling is initiated only if the element
isn't already fully in view or its top position is not in the top
half of the page.

If the element doesn't exist, the function doesn't do anything.

**Kind**: static method of [<code>layout</code>](#module_layout)  
**Returns**: <code>boolean</code> - True if scrolling was needed, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>target</td><td><code>string</code> | <code>object</code></td><td><p>The target element</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_layout.scrollToEnd"></a>

### layout.scrollToEnd()
Scroll to the end of the document.

**Kind**: static method of [<code>layout</code>](#module_layout)  
<a name="module_layout.unblock"></a>

### layout.unblock()
Unblock the UI.

**Kind**: static method of [<code>layout</code>](#module_layout)  
**See**: layout.block  

<hr>
<a name="module_prompt"></a>

## prompt

* [prompt](#module_prompt)
    * _static_
        * [.hide()](#module_prompt.hide)
        * [.init()](#module_prompt.init)
        * [.queueCommand(cmd, [silent])](#module_prompt.queueCommand)
        * [.setPrefix(prefix, [html])](#module_prompt.setPrefix) ⇒ <code>string</code>
        * [.setValue(value)](#module_prompt.setValue)
        * [.submit([silent])](#module_prompt.submit)
        * [.unhide()](#module_prompt.unhide)
    * _inner_
        * [~runCommandQueue()](#module_prompt..runCommandQueue)

<a name="module_prompt.hide"></a>

### prompt.hide()
Manually hide the prompt. It won't be shown until unhide() is called.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<a name="module_prompt.init"></a>

### prompt.init()
Hook into the lineinput's ready event for passing commands from the queue.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<a name="module_prompt.queueCommand"></a>

### prompt.queueCommand(cmd, [silent])
Add a command to the command queue. If the line input is ready, execute
the command immediately.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>cmd</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the command isn&#39;t shown on the
     screen. The result of the command will still print normally.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_prompt.setPrefix"></a>

### prompt.setPrefix(prefix, [html]) ⇒ <code>string</code>
Set the prefix of the command prompt. The prefix is usually a greater-than
character (>) at the start of the command prompt.

The currently active command prompt is changed, and the new prefix is used
for all future command prompts until changed again.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
**Returns**: <code>string</code> - The new prefix.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>prefix</td><td></td><td></td><td></td>
    </tr><tr>
    <td>[html]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the prefix is inserted into the DOM
  as HTML. Otherwise HTML is escaped and shown as-is.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_prompt.setValue"></a>

### prompt.setValue(value)
Set the lineinput's value.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>value</td>
    </tr>  </tbody>
</table>

<a name="module_prompt.submit"></a>

### prompt.submit([silent])
Trigger the submit event of the lineinput.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[silent]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, the command isn&#39;t shown on the
     screen. The result of the command will still print normally.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_prompt.unhide"></a>

### prompt.unhide()
Remove manual hiding of the prompt. It's called rather clumsily "unhide"
instead of "show" to stress that it only undoes what the hide() method did,
and it doesn't force the prompt to appear if it has been hidden or removed
by some other means.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<a name="module_prompt..runCommandQueue"></a>

### prompt~runCommandQueue()
If there is a command waiting in the queue, submit it to the parser.
The command is then removed from the queue.

**Kind**: inner method of [<code>prompt</code>](#module_prompt)  

<hr>
<a name="module_vorple"></a>

## vorple

* [vorple](#module_vorple)
    * [.fileClosed(filename)](#module_vorple.fileClosed)
        * [~safe_stringify()](#module_vorple.fileClosed..safe_stringify)
    * [.init()](#module_vorple.init)
    * [.requireVersion(requiredVersion, [callback])](#module_vorple.requireVersion) ⇒ <code>boolean</code>

<a name="module_vorple.fileClosed"></a>

### vorple.fileClosed(filename)
The story file has closed a file. If it's a handshake file, initiate
handshake. If it's the eval file, evaluate the JavaScript it contains.

This method is called by the interpreter engine and is unlikely to be useful
for other purposes.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td>
    </tr>  </tbody>
</table>

<a name="module_vorple.fileClosed..safe_stringify"></a>

#### fileClosed~safe\_stringify()
Stringify a value, or return null if the value can't be stringified

**Kind**: inner method of [<code>fileClosed</code>](#module_vorple.fileClosed)  
<a name="module_vorple.init"></a>

### vorple.init()
Initializes and starts Vorple.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
<a name="module_vorple.requireVersion"></a>

### vorple.requireVersion(requiredVersion, [callback]) ⇒ <code>boolean</code>
Require a minimum version of Vorple. Minor updates are accepted if
they're not specified in the request. In other words, if version "3.1"
is requested, then any Vorple version below 3.2 (3.1, 3.1.1, 3.1.2 etc)
will pass. If version "3" is requested, every version 3.x.x will pass.

If an optional callback is passed to the function, it will be run with
one boolean parameter: true if version matches, false otherwise.
Otherwise an error is thrown if the version doesn't match.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
**Returns**: <code>boolean</code> - True if version matches  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>requiredVersion</td><td><code>string</code></td><td><p>The minimum version of Vorple that&#39;s required.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code>function</code></td><td><p>A custom callback</p>
</td>
    </tr>  </tbody>
</table>

