const gulp = require('gulp');
const clean = require('gulp-clean');

// clean dist folder
const clear = () => {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
};

// copy SVG files
const copy = () => {
  return gulp.src('src/svg/**/*.svg').pipe(gulp.dest('dist/svg'));
};

exports.default = gulp.series(clear, copy);
