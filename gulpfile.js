const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const htmlmin = require(`gulp-htmlmin`);
const cleanCss = require(`gulp-clean-css`);
const clearPath = require(`del`);
const runSequence = require(`run-sequence`);
const npmDependencies = require('gulp-npm-files');

gulp.task(`clear-folder`, () =>
    clearPath('./build/*', {force:true})
);

gulp.task(`npm-dependencies`, () =>
    gulp.src(npmDependencies(), {base:'./'})
    .pipe(gulp.dest('./build'))
);

gulp.task(`compress-js`, () =>
    gulp.src(`./components/**/*.js`, {base: "."})
    .pipe(babel({
        presets: [`env`]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`./build/`))
);

gulp.task(`compress-html`, () =>
    gulp.src([`./index.html`, `./components/**/*.html`], {base: "."})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`./build/`))
);

gulp.task(`compress-css`, () =>
    gulp.src(`./components/**/*.css`, {base: "."})
    .pipe(cleanCss())
    .pipe(gulp.dest(`./build/`))
);

gulp.task(`default`, () =>
    runSequence(`clear-folder`, `npm-dependencies`, `compress-js`, `compress-html`, `compress-css`)
);