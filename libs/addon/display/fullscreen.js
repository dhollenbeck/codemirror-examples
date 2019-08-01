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

	CodeMirror.defineOption("fullScreen", false, function (cm, val, old) {
		if (old == CodeMirror.Init) old = false;
		if (!old == !val) return;
		if (val) setFullscreen(cm);
		else setNormal(cm);
	});

	function getWrapper(cm) {
		var el1 = cm.getWrapperElement();
		var el2 = $(el1).closest('.fullscreen');
		return (el2.length)? el2[0] : el1;
	}

	function setFullscreen(cm) {
		var elEdit = cm.getWrapperElement();
		var elWrap = $(elEdit).closest('.fullscreen')[0]; // code error
		var elHtml = document.documentElement;

		// save states
		cm.state.fullScreenRestoreWrapper = {
			width: elWrap.style.width,
			height: elWrap.style.height
		};
		cm.state.fullScreenRestoreWindow = {
			scrollTop: window.pageYOffset,
			scrollLeft: window.pageXOffset
		};

		elWrap.style.width = '';
		elWrap.style.height = 'auto';
		elWrap.className += ' CodeMirror-fullscreen';
		elHtml.style.overflow = 'hidden';
		cm.refresh();
	}

	function setNormal(cm) {
		var wrap = getWrapper(cm);

		// restore <html> tag
		document.documentElement.style.overflow = '';

		// remove wrapper class
		wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, '');

		// restore wrapper state
		wrap.style.width = cm.state.fullScreenRestoreWrapper.width;
		wrap.style.height = cm.state.fullScreenRestoreWrapper.height;

		// restore window state
		window.scrollTo(
			cm.state.fullScreenRestoreWindow.scrollLeft,
			cm.state.fullScreenRestoreWindow.scrollTop);
		cm.refresh();
	}
});
