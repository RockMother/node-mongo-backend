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
