'use strict';

var concat = require('concat');

concat([
	'./node_modules/codemirror/lib/codemirror.css',
	'./node_modules/codemirror/addon/fold/foldgutter.css',
	'./node_modules/codemirror/addon/lint/lint.css',
	'./node_modules/codemirror/addon/dialog/dialog.css',
	'./node_modules/codemirror/addon/hint/show-hint.css',
	'./libs/app/overrides.css'
], 'dist/codemirror-examples.css');

concat([
	// 3rd party libs
	'./node_modules/csslint/dist/csslint.js',
	'./node_modules/htmlhint/dist/htmlhint.js',
	'./node_modules/jshint/dist/jshint.js',
	'./node_modules/jsonlint/web/jsonlint.js',
	'./node_modules/handlebars/dist/handlebars.min.js',
	// './node_modules/handlebars-error-parser/index.js',
	'./node_modules/provejs-handlebars/dist/provejs-handlebars.js',

	// codemirror
	'./node_modules/codemirror/lib/codemirror.js',
	'./node_modules/codemirror/mode/javascript/javascript.js',
	'./node_modules/codemirror/mode/xml/xml.js',
	'./node_modules/codemirror/mode/css/css.js',
	'./node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
	'./node_modules/codemirror/mode/markdown/markdown.js',
	'./node_modules/codemirror/addon/mode/simple.js',
	'./node_modules/codemirror/addon/mode/multiplex.js',
	'./node_modules/codemirror/mode/handlebars/handlebars.js',
	'./node_modules/codemirror/addon/fold/comment-fold.js',
	'./node_modules/codemirror/addon/search/search.js',
	'./node_modules/codemirror/addon/search/searchcursor.js',
	'./node_modules/codemirror/addon/dialog/dialog.js',
	'./node_modules/codemirror/addon/hint/show-hint.js',
	'./node_modules/codemirror/addon/hint/xml-hint.js',
	'./node_modules/codemirror/addon/hint/html-hint.js',
	'./node_modules/codemirror/addon/hint/css-hint.js',
	'./node_modules/codemirror/addon/hint/javascript-hint.js',
	'./node_modules/codemirror/addon/search/match-highlighter.js',
	// './node_modules/codemirror/addon/lint/lint.js',
	'libs/addon/lint/lint.js',
	'./node_modules/codemirror/addon/lint/html-lint.js',
	'./node_modules/codemirror/addon/lint/css-lint.js',
	'./node_modules/codemirror/addon/lint/javascript-lint.js',
	'./node_modules/codemirror/addon/lint/json-lint.js',
	'./node_modules/codemirror/addon/search/jump-to-line.js',

	// our libs
	'libs/addon/lint/handlebars-lint.js',
	'libs/addon/display/fullscreen.js',
	'libs/jquery/editor.js',
	'libs/jquery/fullscreen.js',
	'libs/jquery/footer.js',
], 'dist/codemirror-examples.js');
