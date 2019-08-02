$.fn.editor = function (options) {

	var textarea, mode, editor;

	options = options || {};

	textarea = $(this);
	mode = options.mode || textarea.attr('mode') || 'html';
	if (mode === 'html') mode = 'text/html';
	if (mode === 'handlebars' || mode === 'hbs') mode = {
		name: "handlebars",
		base: "text/html"
	};

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
		lint: true,
		viewportMargin: Infinity,
		gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
		extraKeys: {
			'F11': function(cm) {
				cm.setOption('fullScreen', !cm.getOption('fullScreen'));
			},
			'Esc': function(cm) {
				if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
			}
		  }
	});

	// Set editor size. We set the editor.setSize(null, 'auto') to enable
	// autor esize. The editor.setSize() method sets style attribute of the
	// <div class="CodeMirror cm-s-default CodeMirror-wrap" style="height: auto;">
	// See: https://codemirror.net/demo/resize.html

	// set defaults
	options.height = options.height || 'auto';
	options.linesLock = options.linesLock || 30;

	// set inital height
	var lines = editor.getValue().split('\n').length;
	if ( lines < options.linesLock) {
		editor.setSize(null, options.height);
	} else {
		editor.setSize(null, '630px');
	}

	// handle auto scaling upto 25 lines
	var locked = false;
	editor.on('change', function (cm) {
		lines = cm.doc.size;
		var el = $(cm.getWrapperElement());
		var heightActual = el.height();
		var style = el[0].style.height;
		var isFullscreen = style === '100%';
		if (isFullscreen) {
			// do nothing
		} else if (!locked && lines > options.linesLock) {
			locked = true;
			cm.setSize(null, heightActual);
		} else if (lines < options.linesLock) {
			locked = false;
			cm.setSize(null, options.height);
		}
	});

	editor.on('change', function (editor) {
		// perhaps throttle editor.save()
		editor.save();
	});

	editor.on('update', function (editor) {
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
