require('dotenv').config({path: '.env'});
const gulp = require('gulp');
const nodemon  = require('gulp-nodemon');

gulp.task('default',  () => {
   nodemon({
       script: 'src/app.js',
       ext: 'js',
       nodeArgs: ['--inspect'],
       ignore: ['../node_modules/**']
   });
});

gulp.task('heroku', () => {
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: {
            PORT: 8000,
            MONGODB_URI: process.env.MONGODB_URI
        },
        ignore: ['../node_modules/**']
    });
});
