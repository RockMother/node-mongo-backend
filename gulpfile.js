const gulp = require('gulp');
const nodemon  = require('gulp-nodemon');

gulp.task('default', () => {
   nodemon({
       script: 'app.js',
       ext: 'js',
       env: {
           PORT: 8000,
           DATABASE_URL: 'mongodb://localhost/node-mongo-backend-database'
       },
       ignore: ['../node_modules/**']
   });
});

gulp.task('default_p', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000,
            DATABASE_URL: 'mongodb://heroku_sdzgfrpd:3qqd77pm33enneuhrmquaal4gp@ds157653.mlab.com:57653/heroku_sdzgfrpd'
        },
        ignore: ['../node_modules/**']
    });
});