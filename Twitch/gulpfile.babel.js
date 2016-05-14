/**
 * Created by leichen on 4/15/16.
 */
/**
 * Created by leichen on 4/7/16.
 */
/**
 * Created by leichen on 4/7/16.
 */
// require('babel-core/register')


import gulp from 'gulp';
import util from 'gulp-util'
import mocha from 'gulp-mocha'
import run from 'run-sequence';



const paths ={
    test:'./front-test/**/*.js',

}

gulp.task('default',cb => {
    run('test', cb);
})



gulp.task('test', function () {
    gulp.src(paths.test, {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error',util.log)



})
//
