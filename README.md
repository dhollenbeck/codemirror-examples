# codemirror-examples
Example codemirror in textarea supporting html and css linting and auto resize in a bootstrap template.

- Demo: https://dhollenbeck.github.io/codemirror-examples/

# Install

```bash
npm install codemirror-examples --save-dev
```

Then include the js and css in your web app.

## Auto Resize
Auto resize is great for editing of small content. However, it becomes painful for large content. There should be a method to toggle this feature. Auto resize is enabled by default. You can set an explict editor height by:

```
var editor = hbs.editor({
	height: '300'
});
```

## Full Screen

All demos support fullscreen mode. This mode is really full viewport. After you click inside the editor keypress:

- F11 - toggles full viewport
- ESC - exits full viewport

For editors with toolbars wrap the editor with div:
```html
<div class="fullscreen-wrapper">
	<!-- start of mega menu -->
	<!-- textarea here -->
</div>
```

# Workflow

```bash
grunt build
```
