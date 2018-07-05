const mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {

    // configurações das tasks
    grunt.initConfig({

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                compatibility: 'ie8',
            },
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['style.css'],
                dest: 'assets/saidas/',
                ext: '.min.css'
            }
        }, //cssmin

        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                },
            },
            js_minify: {
                files: [{
                    'assets/saidas/scripts.min.js': ['assets/js/*.js']
                }]
            }
        }, //uglify   

        htmlmin: {
            html_minify: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'home.html': '_home.html',
                }
            },
        }, //htmlmin

        imagemin: {
            img_minify: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    use: [mozjpeg()] // Example plugin usage
                },
                files: [{
                    expand: true,
                    cwd: 'assets/imgs/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/saidas/imgs/'
                }]
            }
        }, //imagemin
        watch: {
            arq_watch: {
                files: ['assets/saidas/**/*.js', 'assets/saidas/**/*.css'],
                tasks: ['uglify', 'cssmin'],
                options: {
                    livereload: true,
                },
            },
        }, //watch

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    keepalive: false
                }
            }
        }, //connect
    }); 

    // carrega plugins
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Register default tasks
    grunt.registerTask('default', ['imagemin', 'cssmin', 'uglify', 'htmlmin']);
    grunt.registerTask('serve', ['connect', 'watch']);
};