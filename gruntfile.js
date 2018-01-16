'use strict';

var Pkg = require('./package.json');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: Pkg
	});

	grunt.loadTasks('grunts');
	grunt.registerTask('build', ['concat']);
	grunt.registerTask('default', ['build']);
};
