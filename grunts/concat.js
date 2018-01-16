'use strict';

module.exports = function(grunt) {

    var banner = '/* See https://github.com/dhollenbeck/codemirror-lint-autoresize */\n\n';

	grunt.config('concat', {
		options: {
            banner: banner,
			process: function(src, filename) {
				src = src.replace(/\/.*sourceMappingURL.*/g, '');
				return src;
			}
		},
		js: {
			nonull: true,
			dest: 'dist/codemirror-lint-autoresize.js',
			src: [
                'libs/codemirror/5.27.4/codemirror.js',
                'libs/codemirror/5.27.4/mode/javascript/javascript.js',
                'libs/codemirror/5.27.4/mode/xml/xml.js',
                'libs/codemirror/5.27.4/mode/css/css.js',
                'libs/codemirror/5.27.4/mode/htmlmixed/htmlmixed.js',
                'libs/codemirror/5.27.4/addon/edit/closetag.js',
                'libs/codemirror/5.27.4/addon/edit/matchbrackets.js',
                'libs/codemirror/5.27.4/addon/selection/active-line.js',
                'libs/codemirror/5.27.4/addon/fold/foldcode.js',
                'libs/codemirror/5.27.4/addon/fold/foldgutter.js',
                'libs/codemirror/5.27.4/addon/fold/brace-fold.js',
                'libs/codemirror/5.27.4/addon/fold/xml-fold.js',
                'libs/codemirror/5.27.4/addon/fold/comment-fold.js',
                'libs/codemirror/5.27.4/addon/search/search.js',
                'libs/codemirror/5.27.4/addon/search/searchcursor.js',
                'libs/codemirror/5.27.4/addon/dialog/dialog.js',
                'libs/codemirror/5.27.4/addon/hint/show-hint.js',
                'libs/codemirror/5.27.4/addon/hint/xml-hint.js',
                'libs/codemirror/5.27.4/addon/hint/html-hint.js',
                'libs/codemirror/5.27.4/addon/hint/css-hint.js',
                'libs/codemirror/5.27.4/addon/hint/javascript-hint.js',
                'libs/codemirror/5.27.4/addon/search/match-highlighter.js',
                'libs/codemirror/5.27.4/linting/htmlhint.js',
                'libs/codemirror/5.27.4/linting/csslint.js',
                'libs/codemirror/5.27.4/linting/jshint.js',
                'libs/codemirror/5.27.4/addon/lint/lint.js',
                'libs/codemirror/5.27.4/addon/lint/html-lint.js',
                'libs/codemirror/5.27.4/addon/lint/css-lint.js',
                'libs/codemirror/5.27.4/addon/lint/javascript-lint.js',
                'libs/codemirror/5.27.4/addon/search/jump-to-line.js',
                'libs/codemirror/5.27.4/mode/markdown/markdown.js',
                'libs/codemirror/5.27.4/linting/integration.js',
                'libs/editor.js'
			]
		},
		css: {
			nonull: true,
			dest: 'dist/codemirror-lint-autoresize.css',
			src: [
                'libs/codemirror/5.27.4/codemirror.css',
                'libs/codemirror/5.27.4/addon/fold/foldgutter.css',
                'libs/codemirror/5.27.4/addon/lint/lint.css',
                'libs/codemirror/5.27.4/addon/dialog/dialog.css',
                'libs/codemirror/5.27.4/addon/hint/show-hint.css'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
