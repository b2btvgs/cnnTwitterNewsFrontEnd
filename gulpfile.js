var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths = {
    temp: 'temp',
    tempVendor: 'temp/vendor',
    tempApp: 'temp/app',
    tempAppUser: 'temp/app/users',
    tempAppDashboards: 'temp/app/dashboards',
    tempAssets: 'temp/assets',
    tempIndex: 'temp/index.html',
    index: 'src/app/index.html',
    assetsSrc: 'src/assets/**/*',
    userModuleSrc: 'src/app/users/userModule.js',
    dashboardModuleSrc: 'src/app/dashboards/dashboardModule.js',
    appSrc: ['src/app/**/*', '!src/app/index.html', '!src/app/bower_components/**/*',
             '!src/app/users/userModule.js', '!src/app/dashboards/dashboardModule.js', '!src/app/TemplateData/**/*', '!src/app/Release/**/*'],
    bowerSrc: 'bower_components/**/*'
};

gulp.task('default', ['watch']);

gulp.task('watch', ['serve'], function () {
    gulp.watch(paths.appSrc, ['scripts']);
    gulp.watch(paths.bowerSrc, ['vendors']);
    gulp.watch(paths.index, ['copyAll']);
});

gulp.task('serve', ['copyAll'], function () {

    return gulp.src(paths.temp)
        .pipe(webserver({
            livereload: true,
            proxies: [{
                source: '/api',
                target: 'http://localhost:1337'
        }]
        }));
});

//                target: 'https://bluefish.herokuapp.com'

gulp.task('copyAll', [], function () {

    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

    var appFiles =
        gulp.src(paths.appSrc).pipe(gulp.dest(paths.tempApp));

    var assetFiles =
        gulp.src(paths.assetsSrc).pipe(gulp.dest(paths.tempAssets));

    var appUserModule = gulp.src(paths.userModuleSrc).pipe(gulp.dest(paths.tempAppUser));

    var appDashboardModule = gulp.src(paths.dashboardModuleSrc).pipe(gulp.dest(paths.tempAppDashboards));

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.temp))
        .pipe(inject(assetFiles, {
            relative: true
        }))
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.temp))
});

gulp.task('vendors', function () {

    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

    return gulp.src(paths.tempIndex)
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(gulp.dest(paths.temp));

});

gulp.task('scripts', function () {

    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    return gulp.src(paths.tempIndex)
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.temp));

});

gulp.task('clean', function () {
    del(paths.temp);

});