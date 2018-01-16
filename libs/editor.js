$.fn.editor = function(options) {
		
    //if (!options) return console.error('Missing options to codemirror plugin.');
    //if (!options.mode) return console.warn('CodeMirror is missing options.mode which is either `html` or `css`.');

    options = options || {};
    options.height = options.height || 'auto';
    

    var editors = [];

    this.each(function() {

        var textarea, mode, editor;

        textarea = $(this);
        mode = options.mode || textarea.attr('mode') || 'html';
        if (mode === 'html') mode = 'text/html';
        editor = CodeMirror.fromTextArea(textarea.get(0), {
            mode: mode,
            readOnly: options.readOnly,
            tabMode: 'indent',
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: true,
            autoCloseTags: true,
            foldGutter: true,
            dragDrop: true,
            lint: true,
            viewportMargin: Infinity,
            gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
        editor.setSize(null, options.height);

        editor.on('change', function(editor) {
            editor.save();

            // validate with https://github.com/provejs/provejs-jquery
            if (textarea.dirty) textarea.dirty(true);
            if (textarea.validate) textarea.validate();
        });

        editors.push(editor);
    });
};