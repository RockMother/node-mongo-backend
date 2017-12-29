const gulp = require('gulp');
const nodemon  = require('gulp-nodemon');

gulp.task('default',  () => {
   nodemon({
       script: 'src/app.js',
       ext: 'js',
       nodeArgs: ['--inspect'],
       env: {
           PORT: process.env.PORT || 8000,
           MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node-mongo-backend-database'
       },
       ignore: ['../node_modules/**']
   });
});
