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

const copyReadme = () => {
  return gulp.src('README.md').pipe(gulp.dest('dist'));
};

const copyPackagejson = () => {
  return gulp.src('package.json').pipe(gulp.dest('dist'));
};

const copyLicense = () => {
  return gulp.src('LICENSE').pipe(gulp.dest('dist'));
};

exports.default = gulp.series(
  clear,
  copy,
  copyReadme,
  copyPackagejson,
  copyLicense
);
