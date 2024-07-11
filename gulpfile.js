const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');

// clean dist folder
const clear = () => {
  return gulp.src('dist', { read: false }).pipe(clean());
};

// copy and rename SVG files
const copy = () => {
  return gulp
    .src('src/svg/**/*.svg')
    .pipe(
      rename(function (path) {
        const iconName = path.basename
          .split('simple_icon_')
          .join('')
          .split('duotone_icon_')
          .join('');
        const iconDir = path.dirname;

        path.dirname = iconDir;
        path.basename = iconName;
      })
    )
    .pipe(gulp.dest('dist/svg'));
};

exports.default = gulp.series(clear, copy);
