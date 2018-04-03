# Engineering Notes regarding Async Linting

From the code manual:

> Defines an interface component for showing linting warnings, with pluggable warning sources (see html-lint.js, json-lint.js, javascript-lint.js, coffeescript-lint.js, and css-lint.js in the same directory). Defines a lint option that can be set to an annotation source (for example CodeMirror.lint.javascript), to an options object (in which case the getAnnotations field is used as annotation source), or simply to true. When no annotation source is specified, getHelper with type "lint" is used to find an annotation function. An annotation source function should, when given a document string, an options object, and an editor instance, return an array of {message, severity, from, to} objects representing problems. When the function has an async property with a truthy value, it will be called with an additional second argument, which is a callback to pass the array to. The linting function can also return a promise, in that case the linter will only be executed when the promise resolves. By default, the linter will run (debounced) whenever the document is changed. You can pass a lintOnChange: false option to disable that. Depends on addon/lint/lint.css.

The CodeMirror source starts the linting with the `startLinting` method:

```js
  function startLinting(cm) {
  var state = cm.state.lint;
  var options = state.options;
  var passOptions = options.options || options;
  var firstLine = CodeMirror.Pos(0, 0);

  // get linter from either:
  // 1. options.getAnnotations = function() {}
  // 2. plugable linter as determined from the first line of template
    var getAnnotations = options.getAnnotations || cm.getHelper(firstLine, "lint");

    // if linter not found quit
    if (!getAnnotations) return;

    // use async if option.async is true or linter is a promise
    if (options.async || getAnnotations.async) {
      lintAsync(cm, getAnnotations, passOptions)
    } else {
      updateLinting(cm, getAnnotations(cm.getValue(), passOptions, cm));
    }
  }
```

The CodeMirror source code for async linting:

```js
  function lintAsync(cm, getAnnotations, passOptions) {
    var state = cm.state.lint;
    var id = ++state.waitingFor;
    var html = cm.getValue();
    function abort() {...}
    cm.on("change", abort);

    // call the async linter method. Pass in the following arguments:
    // 1. html
    // 2. callback
    // 3. cm.options
    // 4. cd instance
    getAnnotations(html, function(annotations, arg2) {
      cm.off("change", abort)
      if (state.waitingFor != id) return
      if (arg2 && annotations instanceof CodeMirror) annotations = arg2
      updateLinting(cm, annotations)
    }, passOptions, cm);
  }
```

Therefore, there are three options to enable for async linting:
- set cm.options.async = true
- make the linter method a promise
- set the linter method.async to true

In all cases the async linter needs the following arguments:
- html string
- callbaack
- options
- cm instance