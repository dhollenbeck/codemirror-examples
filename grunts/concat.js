'use strict';

module.exports = function(grunt) {

    var banner = '/* See https://github.com/dhollenbeck/codemirror-examples */\n\n';

	grunt.config('concat', {
		options: {
            banner: banner,
			process: function(src, filename) {
				src = src.replace(/\/.*sourceMappingURL.*/g, '');
				return src;
			}
		},
		// js: {
		// 	nonull: true,
		// 	dest: 'dist/codemirror-examples.js',
		// 	src: [
        //         'libs/codemirror/5.27.4/codemirror.js',
        //         'libs/codemirror/5.27.4/mode/javascript/javascript.js',
        //         'libs/codemirror/5.27.4/mode/xml/xml.js',
        //         'libs/codemirror/5.27.4/mode/css/css.js',
        //         'libs/codemirror/5.27.4/addon/mode/simple.js',
        //         'libs/codemirror/5.27.4/addon/mode/multiplex.js',
        //         'libs/codemirror/5.27.4/mode/handlebars/handlebars.js',
        //         'libs/codemirror/5.27.4/addon/fold/comment-fold.js',
        //         'libs/codemirror/5.27.4/addon/search/search.js',
        //         'libs/codemirror/5.27.4/addon/search/searchcursor.js',
        //         'libs/codemirror/5.27.4/addon/dialog/dialog.js',
        //         'libs/codemirror/5.27.4/addon/hint/show-hint.js',
        //         'libs/codemirror/5.27.4/addon/hint/xml-hint.js',
        //         'libs/codemirror/5.27.4/addon/hint/html-hint.js',
        //         'libs/codemirror/5.27.4/addon/hint/css-hint.js',
        //         'libs/codemirror/5.27.4/addon/hint/javascript-hint.js',
        //         'libs/codemirror/5.27.4/addon/search/match-highlighter.js',
        //         'libs/codemirror/5.27.4/addon/lint/lint.js',
        //         'libs/codemirror/5.27.4/addon/lint/html-lint.js',
        //         'libs/codemirror/5.27.4/addon/lint/css-lint.js',
        //         'libs/codemirror/5.27.4/addon/lint/javascript-lint.js',
        //         'libs/codemirror/5.27.4/addon/search/jump-to-line.js',
        //         'libs/codemirror/5.27.4/mode/markdown/markdown.js',
        //         'libs/codemirror/5.27.4/linting/handlebars.js',

        //         // 3rd party libs
        //         'libs/htmlhint/htmlhint.js',
        //         'libs/jshint/jshint.js',
                
        //         // handlebars linting
        //         './node_modules/handlebars/dist/handlebars.min.js',
        //         './node_modules/handlebars-error-parser/index.js',

        //         // Warning: csslint.js must be loaded after Handlebars 
        //         // otherwise it removes `window.Handlebars`.
        //         'libs/csslint/csslint.js',
        //         'libs/editor.js'
		// 	]
        // },
        js: {
			nonull: true,
			dest: 'dist/codemirror-examples.js',
			src: [
                './node_modules/codemirror/lib/codemirror.js',
                './node_modules/codemirror/mode/javascript/javascript.js',
                './node_modules/codemirror/mode/xml/xml.js',
                './node_modules/codemirror/mode/css/css.js',
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
                './node_modules/codemirror/addon/lint/lint.js',
                './node_modules/codemirror/addon/lint/html-lint.js',
                './node_modules/codemirror/addon/lint/css-lint.js',
                './node_modules/codemirror/addon/lint/javascript-lint.js',
                './node_modules/codemirror/addon/search/jump-to-line.js',
                './node_modules/codemirror/mode/markdown/markdown.js',

                'libs/linting/handlebars.js',

                // 3rd party libs
                './node_modules/htmlhint/lib/htmlhint.js',
                'libs/jshint/jshint.js',
                
                // handlebars linting
                './node_modules/handlebars/dist/handlebars.min.js',
                './node_modules/handlebars-error-parser/index.js',

                // Warning: csslint.js must be loaded after Handlebars 
                // otherwise it removes `window.Handlebars`.
                './node_modules/csslint/dist/csslint.js',
                'libs/editor.js'
			]
        },
		css: {
			nonull: true,
			dest: 'dist/codemirror-examples.css',
			src: [
                './node_modules/codemirror/lib/codemirror.css',
                './node_modules/codemirror/addon/fold/foldgutter.css',
                './node_modules/codemirror/addon/lint/lint.css',
                './node_modules/codemirror/addon/dialog/dialog.css',
                './node_modules/codemirror/addon/hint/show-hint.css'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
