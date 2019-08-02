$.fn.fullscreen = function(dir) {

	var el = this;
	dir = dir || 'open';

	if (dir === 'open') {
		open(el);
	} else if (dir === 'close') {
		close();
	} else {
		throw new Error('Unknown dir in fullscreen plugin.');
	}

	function close() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen();
		} else {
			console.log('Warning: fullscreen close is not supported.');
		}
	}

	// go full screen
	function open(el) {
		if (el && el instanceof jQuery) el = el[0];
		if (el.requestFullscreen) {
			el.requestFullscreen();
		} else if (el.mozRequestFullScreen) { /* Firefox */
			el.mozRequestFullScreen();
		} else if (el.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
			el.webkitRequestFullscreen();
		} else if (el.msRequestFullscreen) { /* IE/Edge */
			el.msRequestFullscreen();
		} else {
			console.log('Warning: fullscreen open is not supported.');
		}
	}
};
$.fn.fullviewport = function(dir) {

	var el = this;
	var html = $('html');

	dir = dir || 'open';
	if (dir === 'open') {
		open(el);
	} else if (dir === 'close') {
		close(el);
	} else {
		throw new Error('Unknown dir in fullviewport plugin.');
	}

	function close(wrap) {
		html.css({overflow: ''});
		wrap.styleRestore();
		wrap.removeClass('cm-fullscreen-deloyed');
	}

	// go full viewport
	function open(wrap) {
		wrap.styleSave();

		// set <wrap>
		wrap.addClass('cm-fullscreen-deloyed');
		wrap.css({
			width: '',
			height: '100vh',
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			'z-index': 1040
		});

		// set <html>
		html.css({overflow: 'hidden'});
	}
};
$.fn.styleSave = function () {
	this.each(function () {
		var el = $(this);
		el.attr('style-cache', el.attr('style'));
	});
};
$.fn.styleRestore = function () {
	this.each(function () {
		var el = $(this);
		el.attr('style', el.attr('style-cache') || '');
		el.attr('style-cache', '');
	});
};
