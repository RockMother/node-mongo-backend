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
            MONGODB_URI: 'mongodb://heroku_jn009l6b:elm0hevpg007e6opsd5d0ei2mn@ds157653.mlab.com:57653/heroku_jn009l6b'
        },
        ignore: ['../node_modules/**']
    });
});
