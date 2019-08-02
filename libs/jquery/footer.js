$.fn.codemirrorFooter = function (opts) {

	function toHtml() {
		var html = [
			'<span class="branch">branch</span>',
			'<span class="issues">issues</span>',
			'<span class="message">message</span>',
			'<span class="cursor">' + toCursor() + '</span>',
			'<span class="insert">' + toInsert() + '</span>',
			'<span class="mode">' + toMode() + '</span>',
			'<span class="smile" title="Smile, God loves you!"><i class="far fa-smile"></i></span>'
		].join('');
		return html;
	}

	// function delta(size1, size2) {
	// 	var delta = (100 * (size2 - size1) / size1).toFixed(2);
	// 	return (isNaN(delta))? '0.00' : delta;
	// }

	// function footerStatus(cm, bytes1) {
	// 	var doc = cm.getDoc();
	// 	var str = doc.getValue();
	// 	var bytes2 = str.length;
	// 	var diff = delta(bytes1, bytes2);
	// 	var status = 'Diff: @diff%'.replace('@diff', diff);
	// 	return status;
	// }

	// function update() {
	// 	// footer.text(footerStatus(cm, bytes1));
	// }

	function toInsert() {
		var insert = (!cm.state.overwrite)? 'On' : 'Off';
		return 'Insert: ' + insert;
	}
	function toMode() {
		var mode = cm.getMode().name;
		if (mode === 'handlebars') mode = 'hbs';
		return mode.toUpperCase();
	}
	function toCursor() {
		var pos = cm.getCursor();
		var ln = pos.line + 1;
		var ch = pos.ch + 1;
		return 'Ln ' + ln + ', Col ' + ch;
	}

	var cm = opts.cm;
	var form = opts.provejs;
	var footer = $(this);
	// footer.css({'display': 'flex'});
	footer.html(toHtml());

	// event handlers
	cm.on('keyHandled', function(cm, key) {
		if (key === 'Insert') footer.find('.insert').text(toInsert());
	});
	cm.on('cursorActivity', function (cm){
		footer.find('.cursor').text(toCursor());
	});
};
