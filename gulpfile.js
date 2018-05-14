const gulp = require('gulp');
const nodemon  = require('gulp-nodemon');

require('./src/config.js');

gulp.task('default',  () => {
   nodemon({
       script: 'src/app.js',
       ext: 'js',
       nodeArgs: ['--inspect'],
       env: {
           MONGODB_URI: process.env.MONGODB_URI_LOCALHOST
       },
       ignore: ['../node_modules/**']
   });
});

gulp.task('heroku', () => {
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: {
            MONGODB_URI: process.env.MONGODB_URI_HEROKU
        },
        ignore: ['../node_modules/**']
    });
});
