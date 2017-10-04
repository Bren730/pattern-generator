var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var csso = require('gulp-csso')
var plumber = require('gulp-plumber')
var argv = require('yargs').argv
var concat = require('gulp-concat')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var gls = require('gulp-live-server')
var babel = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer')
var manifest = require('gulp-manifest')
var gutil = require('gulp-util')
var tap = require('gulp-tap')
var server

var defaultOptions = {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Highest compression level for PNG
      compressionLevel: 9,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,

      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false,
      passThroughUnused: true
  }

  gulp.task('pug', function() {

  	var stream = gulp.src('./pug/index.pug')
  	.pipe(plumber({
  		errorHandler: function (err) {
  			console.warn(err)
  			this.emit('end')
  		}
  	}))
  	.pipe(pug({}))
  	.pipe(gulp.dest('./build'))

  	if (server) stream = stream.pipe(server.notify())

  		return stream

  })

  gulp.task('js', function() {

  	var stream = gulp.src('./js/**/*.js')
  	.pipe(plumber({
  		errorHandler: function (err) {
  			console.warn(err)
  			this.emit('end')
  		}
  	}))
  	.pipe(sourcemaps.init())
  	.pipe(concat('app.js'))
  	.pipe(babel({
  		presets: ['es2015']
  	}))
  	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('./build/static/js'))

  	if (argv.publish) {

  		stream = stream.pipe(rename({suffix: '.min'}))
  		.pipe(gulp.dest('./static/js'))
  		.pipe(gulp.dest('./build/static/js'))

  	}

  	if (server) stream = stream.pipe(server.notify())

  		return stream

  })

  gulp.task('vendor', function() {

  	var files = [
  	'./node_modules/jquery/dist/jquery.min.js',
  	'./node_modules/jquery-inview/jquery.inview.min.js',
  	'./node_modules/velocity-animate/velocity.min.js',
  	'./vendor/modernizr-custom/modernizr-custom.js',
    './node_modules/svg.js/dist/svg.js'
  	]

  	var stream = gulp.src(files)
  	.pipe(concat('vendor.js'))
  	.pipe(gulp.dest('./build/static/js'))

  	if (argv.publish) {

  		stream = stream.pipe(rename({suffix: '.min'}))
  		.pipe(gulp.dest('./static/js'))
  		.pipe(gulp.dest('./build/static/js'))

  	}

  	return stream

  })

  gulp.task('less', function() {

  	var stream = gulp.src('./less/app.less')
  	.pipe(sourcemaps.init())
  	.pipe(plumber({
  		errorHandler: function (err) {

  			console.warn(err)
  			this.emit('end')

  		}
  	}))

  	.pipe(less())
  	.pipe(autoprefixer('last 10 versions', 'ie 9'))
  	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('./build/static/css'))

  	if (argv.publish) {

  		stream = stream.pipe(csso(true))
  		.pipe(rename({suffix: '.min'}))
  		.pipe(gulp.dest('./build/static/css'))
  	}

  	if (server) stream = stream.pipe(server.notify())

  		return stream

  })

  gulp.task('manifest', function() {

  	var stream = gulp.src(['build/**/*'], {base: './build' })
  	.pipe(manifest({
  		hash: true,
  		preferOnline: true,
  		filename: 'app.manifest',
  		exclude: 'app.manifest'
  	}))
  	.pipe(gulp.dest('build'))

  	return stream
  })

  gulp.task('default', ['js', 'vendor', 'less', 'pug', 'manifest'])

  gulp.task('dev', function() {

  	server = gls.static('build')
  	server.start()

  	gulp.watch('pug/**/*', ['pug', 'manifest'])
  	gulp.watch('less/**/*', ['less', 'manifest'])
  	gulp.watch('js/**/*', ['js', 'manifest'])
	// gulp.start(['dev-img', 'watch-svg'])

})