const gulp = require('gulp')
const simpleTypescript = require('gulp-simple-typescript')
const run = require("gulp-run-command").default
const json = require('./package.json')

function build (cb) {
  gulp.src('src/**/*')
    .pipe(simpleTypescript())
    .pipe(gulp.dest('dist'))
  cb()
}

async function makeImage (cb) {
  await run(`docker build -t ${json.name} . `)()
} 
makeImage.displayName = 'make-image'

gulp.task('build', build)
gulp.task('docker-build', gulp.series(build, makeImage))