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

```js
element.editor({
	height: '300px' // auto, or pixels
});
```

## Full Screen

All demos support fullscreen mode. This mode is really full viewport. After you click inside the editor keypress:

- F11 - toggles full viewport
- ESC - exits full viewport

For editors with toolbars wrap the editor with div:
```html
<div class="cm-fullscreen-container">
	<!-- start of mega menu -->
	<!-- textarea here -->
</div>
```

The `<div>` which is expanded to full viewport is determined by:
- The outer closest div  (`<div class="cm-fullscreen-container">`) to the codemirror div, if not found
- The code mirror wrapper instance (`<div class="codemirror">`).

## Flexbox Layout: Toolbars, Footers, Flexbox and Fullscreen

You can add Bootstrap navbars (toobars) and footers to codemirror. The HTML flexbox layout is:
```hbs
<div class="cm-fullscreen-container cm-flex-container">
	<div class="cm-toolbar cm-flex-child-fixed">
		{{! your bootstrap navbar}}
	</div>
	<div class="cm-body cm-flex-child-grow">
		{{! your textarea for codemirror}}
	</div>
	<div class="cm-footer cm-flex-child-fixed">
		{{! your footer navbar}}
	</div>
</div>
```

The css is shown below and is included in the examples:
```css
.cm-flex-container {display:flex; display: flex;flex-direction: column;height: 100%;}
.cm-flex-child-fixed {flex: none;}
.cm-flex-child-grow {flex: auto; overflow-y:hidden;}
```

Useful resources for flexbox include:
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://css-tricks.com/snippets/css/complete-guide-grid/
- http://flexboxgrid.com/

## Auto-Sizing Limit

There should be option to limit the size of the editor in auto-scrolling.

## Todo: Code Folding
- https://codemirror.net/demo/folding.html

## Todo: Drag Resizing
- https://github.com/codemirror/CodeMirror/issues/850
- https://interactjs.io/

## Todo: Improve fullscreen
- **Support window scroll on exit:** Be the user presses the fullscreen mode the browser window might be scrolled. This scrolled state should be restore upon existing fullscreen.
- **Support codemirror scroll on enter:** Before the user presses fullscreen mode the editor might be too large for fullscreen. In this case the editor will scroll. The cursor can be below the fold.

## Todo: Better working example of footer.
- Show percent changed.
- Show `insert` mode state.
- Show line and col indicator (Ln 85, Col 42).
- Show editor mode (HBS, HTML, CSS, Javascript).
- Show linter status.
- Show provejs validation errors.
- Show template identifier.

```js
	// todo: move to $.fn.codemirrorFooter
	function delta(size1, size2) {
		var delta = (100 * (size2 - size1) / size1).toFixed(2);
		return (isNaN(delta))? '0.00' : delta;
	}
	function footerStatus(cm, bytesOld) {
		var doc = cm.getDoc();
		var str = doc.getValue();
		var bytesNew = str.length;
		var diff = delta(bytesOld, bytesNew);
		var overwrite = (cm.state.overwrite)? 'On' : 'Off';
		var status = 'Overwrite: @overwrite Diff: @diff%'.replace('@overwrite', overwrite).replace('@diff', diff);
		return status;
	}
	function footerStatus1() {
		footer1.text(footerStatus(editor1, bytes1));
	}

	editor1.on('keyHandled', function(cm, name) {
		if (name === 'Insert') footerStatus1();
	});
	editor1.on('changes', footerStatus1);

	footerStatus1();

```

```js
$('.cm-footer').editorFooter({
	codemirror: editor,
	provejs: form
});
```

## Todo: Workings of Monaco Editor For Comparison
- https://microsoft.github.io/monaco-editor/


# Workflow

```bash
grunt build
```