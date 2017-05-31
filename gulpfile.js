var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src('lib/userService.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});



    
	