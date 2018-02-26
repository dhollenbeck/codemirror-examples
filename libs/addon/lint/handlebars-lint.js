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

		CodeMirror.registerHelper("lint", "html", function (text) {
			var found = [], message, messages, parsed;

			if (!window.HTMLHint) console.warn('handlebars-lint.js: could not detect window.HTMLHint');
			if (!window.Handlebars) console.warn('handlebars-lint.js: could not detect window.Handlebars');
			if (!window.HandlebarsErrorParser) console.warn('handlebars-lint.js: could not detect window.HandlebarsErrorParser');

			// html linting
			if (window.HTMLHint) {
				messages = HTMLHint.verify(text, ruleSets);
				for (var i = 0; i < messages.length; i++) {
					message = messages[i];
					var startLine = message.line - 1, endLine = message.line - 1, startCol = message.col - 1, endCol = message.col;
					found.push({
						from: CodeMirror.Pos(startLine, startCol),
						to: CodeMirror.Pos(endLine, endCol),
						message: message.message,
						severity: message.type
					});
				}
			}

			// Handlebars linting
			if (window.Handlebars && window.HandlebarsErrorParser) {
				try {
					Handlebars.precompile(text);
				} catch (e) {
					parsed = window.HandlebarsErrorParser(e, text);
				}

				if (parsed) {
					found.push({
						from: CodeMirror.Pos(parsed.minLine, parsed.minColumn),
						to: CodeMirror.Pos(parsed.maxLine, parsed.maxColumn),
						message: parsed.message,
						severity: 'error' //warning or error
					});
				}
			}
			return found;
		});
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
