# codemirror-examples
Example codemirror in textarea supporting html and css linting and auto resize in a bootstrap template.

- Demo: https://dhollenbeck.github.io/codemirror-examples/

# Install

```bash
npm install codemirror-examples --save-dev
```

Then include the js and css in your web app.

# Workflow

```bash
grunt build
```

# Todo

## Auto Resize
Auto resize is great for editing of small content. However, it becomes painful for large content. There should be a method to toggle this feature.

## Full screen or Full Viewport
- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen

## Full Viewport
What code mirror does for full viewport:
- `<html>` tag set with `style="overflow: hidden;"`
- CodeMirror element
	- Add class `CodeMirror-fullscreen` to codemirror element
	- Set style `height:100%;` from `height:auto;`

```css
.CodeMirror-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    z-index: 9;
}
```