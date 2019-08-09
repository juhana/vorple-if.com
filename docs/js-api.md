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
<a name="module_file"></a>

## file
This module is the access point to the virtual filesystem. 

The system uses BrowserFS to handle the virtual filesystem in browser's localstorage.
See https://jvilk.com/browserfs/2.0.0-beta/classes/_backend_localstorage_.localstoragefilesystem.html
for the full API. The getFS() method can be used to retrieve the filesystem object that can be used
to access the BrowserFS API directly.

All methods in this module use the synchronous versions of the filesystem methods
(readFileSync, writeFileSync etc.)


* [file](#module_file)
    * [.ASYNC_FS_ROOT](#module_file.ASYNC_FS_ROOT) : <code>string</code>
    * [.INFORM_PATH](#module_file.INFORM_PATH) : <code>string</code>
    * [.VORPLE_PATH](#module_file.VORPLE_PATH) : <code>string</code>
    * [.SAVEFILE_PATH](#module_file.SAVEFILE_PATH) : <code>string</code>
    * [.TRANSCRIPT_PATH](#module_file.TRANSCRIPT_PATH) : <code>string</code>
    * [.TMP_PATH](#module_file.TMP_PATH) : <code>string</code>
    * [.copy(source, target, [options])](#module_file.copy) ⇒ <code>boolean</code>
    * [.exists(filename, [options])](#module_file.exists) ⇒ <code>boolean</code>
    * [.getFS()](#module_file.getFS) ⇒ <code>object</code> \| <code>null</code>
    * [.info(filename, [options])](#module_file.info) ⇒ <code>object</code> \| <code>null</code>
    * [.informHeader(project, filename, [ready])](#module_file.informHeader) ⇒ <code>string</code>
    * [.init()](#module_file.init) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.isReady(filename, [options])](#module_file.isReady) ⇒ <code>boolean</code>
    * [.markReady(filename, [ready], [options])](#module_file.markReady) ⇒ <code>boolean</code>
    * [.mkdir(dirname, [options])](#module_file.mkdir) ⇒ <code>boolean</code>
    * [.move(source, target, [options])](#module_file.move) ⇒ <code>boolean</code>
    * [.path(filename, path)](#module_file.path)
    * [.read(filename, [options])](#module_file.read) ⇒ <code>string</code> \| <code>null</code>
    * [.readdir(dirname, [options])](#module_file.readdir) ⇒ <code>array</code> \| <code>null</code>
    * [.rmdir(dirname, [options])](#module_file.rmdir) ⇒ <code>boolean</code>
    * [.unlink(filename, [options])](#module_file.unlink) ⇒ <code>boolean</code>
    * [.write(filename, contents, [options])](#module_file.write) ⇒ <code>boolean</code>

<a name="module_file.ASYNC_FS_ROOT"></a>

### file.ASYNC\_FS\_ROOT : <code>string</code>
The directory root for the extended filesystem which has more space (IndexedDB)
and uses asynchronous access.

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.INFORM_PATH"></a>

### file.INFORM\_PATH : <code>string</code>
The directory where Inform reads author-provided files (not saves or transcripts).

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.VORPLE_PATH"></a>

### file.VORPLE\_PATH : <code>string</code>
The directory Vorple uses for its own files for communication between the interpreter and the game file.

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.SAVEFILE_PATH"></a>

### file.SAVEFILE\_PATH : <code>string</code>
Save file directory in the extended filesystem.

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.TRANSCRIPT_PATH"></a>

### file.TRANSCRIPT\_PATH : <code>string</code>
Transcripts directory in the extended filesystem.

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.TMP_PATH"></a>

### file.TMP\_PATH : <code>string</code>
The directory for temporary files. The temporary directory is emptied after leaving the page.

**Kind**: static constant of [<code>file</code>](#module_file)  
<a name="module_file.copy"></a>

### file.copy(source, target, [options]) ⇒ <code>boolean</code>
Copies a file.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True on success, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>source</td><td><code>*</code></td><td></td><td><p>File to copy</p>
</td>
    </tr><tr>
    <td>target</td><td><code>*</code></td><td></td><td><p>Target directory or the new name</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place. Applies to both source and target parameters.</p>
</td>
    </tr><tr>
    <td>[options.replace]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, any existing file of the same name will be replaced.
  If false, the operation will not continue if the file already exists.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.exists"></a>

### file.exists(filename, [options]) ⇒ <code>boolean</code>
Does a file or directory exist in the virtual filesystem?

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if the file/directory exists, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.getFS"></a>

### file.getFS() ⇒ <code>object</code> \| <code>null</code>
Returns the BrowserFS object for direct access to the BrowserFS API.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>object</code> \| <code>null</code> - The FS object or null if the filesystem hasn't been initialized yet  
<a name="module_file.info"></a>

### file.info(filename, [options]) ⇒ <code>object</code> \| <code>null</code>
Returns an object with information about a file or directory:

```
{
  contents: string | Array<string>,   // Contents of text file, or files inside the directory
  directory: string,                  // Parent directory
  header: null | {                    // Inform 7 header, or null if doesn't exist/apply
    project: string,                  // Project name in the header
    ready: boolean                    // File's ready status
  },
  name: string,                       // Base filename or directory name
  isDirectory: boolean,               // True if it's a directory, false if it's a normal file
  path: string                        // Full path to the file
}
```

Returns null if the file or directory doesn't exist.

**Kind**: static method of [<code>file</code>](#module_file)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.informHeader"></a>

### file.informHeader(project, filename, [ready]) ⇒ <code>string</code>
Creates a header for Inform 7 files. If the story is Inform 6, returns an empty string.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>string</code> - Inform 7 header or an empty string for Inform 6  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>project</td><td><code>string</code></td><td></td><td><p>Project&#39;s name</p>
</td>
    </tr><tr>
    <td>filename</td><td><code>string</code></td><td></td><td><p>Filename, path is automatically removed</p>
</td>
    </tr><tr>
    <td>[ready]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, the file is marked &quot;ready&quot; for Inform 7</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.init"></a>

### file.init() ⇒ <code>Promise.&lt;object&gt;</code>
Initialize the filesystem. This gets called automatically when calling
vorple.init() but it can be called manually before that to get access
to the filesystem earlier.

The method returns a promise that resolves into the BrowserJS filesystem
object, but after the promise has resolved all vorple.file.* are also
available.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that resolves to the filesystem object  
**Example**  
```js
async function getAccessToFS() {
  const fs = await vorple.file.init();
  
  // fs is now the BrowserFS filesystem object (what you'd get from vorple.file.getFS())
  // also all vorple.file.* methods are now available
  vorple.file.write("info.txt", "Filesystem is now available");
}
```
<a name="module_file.isReady"></a>

### file.isReady(filename, [options]) ⇒ <code>boolean</code>
Check if a file has been marked ready for Inform 7 to read.

If the file doesn't exist, it doesn't have a header, or it can't be read,
the method returns false. Error conditions must be checked manually if
it's important to make a difference between invalid operation and a file
that has been marked not ready.

This method always returns false on Inform 6.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if file is ready, false on error or not ready  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.markReady"></a>

### file.markReady(filename, [ready], [options]) ⇒ <code>boolean</code>
Marks a file ready to read (or not ready to read) for Inform 7.
This is equivalent of the phrases "mark (external file) as ready to read"
and "mark (external file) as not ready to read" in Inform 7.

If the file doesn't have an Inform 7 header the method does nothing and returns false.

In Inform 6 this method does nothing and always returns false.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if operation was successful, false otherwise.
 Returns true even if no change was made to the file (was already marked ready.)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[ready]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, marks the file ready. Otherwise marks the file not ready.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.mkdir"></a>

### file.mkdir(dirname, [options]) ⇒ <code>boolean</code>
Create a new directory in the virtual filesystem. 

This does not create missing subdirectories, e.g. mkdir( 'foo/bar' ) won't work
if directory 'foo' doesn't exist.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if directory was created, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>dirname</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.move"></a>

### file.move(source, target, [options]) ⇒ <code>boolean</code>
Moves a file or directory to another directory.
If the target doesn't exist, the file or directory is renamed.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True on success, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>source</td><td><code>*</code></td><td></td><td><p>File/directory to move</p>
</td>
    </tr><tr>
    <td>target</td><td><code>*</code></td><td></td><td><p>Target directory or the new name</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place. Applies to both source and target parameters.</p>
</td>
    </tr><tr>
    <td>[options.replace]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, any existing file of the same name will be replaced.
  If false, the operation will not continue if the file already exists.
  This option is ignored if the source is a directory (a directory will never overwrite a file.)</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.path"></a>

### file.path(filename, path)
Adds a path to a given filename.
See https://nodejs.org/api/path.html#path_path_resolve_paths
for rules on how path joining works.

The default root directory is /inform so
`vorple.file.path( "foo.txt", "bar" )` will resolve to
`/inform/bar/foo.txt`.

**Kind**: static method of [<code>file</code>](#module_file)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td>
    </tr><tr>
    <td>path</td><td><code>string</code></td>
    </tr>  </tbody>
</table>

**Example**  
```js
vorple.file.path( "foo.txt" );                   // --> /inform/foo.txt
vorple.file.path( "foo.txt", "bar" );            // --> /inform/bar/foo.txt
vorple.file.path( "foo.txt", "/bar" );           // --> /bar/foo.txt
vorple.file.path( "../foo.txt", "/bar/xyz" );    // --> /bar/foo.txt
vorple.file.path( "foo.txt", "/" );              // --> /foo.txt
vorple.file.path( "/foo.txt", "/bar/xyz" );      // --> /foo.txt
```
<a name="module_file.read"></a>

### file.read(filename, [options]) ⇒ <code>string</code> \| <code>null</code>
Read a text file from the virtual filesystem

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>string</code> \| <code>null</code> - The contents of the file, or null file could not be read  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.binary]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Is it a binary file?</p>
</td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr><tr>
    <td>[options.header]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, return value contains the Inform 7 header if present. Otherwise the header is not included in the return value.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.readdir"></a>

### file.readdir(dirname, [options]) ⇒ <code>array</code> \| <code>null</code>
Returns the contents of a directory. Returns null if the directory doesn't exist
or the directory is actually a file.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>array</code> \| <code>null</code> - The list of files in the directory, or null on error  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>dirname</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.rmdir"></a>

### file.rmdir(dirname, [options]) ⇒ <code>boolean</code>
Remove a directory from the virtual filesystem. Directory must be empty.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if directory was removed, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>dirname</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.unlink"></a>

### file.unlink(filename, [options]) ⇒ <code>boolean</code>
Unlink (i.e. delete) a file from the virtual filesystem.
Use rmdir() to remove directories.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True if file was removed, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_file.write"></a>

### file.write(filename, contents, [options]) ⇒ <code>boolean</code>
Write a file to the virtual filesystem.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>boolean</code> - True on success, false otherwise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>filename</td><td><code>string</code></td><td></td><td></td>
    </tr><tr>
    <td>contents</td><td><code>string</code> | <code>array</code></td><td></td><td><p>Contents of what to write to the file, either a string or a byte array</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td></td>
    </tr><tr>
    <td>[options.append]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, contents are appended to the file, otherwise the file is overwritten with the new content</p>
</td>
    </tr><tr>
    <td>[options.binary]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true, writes a binary file instead of a text file</p>
</td>
    </tr><tr>
    <td>[options.cwd]</td><td><code>string</code></td><td><code>&quot;/inform&quot;</code></td><td><p>The directory where the operation takes place</p>
</td>
    </tr><tr>
    <td>[options.header]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, an Inform 7 header is added to the start of the file. On Inform 6 this option does nothing.</p>
</td>
    </tr><tr>
    <td>[options.project]</td><td><code>string</code></td><td><code>&quot;VORPLE&quot;</code></td><td><p>The project name that&#39;s used in the Inform 7 header.
 Does nothing on Inform 6 or if <code>options.header</code> is false.</p>
</td>
    </tr><tr>
    <td>[options.ready]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, the header gets a &quot;ready&quot; mark (<code>*</code>) to signal Inform 7 that the file can be read.
 Otherwise the header is marked not ready (<code>-</code>).
 Does nothing on Inform 6 or if <code>options.header</code> is false.</p>
</td>
    </tr>  </tbody>
</table>


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
        * [.queueKeypress(key)](#module_prompt.queueKeypress)
        * [.setPrefix(prefix, [html])](#module_prompt.setPrefix) ⇒ <code>string</code>
        * [.setValue(value)](#module_prompt.setValue)
        * [.submit([silent])](#module_prompt.submit)
        * [.unhide()](#module_prompt.unhide)
    * _inner_
        * [~runCommandQueue()](#module_prompt..runCommandQueue)
        * [~runKeyQueue()](#module_prompt..runKeyQueue)

<a name="module_prompt.hide"></a>

### prompt.hide()
Manually hide the prompt. It won't be shown until unhide() is called.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<a name="module_prompt.init"></a>

### prompt.init()
Hook into Haven's input listeners

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

<a name="module_prompt.queueKeypress"></a>

### prompt.queueKeypress(key)
Add a keypress to the command queue. If the engine is waiting for a keypress,
send it immediately.

**Kind**: static method of [<code>prompt</code>](#module_prompt)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>string</code></td><td><p>A one-character string containing the pressed character</p>
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
<a name="module_prompt..runKeyQueue"></a>

### prompt~runKeyQueue()
If there is a keypress waiting in the queue, send it to the parser.
The key is then removed from the queue.

**Kind**: inner method of [<code>prompt</code>](#module_prompt)  

<hr>
<a name="module_vorple"></a>

## vorple

* [vorple](#module_vorple)
    * [.addEventListener(eventNames, listener)](#module_vorple.addEventListener) ⇒ <code>function</code>
    * [.evaluate(filename)](#module_vorple.evaluate)
    * [.getInformVersion()](#module_vorple.getInformVersion) ⇒ <code>number</code> \| <code>undefined</code>
    * [.init()](#module_vorple.init)
    * [.removeEventListener([eventNames], listener)](#module_vorple.removeEventListener) ⇒ <code>boolean</code>
    * [.requireVersion(requiredVersion, [callback])](#module_vorple.requireVersion) ⇒ <code>boolean</code>

<a name="module_vorple.addEventListener"></a>

### vorple.addEventListener(eventNames, listener) ⇒ <code>function</code>
Registers a listener for an event. See "Filters and event listeners" in the documentation for details.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
**Returns**: <code>function</code> - A function that can be called to remove the events  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventNames</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>The event name or an array of event names where to add the listener</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code></td><td><p>The listener to register</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_vorple.evaluate"></a>

### vorple.evaluate(filename)
Evaluates JavaScript code and writes the return value and its type to the
virtual filesystem for the story file to read.

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

<a name="module_vorple.getInformVersion"></a>

### vorple.getInformVersion() ⇒ <code>number</code> \| <code>undefined</code>
Returns the Inform version, detected at handshake.
Before the handshake the value is undefined.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
**Returns**: <code>number</code> \| <code>undefined</code> - 6 or 7  
<a name="module_vorple.init"></a>

### vorple.init()
Initializes and starts Vorple.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
<a name="module_vorple.removeEventListener"></a>

### vorple.removeEventListener([eventNames], listener) ⇒ <code>boolean</code>
Removes a registered event listener.

**Kind**: static method of [<code>vorple</code>](#module_vorple)  
**Returns**: <code>boolean</code> - True if the listener was removed from at least one event  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[eventNames]</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>The event name or an array of event names from where to remove the listener.
Leaving this parameter out completely (i.e. passing the listener function as the first and only parameter)
removes the listener from all events where it&#39;s been registered.</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code></td><td><p>The listener to remove</p>
</td>
    </tr>  </tbody>
</table>

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

