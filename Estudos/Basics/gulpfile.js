var gulp = require("gulp");
var ts = require("gulp-typescript");
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

var tsProject = ts.createProject("tsconfig.json");

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', gulp.series('scripts', () => {
    gulp.watch('src/**/*.ts', ['scripts']);
}));

gulp.task('assets', function () {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('watch', 'assets'));