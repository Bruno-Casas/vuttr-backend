const gulp = require('gulp')
const simpleTypescript = require('gulp-simple-typescript')

gulp.task('build', (cb) => {
  gulp.src('src/**/*.*')
    .pipe(simpleTypescript())
    .pipe(gulp.dest('dist'))
  cb()
})
