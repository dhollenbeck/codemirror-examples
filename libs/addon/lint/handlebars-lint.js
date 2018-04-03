/*
The MIT License (MIT)

Copyright (c) 2015 Michael (https://github.com/mikethedj4)

https://raw.githubusercontent.com/mikethedj4/html-lint-for-codemirror/gh-pages/LICENSE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// CodeMirror HTMLHint Integration
(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror"], mod);
	else // Plain browser env
		mod(CodeMirror);
})

	(function (CodeMirror) {
		"use strict";

		function lintHtml(html) {
			var errors, found = [];
			if (!window.HTMLHint) return found;
			errors = HTMLHint.verify(html, ruleSets);
			errors.forEach(function(error) {
				var startLine = error.line - 1;
				var endLine = error.line - 1;
				var startCol = error.col - 1;
				var endCol = error.col;
				var from = CodeMirror.Pos(startLine, startCol);
				var to = CodeMirror.Pos(endLine, endCol);

				found.push({
					from: from,
					to: to,
					message: error.message,
					severity: error.type
				});
			});
			return found;
		}

		function lintHandlebars(html) {
			var errors, found = [];
			if (!window.Handlebars || !window.ProveHandlebars) return found;
			errors = window.ProveHandlebars.linter(html);
			errors.forEach(function(error) {
				var from = CodeMirror.Pos(error.start.line, error.start.column);
				var to = CodeMirror.Pos(error.end.line, error.end.column);

				found.push({
					from: from,
					to: to,
					message: error.message,
					severity: error.severity
				});
			});
			return found;
		}

		function linterSync(html) {
			var found = [], messages1, messages2;

			if (!window.HTMLHint) console.warn('handlebars-lint.js: could not detect window.HTMLHint');
			if (!window.Handlebars) console.warn('handlebars-lint.js: could not detect window.Handlebars');
			if (!window.ProveHandlebars) console.warn('handlebars-lint.js: could not detect window.ProveHandlebars');

			// html linting
			messages1 = lintHtml(html);
			messages1.forEach(function(message) {
				message.message = 'HTML: ' + message.message;
				found.push(message);
			});

			// Handlebars linting
			if (found.length === 0) {
				messages2 = lintHandlebars(html);
				messages2.forEach(function(message) {
					message.message = 'HANDLEBARS: ' + message.message;
					found.push(message);
				});
			}
			return found;
		}

		function linterAsync(html, next) {
			var errors = linterSync(html);
			next(errors);
		}
		linterAsync.async = true;

		// register either sync or async linter
		// CodeMirror.registerHelper("lint", "html", linterSync);
		CodeMirror.registerHelper("lint", "html", linterAsync);
	});

// ruleSets for HTMLLint
var ruleSets = {
	"tagname-lowercase": true,
	"attr-lowercase": true,
	"attr-value-double-quotes": true,
	"doctype-first": false,
	"tag-pair": true,
	"spec-char-escape": true,
	"id-unique": true,
	"src-not-empty": true,
	"attr-no-duplication": true
};
