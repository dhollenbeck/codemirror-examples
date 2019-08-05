$.fn.codemirrorFooter = function (opts) {

	function toHtml() {
		var html = [
			'<span class="resource hidden-xs hidden-sm" title="Resource being edited.">' + toReource() + '</span>',
			'<span class="field" title="Field being edited.">' + toField() + '</span>',
			'<span class="message" title="Validation message"></span>',
			'<span class="cursor" title="Cursor position">' + toCursor() + '</span>',
			'<span class="insert hidden-xs" title="Insert overwrite mode">' + toInsert() + '</span>',
			'<span class="mode" title="Editor mode">' + toMode() + '</span>',
			'<span class="smile" title="Smile, God loves you!"><i class="far fa-smile"></i></span>'
		].join('');
		return html;
	}

	function toInsert() {
		var insert = (!cm.state.overwrite)? 'On' : 'Off';
		return 'Insert: ' + insert;
	}
	function toMode() {
		var mode = cm.getMode();
		var name = mode.name;
		if (mode.jsonMode) name = 'json';
		if (name === 'handlebars') name = 'hbs';
		if (name === 'htmlmixed') name = 'html';
		return name.toUpperCase();
	}
	function toCursor() {
		var pos = cm.getCursor();
		var ln = pos.line + 1;
		var ch = pos.ch + 1;
		return 'Ln ' + ln + ', Col ' + ch;
	}
	function toMessage(field, data) {
		if (data.validation === 'danger') {
			return '<i class="fas fa-bug"></i> ' + data.message;
		} else {
			return '<i class="far fa-thumbs-up"></i> Good job!';
		}
	}
	function toReource() {
		return opts.resource || '';
	}
	function toField() {
		return opts.field || cm.getTextArea().name;;
	}

	var cm = opts.cm;
	var form = opts.provejs;
	var field = toField();
	var footer = $(this);
	var textarea = $(cm.getTextArea());

	footer.html(toHtml());

	// event handlers
	cm.on('keyHandled', function(cm, key) {
		if (key === 'Insert') footer.find('.insert').text(toInsert());
	});
	cm.on('cursorActivity', function (cm){
		footer.find('.cursor').text(toCursor());
	});

	form.on('status.form.prove status.input.prove', function(event, data) {


		// ignore all but 'validated events
		if (data.status !== 'validated') return;
		if (data.field !== field) return;

		var span = footer.find('.message');
		var message = toMessage(field, data);
		var spans = footer.find('span');

		/*{
			field: "html"
			message: "Please fix the linting errors shown above."
			status: "validated"
			validation: "danger"
			validator: "proveCallback"
		}*/

		spans.removeClass('alert-success');
		spans.removeClass('alert-danger');
		spans.removeClass('alert-warning');

		if (data.validation === 'success') {
			span.html(message);
			// spans.addClass('alert-success');
		} else if (data.validation === 'danger') {
			span.html(message);
			spans.addClass('alert-danger');
		} else if (data.validation === 'warning') {
			span.html(message);
			spans.addClass('alert-warning');
		} else if (data.validation === 'reset') {
			span.empty();
		}
	});

	// force valdation so the UI updates on first load
	textarea.validate();
};
