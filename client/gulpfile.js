var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var angularFilesort = require('gulp-angular-filesort');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var Server = require('karma').Server;

// var indexPath = '../views/index.jade';
var indexPath = './src/index.ejs';
var scssPath = './src/assets/scss';
var cssPath = './src/assets/css';
var depPath = './src/dependencies'
var compPath = './src/components';
var jsLibsPath = [depPath + '/js/jquery.js', depPath + '/js/angular.js', depPath + '/js/bootstrap.js'];
var angDependPath = [depPath + '/**/*.js',
    '!' + depPath + '/**/jquery.js',
    '!' + depPath + '/**/angular.js',
    '!' + depPath + '/js/bootstrap.js'
];

var testHelpers = ['bower_components/angular-mocks/angular-mocks.js'];


gulp.task('sass', ['replace-fonts'], function() {
    return gulp.src(scssPath + '/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssPath));
});

gulp.task('replace-bower-files', function() {
    const f_js = filter(['**/*.js'], {
        restore: true
    });
    const f_css = filter(['**/*.css', '/*.css'], {
        restore: true
    });

    gulp.src(mainBowerFiles( /* options */ ), {
            // base: 'node_modules'
        })
        .pipe(f_css)
        .pipe(gulp.dest(depPath + '/css/'))

    gulp.src(mainBowerFiles( /* options */ ), {
            // base: 'node_modules'
        })
        .pipe(f_js)
        .pipe(gulp.dest(depPath + '/js/'))
        // .pipe(f_css)
        // .pipe(gulp.dest(depPath + '/css/'));
});

gulp.task('watch-sass', function() {
    gulp.watch(scssPath + '/**/*.scss', ['sass']);
});

gulp.task('replace-fonts', function() {
    return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('./src/assets/fonts'));
});

gulp.task('unit-test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('watch-js', function() {
    gulp.watch(compPath + '/**/*.js', ['unit-test']);
});

gulp.task('karma-inject-js', ['replace-bower-files'], function() {
    tranfFn = function(filepath, file, i, length) {
        return '  "./' + filepath + '"' + (i + 1 < length ? ',' : '');
    };

    tranfFnComma = function(filepath, file, i, length) {
        return '  "./' + filepath + '"' + ',';
    };

    return gulp.src('./karma.conf.js')
        .pipe(inject(gulp.src(jsLibsPath, {
            read: false
        }), {
            starttag: '// libs:js',
            endtag: '// endinject',
            transform: tranfFnComma,
            addRootSlash: true,
            name: 'libs'
        }))

        .pipe(inject(
            gulp.src(angDependPath, {
                read: true
            })
            .pipe(angularFilesort()), {
                starttag: '// dependencies:js',
                endtag: '// endinject',
                transform: tranfFnComma,
                addRootSlash: false,
                name: 'dependencies'
            }
        ))

        .pipe(inject(gulp.src(testHelpers, {
            read: true
        }), {
            starttag: '// testHelpers:js',
            endtag: '// endinject',
            transform: tranfFnComma,
            addRootSlash: false,
            name: 'testHelpers'
        }))

        .pipe(inject(
            gulp.src([compPath + '/**/*.js', '!' + compPath + '/**/*.spec.js'], {
                read: true
            })
            .pipe(angularFilesort()), {
                starttag: '// components:js',
                endtag: '// endinject',
                transform: tranfFnComma,
                addRootSlash: false,
                name: 'components'
            }
        ))
        .pipe(inject(
            gulp.src(compPath + '/**/*.spec.js', {
                read: true
            })
            .pipe(angularFilesort()), {
                starttag: '// test:js',
                endtag: '// endinject',
                transform: tranfFn,
                addRootSlash: false,
                name: 'test'
            }
        ))
        .pipe(gulp.dest('./'))
});

gulp.task('inject', ['replace-bower-files', 'sass'], function() {
    gulp.src(indexPath)
        .pipe(inject(gulp.src(cssPath + '/style.css', {
            read: false
        }), {
            ignorePath: 'src',
            addRootSlash: true
        }))

	    .pipe(inject(gulp.src(jsLibsPath, {
	        read: false
	    }), {
	        ignorePath: 'src',
	        addRootSlash: true,
	        name: 'jsLibs'
	    }))

	    .pipe(inject(gulp.src(depPath + '/css/*.css', {
	    	read: false
	    }), {
	    	ignorePath: 'src',
	    	addRootSlash: true,
	    	name: 'cssDependencies'
	    }))

	    .pipe(inject(
	        gulp.src(angDependPath, {
	            read: true
            }).pipe(angularFilesort()), 
            {
	            ignorePath: 'src',
	            addRootSlash: true,
	            name: 'jsDependencies'
	        }
	    ))

    	.pipe(inject(
            gulp.src([compPath + '/**/*.js', '!' + compPath + '/**/*.spec.js'], {
                read: true
            }).pipe(angularFilesort()),
            {
                ignorePath: 'src',
                addRootSlash: true,
                name: 'components'
            }
        ))

        .pipe(gulp.dest('./src'))
        // .pipe(gulp.dest('../views'))
});

gulp.task('build-dev', ['replace-bower-files', 'sass', 'inject']);