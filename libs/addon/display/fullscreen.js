// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror"], mod);
	else // Plain browser env
		mod(CodeMirror);
})(function (CodeMirror) {
	"use strict";

	CodeMirror.defineOption('fullscreen', false, function (cm, val, old) {
		if (old == CodeMirror.Init) old = false;
		if (!old == !val) return;
		if (val) setFullscreen(cm);
		else setNormal(cm);
	});

	// register a command so that we can invoke via
	// cm.execCommand('fullScreen')
	CodeMirror.commands.fullscreen = function(cm) {
		cm.setOption('fullscreen', !cm.getOption('fullscreen'));
	};

	function getEdit(cm) {
		return cm.getWrapperElement();
	}
	function getWrap(cm) {
		var el1 = cm.getWrapperElement();
		var el2 = $(el1).closest('.cm-fullscreen-container');
		return (el2.length)? el2[0] : el1;
	}

	function setFullscreen(cm) {
		var elWrap = getWrap(cm);
		var elEdit = getEdit(cm);

		cm.state.fullScreenRestoreEditor = {height: elEdit.style.height};
		$(elWrap).fullviewport('open');
		elEdit.style.height = '100%';
		cm.refresh();
	}

	function setNormal(cm) {
		var elWrap = getWrap(cm);
		var elEdit = getEdit(cm);
		$(elWrap).fullviewport('close');
		elEdit.style.height = cm.state.fullScreenRestoreEditor.height;
		cm.refresh();
	}
});
