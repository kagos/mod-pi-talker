module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          paths: ['web-app/less']
        },
        files: {
          'web-app/build/style.css': 'web-app/less/style.less'
        }
      }
    }
  });

  grunt.registerTask('default', ['less']);
};