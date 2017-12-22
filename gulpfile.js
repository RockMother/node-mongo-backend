const gulp = require('gulp');
const nodemon  = require('gulp-nodemon');

gulp.task('default', () => {
   nodemon({
       script: 'app.js',
       ext: 'js',
       env: {
           PORT: process.env.PORT || 8000,
           MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/node-mongo-backend-database'
       },
       ignore: ['../node_modules/**']
   });
});
