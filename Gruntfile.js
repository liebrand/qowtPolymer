module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    lintFiles: [
      'Gruntfile.js',

      '**/*.js',
      '!**/mutation-summary.js',
      '!bower_components/**/*',
      '!node_modules/**/*'
    ],

    jshint: {
      all: '<%= lintFiles %>',
      options: {
        jshintrc: 'jsHintRc.json',
        debug: true
      }
    },

    watch: {
      scripts: {
        files: '<%= lintFiles %>',
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};