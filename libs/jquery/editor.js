$.fn.editor = function (options) {

	var textarea, mode, editor, lines;

	options = options || {};

	textarea = $(this);
	mode = options.mode || textarea.attr('mode') || 'html';
	if (mode === 'html') mode = 'text/html';
	if (mode === 'handlebars' || mode === 'hbs') mode = {
		name: "handlebars",
		base: "text/html"
	};
	if (mode === 'json') mode = 'application/json';

	//read-write

	editor = CodeMirror.fromTextArea(textarea.get(0), {
		mode: mode,
		readOnly: options.readOnly,
		indentUnit: 4,
		styleActiveLine: true,
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		autoCloseTags: true,
		foldGutter: true,
		dragDrop: true,

		// lint: true,
		lint: {
			tooltips: 'gutter'
		},



		viewportMargin: Infinity,
		gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
		extraKeys: {
			'F11': function(cm) {
				cm.execCommand('fullscreen');
			},
			'Esc': function(cm) {
				if (cm.getOption('fullscreen')) cm.execCommand('fullscreen');
			}
		  }
	});

	// Set inital editor height
	// Set editor size. We set the editor.setSize(null, 'auto') to enable
	// auto resize. The editor.setSize() method sets style attribute of the
	// <div class="CodeMirror cm-s-default CodeMirror-wrap" style="height: auto;">
	// See: https://codemirror.net/demo/resize.html

	// set defaults
	options.height = options.height || 'auto';
	options.linesLock = options.linesLock || 30;

	lines = editor.getValue().split('\n').length;
	if (options.height !== 'auto') {
		// explicit height is set so honor the explicit height.
		options.height = (typeof options.height !== 'string')? options.height + 'px' : options.height;
		editor.setOption('linesLocked', false);
		editor.setSize(null, options.height);
	} else if ( lines < options.linesLock) {
		// auto height, lines less then max allowed
		editor.setOption('linesLocked', false);
		editor.setSize(null, 'auto');
	} else {
		// auto height, lines greater than max allowed
		editor.setOption('linesLocked', true);
		editor.setSize(null, '630px');
	}

	function getHeight(cm) {
		var el = $(cm.getWrapperElement());
		var heightActual = el.height();
		return heightActual;
	}

	// handle auto scaling upto 25 lines
	// set a custom cm option `linesLocked`
	editor.on('change', function (cm) {
		lines = cm.doc.size;
		if (!cm.getOption('linesLocked') && lines > options.linesLock) {
			cm.setOption('linesLocked', true);
			cm.setSize(null, getHeight(cm));
		} else if (lines < options.linesLock) {
			cm.setOption('linesLocked', false);
			cm.setSize(null, options.height);
		}
	});

	editor.on('change', function (cm) {
		cm.save();
	});

	editor.on('paste', function (cm) {
		cm.refresh(); // force resize and re-validate on paste
	});

	editor.on('update', function (cm) {
		// validate with https://github.com/provejs/provejs-jquery
		if (textarea.dirty) textarea.dirty(true);
		if (textarea.validate) textarea.validate();
	});

	if (options.readOnly) {
		$(editor.getWrapperElement()).addClass('cm-read-only');
	} else {
		$(editor.getWrapperElement()).addClass('cm-read-write');
	}

	return editor;
};
