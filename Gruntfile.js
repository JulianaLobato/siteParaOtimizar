module.exports = function (grunt) {
    var ngrok = require('ngrok');

    grunt.initConfig({
        // configurações das tasks
        uglify: {
            'build/home.js': 'src/home.js',
        },
        // less: {
        //     'build/estilo.css': ['src/*.less']
        // }

        pagespeed: {
            options: {
              nokey: true,
              locale: "en_GB",
              threshold: 40
            },
            local: {
              options: {
                strategy: "desktop"
              }
            },
            mobile: {
              options: {
                strategy: "mobile"
              }
            }
          }
    });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8000;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

    // Register default tasks
    grunt.registerTask('default', ['psi-ngrok']);

    // carrega plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
};