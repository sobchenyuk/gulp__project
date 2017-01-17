var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    pngquant = require('imagemin-pngquant'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    uncss = require('gulp-uncss'),
    jade = require('gulp-jade'),
    htmlhint = require("gulp-htmlhint"),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    prettify = require('gulp-html-prettify'),
    csscomb = require('gulp-csscomb'),
    autopolyfiller = require('gulp-autopolyfiller');


// Пути
var path = {
    app : {          // Исходники
        html   : './app/*.html',
        styl   : './app/styl/*.styl',
        img   : './app/img/**/*',
        jade   : './app/jade/*.jade',
        js     : './app/js-file/**/*.js',
        app     : './app/'
    },
    dist : {         // Релиз
        css   : './app/css/',
        js    : './app/js/',
        img   : './dist/images/'
    },
    watch : {        // Наблюдение
        jade   : './app/jade/**/*.jade',
        styl   : './app/styl/**/*.styl',
        html   : './app/*.html',
        js     : './app/js-file/*.js'
    }
};
path.server = path.app.app;



// Работа с STYLUS
gulp.task('styl', function () {
    return gulp.src(path.app.styl)

        .pipe(plumber())

        .pipe(stylus({
                linenos: false
            }).on('error', function (error) {
                console.log(error);
            })
        )
        
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))

        /*.pipe(uncss({
            html: [path.app.html]
        }))*/

        .pipe(concatCss('master.css'))
            
        .pipe(rename({
                suffix: '.min'
            }))

        .pipe(cssmin())

        .pipe(gulp.dest(path.dist.css))
        
        .pipe(browserSync.reload({stream: true}));
    
});


gulp.task('transferStyl', function () {
    return gulp.src(path.app.styl)

        .pipe(plumber())

        .pipe(stylus({
                linenos: false
            }).on('error', function (error) {
                console.log(error);
            })
        )
        
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))

        /*.pipe(uncss({
            html: [path.app.html]
        }))*/

        .pipe(concatCss('master.css'))

        .pipe(csscomb())
        
        .pipe(gulp.dest(path.dist.css))
        
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('transferJs', function () {

  return gulp.src(path.app.js)


    .pipe(gulp.dest(path.dist.js))
});


// Работа с js
gulp.task('js', function () {
  return gulp.src(path.app.js)

  .pipe(plumber())

  .pipe(rename({
                suffix: '.min'
            }))

    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(browserSync.reload({stream:true}));
});



// Работа с JADE
gulp.task('jade', function () {
    gulp.src(path.app.jade)
        .pipe(plumber())

        .pipe(jade({pretty: true}).on('error', function (error) {
                console.log(error);
            })
        )


        .pipe(gulp.dest(path.app.app))
        
        .pipe(browserSync.reload({stream:true}))
    
});


// Работа с ФОТО ужимает
gulp.task('img', function () {
    return gulp.src(path.app.img)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        
        .pipe(gulp.dest(path.dist.img));
});


// Валидная html
gulp.task('html', function () {
    return gulp.src(path.app.html, { ignoreInitial: false })

        .pipe(plumber())

        .pipe(htmlhint().on('error', function (error) {
                console.log(error);
            })
        )
        .pipe(htmlhint.reporter("htmlhint-stylish").on('error', function (error) {
            console.log(error);
        }))
        .pipe(htmlhint.failReporter({suppress: true}))
        
        .pipe(browserSync.reload({stream: true}))

});

//Красивый index.html
gulp.task('templates', function() {
    gulp.src(path.app.html)
        
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        
        .pipe(gulp.dest(path.app.app))
});

//веб сервер для статических страниц
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: path.server // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


// Следит за изминениями
gulp.task('watch',['browser-sync','jade'], function () {

    gulp.watch(path.watch.jade,['jade']);

    gulp.watch(path.watch.styl,['styl']);

    gulp.watch(path.watch.js,['js']);

    gulp.watch(path.watch.html,['html']);

});



// Задачи по-умолчанию
gulp.task('default', [
    'jade',
    'styl',
    'js',
    'html',
    'watch'
]);





// Следит за изминениями
gulp.task('watcher',['styl'], function () {
    gulp.watch("./app/styl/**/*.styl",['styl']);
});

gulp.task('imagese', function () {
    return gulp.src('./app/*.png')
    // кэширование изображений, прошедших через imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/images/'))
});



gulp.task('images', function () {
    return gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // кэширование изображений, прошедших через imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/images/'))
});

gulp.task('clear', function () {//чистка кеша
    return cache.clearAll();

});