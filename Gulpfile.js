const gulp = require('gulp')
const simpleTypescript = require('gulp-simple-typescript')
const run = require("gulp-run-command").default
const json = require('./package.json')
const rename = require("gulp-rename");
const aglio = require('gulp-aglio')


function makeDoc (cb) {
  gulp.src(`docs/${json.name}.apib`)
    .pipe(aglio({ 'themeVariables': 'slate' }))
    .pipe(rename('app/static/index.html'))
    .pipe(gulp.dest('src'));
  cb()
}

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

gulp.task('build', gulp.series(makeDoc, build))
gulp.task('docker-build', gulp.series(build, makeImage))