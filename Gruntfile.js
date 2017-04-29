module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        rsync: {
            options: {
                recursive: true
            },
            prod: {
                options: {
                    src: "_site/",
                    dest: grunt.option( "dest" ) || "/var/www/vorple",
                    host: grunt.option( "host" )
                }
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-rsync' );

    grunt.registerTask( 'deploy', [ 'rsync' ]); // use with command "grunt deploy --host=user@example.com --dest=/remote/path"
};
