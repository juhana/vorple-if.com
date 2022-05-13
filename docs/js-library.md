---
id: js-library
title: Using Vorple in a JavaScript project
---

Vorple can also be used as a library and included in a larger JavaScript project.


## Installation

Install the package from npm:

```
npm install vorple
```

(or `yarn add vorple`)

After installing the package, its JavaScript file needs to be included from the node_modules directory.

```html
<script src="./node_modules/vorple/web/interpreter/vorple.min.js"></script>
```

The CSS file that sets the interpreter styles can be included from the `lib/css` directory:

```html
<link rel="stylesheet" type="text/css" href="./node_modules/vorple/lib/css/vorple.css">
```

Most frameworks and packagers (e.g. Webpack) can import the files directly instead:

```javascript
import vorple from "vorple";
import "vorple/lib/css/vorple.css";
```

Specific Vorple modules can be imported separately:

```javascript
import { audio, prompt } from "vorple";
```

## Starting the game

First set the `vorple.options` object:

```javascript
vorple.options = {
    // URL to the game file
    story: "test.ulx",

    // Container for the interpreter
    container: "#vorple",

    // Use a proxy?
    use_proxy: "auto",

    // Proxy URL
    proxy_url: "http://example.com/proxy?url=%s"
};
```

All values are optional. Available options:

* `story` – URL to the story file. If the URL isn't specified here, it must be passed in the GET parameters (`http://example.com/?story=test.ulx`).
* `container` – The HTML element where the interpreter is placed. It can be a DOM element or a selector as a string (e.g. `"#vorple"`). The element must exist in the DOM at the time when `vorple.init()` is called. If left out, defaults to the element with the id `vorple`. If that element doesn't exist, the interpreter is placed at the end of the page.
* `use_proxy` – Should a proxy be used to fetch the story file? Value can be `true`, `false` or `"auto"` (defaults to `"auto"`). The value `"auto"` means that a proxy is used only if the story file is in a different domain than the interpreter. The proxy is meant to get around [CORS restrictions](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
* `proxy_url` – The URL for the proxy. The default is the Parchment proxy at `https://zcode.appspot.com/proxy/?encode=base64&callback=processBase64Zcode&url=%s`. The `%s` part will be replaced with the story file URL.

After setting the options, start the game by calling `vorple.init()`.

```javascript
vorple.options = { story: "test.ulx" };
vorple.init();
```

## Loading spinner

The full structure of the initial HTML is this:

```html
<main id="vorple">
    <div id="loader">
        <h2 id="loader-message">
            Loading scripts
        </h2>
        <div id="spinner">
            .
        </div>
    </div>
</main>
```

If any of the elements don't already exist, they are automatically created with the above contents.

The "." character in the spinner element has a rotating animation while the files load and can be changed by editing the HTML and/or CSS. In the Inform templates it's a "V" character.

## Global variables

Contrary to most npm packages, Vorple "forces" variables to become global because Inform need to access them when evaluating JavaScript from inside the story file. The variables that are exposed to global scope are `vorple`, `$`/`jQuery`, `toastr` (the notification library) and `vex` (the modal library).

Remember that any other JavaScript variables that we need to access from inside Inform need to be placed to global scope as well (`window.myVariable = ...`)

## Examples

### No framework

```html
<!doctype html>
<html>
<head>
    <title>Vorple</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="./node_modules/vorple/lib/css/haven.css">
    <link rel="stylesheet" type="text/css" href="./node_modules/vorple/lib/css/vorple.css">
</head>
<body>

<main id="vorple">
    <div id="loader">
        <h2 id="loader-message">Loading scripts</h2>
        <div id="spinner">V</div>
    </div>
</main>

<script src="./node_modules/vorple/web/interpreter/vorple.min.js"></script>
<script>
    vorple.options = {
        // URL to the game file
        story: "test.ulx",

        // Container for the interpreter
        container: "#vorple"
    };
    vorple.init();
</script>
</body>
</html>
```


### React project

```javascript
import React, { useEffect, useRef } from 'react';
import vorple from "vorple";

import "vorple/lib/css/vorple.css";

function App() {
    // Reference to the element we use as the interpreter container
    const containerRef = useRef(null);
  
    useEffect(() => {
        if( containerRef ) {
            vorple.options = {
                // URL to the game file
                story: "test.ulx",

                // Container for the interpreter
                container: containerRef.current
            };
            vorple.init();
        }
    }, [ containerRef ]);

    return (
        <div ref={containerRef} />
    );
}

export default App;
```

If the project has been initialized with [create-react-app](https://github.com/facebook/create-react-app) the story file can be placed in the `public` folder. Note that Vorple uses a HTML interpreter so it won't work in a React Native app (unless running in a WebView container.)