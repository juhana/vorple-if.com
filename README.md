This is the web site for [Vorple](http://vorple-if.com).

The web site is built with [Jekyll](http://jekyllrb.com/). Quick build instructions:

```
gem install jekyll
jekyll build
```

The complete web site is generated to a directory called \_site.
 
After the web site is generated, deploy automatically with Grunt:

```
grunt deploy --host=user@example.com --dest=/remote/path
```

...where user@example.com is the username and host and /remote/path is the
path on the server where to upload the site.