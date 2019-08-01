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
element.editor({
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

# todo

## Full Screen Option
We might provide an option to toggle between viewport and screen. The problem with `viewport` is you might have a bootstrap layout with fixed static positioned navbar menu.
```js
element.editor({
	fullscreen: 'viewport' // viewport or screen
});
```

- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen

## Code Folding
- https://codemirror.net/demo/folding.html

## Flexbox Layout
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://css-tricks.com/snippets/css/complete-guide-grid/
- http://flexboxgrid.com/

## Workings of Monaco Editor For Comparison

- https://microsoft.github.io/monaco-editor/


