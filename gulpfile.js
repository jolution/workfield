/**
 * @file This is my gulpfile
 * @author Julian Kasimir <info@jolution.de>
 * @copyright Jolution 2022
 * @version 1.2 - 29.03.2022
 * @license MIT
 * @see {@link https://gist.github.com/jolution/9b2abbd53a326b8f1b2a13403f12e16f} Source (Github Gist)
 * @see {@link https://gist.github.com/jolution/15fc7fbf72530caeef0dbe27d8e2e17d} variables.json (Github Gist)
 * @see {@link https://gist.github.com/jolution/872214c27f9e9e36a718c48ae3853876} tsconfig.json (Github Gist)
 */

/* jshint node: true */
'use strict';

/**
 * Set the date options
 * @tutorial https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */
const options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric'
};

const {
	src,
	dest,
	parallel,
	series,
	watch
} = require("gulp");
const { Stream } = require("stream");

/**
 * This file requires the following modules
 */
const gulpif = require("gulp-if"),
	fs = require("fs"),
	changed = require('gulp-changed'),
	log = require("fancy-log"),
	variablesFile = fs.readFileSync("variables.json"),
	variables = JSON.parse(variablesFile),
	postcss = require("gulp-postcss"),
	atImport = require("postcss-import"),
	jsImport = require("gulp-js-import"),
	//tailwindcss = require("tailwindcss"),
	ts = require("gulp-typescript"),
	tsconfig = require("./tsconfig.json"),
	//eslint = require('gulp-eslint'),
	exec = require("child_process").exec,
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	sourcemaps = require("gulp-sourcemaps"),
	htmlmin = require("gulp-htmlmin"),
	nunjucks = require("gulp-nunjucks"),
	webp = require('gulp-webp'),
	scss = require("gulp-dart-sass"),
	autoprefixer = require("autoprefixer"),
	cssnano = require("cssnano"),
	filesExist = require("files-exist"),
	babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	del = require("del"),
	replace = require("gulp-replace"),
	headerComment = require("gulp-header-comment"),
	preprocess = require("gulp-preprocess"),
	browsersync = require("browser-sync").create();

let isCompressing = variables.settings.isCompressing,
	isServer = variables.settings.isServer,
	isDev = variables.settings.isDev,
	build;

/** 
 * Set isDEV Env
 * @summary If the flag "dev" was passed when starting Gulp, the variable isDev defined as true
 * @param {string} process.argv[2] - command line flag "--dev"
 */
/*
function check_env() {
  return new Promise(function (resolve, reject) {
    // gulp --dev
    var env = process.argv[2], isDev;
    if (env) {
      if (env == "--dev") {
        log.info("Dev Mode on");
        isDev = true;
      } else {
        log.info("Dev Mode off");
        isDev = false;
      }
    } else {
      if (variables.settings.isDev == true) {
        isDev = true;
      } else {
        isDev = false;
      }
    }
    resolve();
  });
}
*/

/** 
 * Del Map assets
 * @summary Remove map files from the folder as well as SourceMap entries. Only in Developer Mode
 * @example
 * // Remove CSS SourceMap Entries
 * .pipe(replace(/\/\*# sourceMappingURL=.*\/gm, ''))
 * @example
 * // Remove JS SourceMap Entries
 * .pipe(replace(/\/\/# sourceMappingURL=.*\/gm, ''))
 * @param {callback} cb - The callback that handles the response.
 */
function clean(cb) {
	if (isDev !== true) {
		del([
			`${variables.config.targetCSS}/map`,
			`${variables.config.targetJS}/map`,
		], {
			force: true
		});

		var SRC = [variables.config.targetCSS + '**/*.css', variables.config.targetJS + '**/*.js'];
		src(SRC, {
				base: './'
			})
			.pipe(replace(/\/\*# sourceMappingURL=.*/gm, ''))
			.pipe(replace(/\/\/# sourceMappingURL=.*/gm, ''))
			.pipe(dest('./'));

		log.info(`Delete SourceMap entrys from ${SRC}`);

	}
	cb();
}

/**
 * Output Git Branch name
 * @summary Output as info message when running Gulp which Git-Branch we are currently on.
 * @example
 * // log "👨‍💻 Develop Branch"
 * log.info("👨‍💻 Develop Branch");
 * @example
 * // log "🌎 Master Branch"
 * log.info("🌎 Master Branch");
 * @example
 * // log "✨ Feature Branch"
 * log.info("✨ Feature Branch");
 * @see {@link https://www.npmjs.com/package/fancy-log} for further information.
 * @param {callback} cb - The callback that handles the response.
 */
function get_env(cb) {
	exec("git rev-parse --abbrev-ref HEAD", function (err, stdout, stderr) {
		const git__branch = stdout.replace(/(\r\n|\n|\r)/gm, ""),
			regex__feature = new RegExp("feature/feature-*");

		if (git__branch === "develop") {
			log.info("👨‍💻 Develop Branch");
			//isCompressing = false;
		} else if (git__branch === "master") {
			log.info("🌎 Master Branch");
			//isCompressing = true;
		} else if (regex__feature.test(git__branch) === true) {
			log.info("✨ Feature Branch");
			//isCompressing = true;
		} else {
			/**
			 * @todo check for other branch names
			 */
			log.warn(`Unknown ${git__branch}, maybe hotfix?`);
			//isCompressing = variables.settings.isCompressing;
		}
		if (stderr) log.error(stderr);
		cb(err);
	});
	cb();
}

/**
 * Error Handler
 * @summary Notify error messages with sound
 * @see {@link https://www.npmjs.com/package/gulp-notify} for further information.
 * @param {any} err - error message
 */
var onError = function (err) {
	notify.onError({
		title: "Gulp",
		subtitle: "Failure!",
		message: "Error: <%= error.message %>",
		sound: "Beep",
	})(err);
	this.emit("end");
};

/**
 * Static server
 * @summary Static server browserSyncServe 
 * @see {@link https://browsersync.io/docs/options} for further information.
 * @param {callback} cb - The callback that handles the response.
 */
function browserSyncServe(cb) {
	if (browsersync.active || isServer === false) {
		log.info("BrowserSync: Off");
	} else {
		log.info("BrowserSync: On");
		browsersync.init({
			open: false,
			//port: variables.data.port,
			server: {
				baseDir: ["../Resources/Public/", "../Resources/Public/html/", "./"],
			},
		});
	}
	cb();
}

/**
 * Static server reload
 * @summary Reload Static server browserSyncReload 
 * @see {@link https://browsersync.io/docs/options} for further information.
 * @param {callback} cb - The callback that handles the response.
 */
function browserSyncReload(cb) {
	if (isServer !== false) {
		browsersync.reload();
	}
	cb();
}

/**
 * Minify HTML-Files
 * @summary Minify HTML-Files
 * @see {@link https://www.npmjs.com/package/gulp-htmlmin} for further information.
 * @tutorial https://gulpjs.com/docs/en/api/dest/
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function minify_html() {
	var SRC = [
		`${variables.config.sourceHTML}**/*.html`, //select all files
		`!${variables.config.sourceHTML}**/partials/*.html`, //exclude files
		`!${variables.config.sourceHTML}_old/*.html`, //exclude files
		'!node_modules/**/*.html'
	];

	return (
		src(SRC)
		.pipe(
			nunjucks.compile({
				siteName: variables.data.siteName,
				url: variables.data.url,
			})
		)
		.pipe(
			gulpif(
				isCompressing,
				htmlmin({
					sortAttributes: true,
					sortClassName: true,
					collapseWhitespace: true,
					removeComments: true,
					minifyCSS: true,
					minifyJS: true,
					minifyURLs: true,
				})
			)
		)
		.pipe(dest(variables.config.targetHTML))
		.pipe(gulpif(isServer, browsersync.stream()))
	);
}

/**
 * SCSS compilation
 * @summary SCSS compilation
 * @see {@link https://www.npmjs.com/package/gulp-htmlmin} for further information.
 * @tutorial https://gulpjs.com/docs/en/api/dest/
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function build_scss() {

	var SRC = variables.config.sourceSCSS + '**/*.scss',
		DEST = variables.config.targetCSS,
		DEST__MAP = "./map/";

	var plugins = [
		//tailwindcss("tailwind.config.js"),
		autoprefixer(),
		//cssnano({zindex: false}),
		atImport(),
	];

	var plugins__minify = [
		cssnano({
			safe: true,
			minifyFontValues: {
				removeQuotes: false,
			},
			discardComments: {
				removeAllButFirst: true,
			},
			zindex: false,
		}),
	];

	if (isCompressing === true) {
		// Src: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_syntax
		plugins.push(...plugins__minify);
	}

	return (
		src(SRC)
		//.pipe (changed (DEST))
		.pipe(
			gulpif(isDev, sourcemaps.init())
			//gulpif (isDev, sourcemaps.init ({ loadMaps: true }))
		)
		.pipe(
			scss({
				outputStyle: "expanded",
				// includePaths doesnt work with dart-sass (https://github.com/webpack-contrib/sass-loader/issues/684)
				includePaths: [
					`${__dirname}/node_modules/@fortawesome`,
					`${__dirname}/node_modules/`,
					'~/Developer/node_modules/',
					'node_modules'
				]
			}).on("error", scss.logError)
		)
		/*.pipe(uncss({
		      //html: ['src/html/** /*.html'],
		      //html: ['src/html/*.html'],
		      html: ['index.html'],
		      ignore: [
		        /\w\.in/,
		        'hover', 'click', 'focus', '.glyphicon', '.glyphicon-play', '.glyphicon-refresh', '.glyphicon-chevron-right',
		        ".fade",
		        ".fade.in",
		        ".collapse",
		        ".collapse.in",
		        ".collapsing",
		        ".alert-danger",
		        /\.open/
		      ],
		      timeout: 4000
		  }))*/
		.pipe(postcss(plugins))
		.pipe(
			plumber({
				errorHandler: onError,
			})
		)
		.pipe(
			rename({
				//prefix: "style-",
				dirname: "/",
				//suffix: ".min",
				extname: ".css",
			})
		)
		// replace placeholder date in scss file
		// .pipe(replace('metadata__update-date', new Date().toLocaleString('de-DE', options)))
		// Source: https://stackoverflow.com/a/34081095/14331711
		.pipe(gulpif(isDev, replace(/@lastmodified:.*\n/g, `lastmodified:  ${new Date().toLocaleString('de-DE', options)}\n`)))
		.pipe(gulpif(!isDev, replace(/@lastmodified:.*\n/g, '')))
		//.pipe(gulpif(isDev, headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
		.pipe(gulpif(isDev, sourcemaps.write(DEST__MAP)))
		.pipe(dest(DEST))
		.pipe(gulpif(isServer, browsersync.stream()))
	);
}

/**
 * Minify images
 * @summary Minify images
 * @tutorial https://github.com/vincentorback/WebP-images-with-htaccess
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function minify_img() {

	var SRC = `${variables.config.sourceFileadmin}user_upload/**/*.jpg`,
		DEST = `${variables.config.sourceFileadmin}minified/webp/`;

	return (
		src(SRC)
		.pipe(changed(DEST))
		//.pipe(changed(DEST, { extension: `.${extension}` }))
		.pipe(webp())
		.pipe(dest(DEST))
	);
}

/**
 * Compile TS to JS
 * @summary Compile TypeScript to JavaScript
 * @tutorial https://www.npmjs.com/package/gulp-typescript
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function compile_ts() {
	var SRC = [
		`${variables.config.sourceTS}**/*.ts`, //select all files
		`!${variables.config.sourceTS}**/*.min.ts`, //exclude files ends with 'min.ts'
		`!${variables.config.sourceTS}**/_*.ts`, //exclude files starting with '_'
		`!${variables.config.sourceTS}**/__*.ts`, //exclude files starting with '__'
		`!${variables.config.sourceJS}**/* copy.ts`, //exclude files ending with copy
	];

	var DEST = variables.config.targetJS,
		DEST__MAP = "./map/";

	return (
		src(SRC)
		//.pipe (changed (DEST))
		.pipe(
			gulpif(isDev, sourcemaps.init())
		)
		.pipe(ts(tsconfig.compilerOptions))
		.pipe(
			rename({
				dirname: "/",
				extname: ".min.js",
			})
		)
		.pipe(gulpif(isDev, headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
		.pipe(gulpif(isDev, sourcemaps.write(DEST__MAP)))
		.pipe(dest(DEST))
		.pipe(gulpif(isServer, browsersync.stream()))
	);
}

/**
 * Minify JS
 * @summary Minify JavaScript-Files
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function minify_js() {
	var SRC = [
		`${variables.config.sourceJS}**/*.js`, //select all files
		`!${variables.config.sourceJS}**/*.min.js`, //exclude files ends with 'min.js'
		`!${variables.config.sourceJS}**/_*.js`, //exclude files starting with '_'
		`!${variables.config.sourceJS}**/__*.js`, //exclude files starting with '__'
		`!${variables.config.sourceJS}**/* copy.js`, //exclude files ending with copy
	];

	var DEST = variables.config.targetJS,
		DEST__MAP = "./map/";

	return (
		src(
			filesExist(SRC, {
				exceptionMessage: "Please run `bower/npm install` to install missing library",
			})
		)
		.pipe(
			jsImport({
				hideConsole: true,
			})
		)
		//.pipe (changed (DEST))
		.pipe(
			gulpif(isDev, sourcemaps.init())
		)
		.pipe(
			plumber({
				errorHandler: onError,
			})
		)
		.pipe(
			preprocess({
				context: variables.data,
				/*context: {
				NODE_ENV: 'production',
				DEBUG: true,
			  }*/
			})
		)
		.pipe(
			gulpif(
				isCompressing,
				babel({
					presets: ["@babel/env"],
				})
			)
		)
		.pipe(
			gulpif(
				isCompressing,
				uglify({
					mangle: true,
					compress: {
						drop_console: true,
					},
				})
			)
		)
		.on("error", (err) => {
			log(err.toString());
		})
		//.pipe(concat('scripts.js'))
		.pipe(
			rename({
				dirname: "/",
				extname: ".min.js",
			})
		)
		.pipe(gulpif(isDev, headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
		.pipe(gulpif(isDev, sourcemaps.write(DEST__MAP)))
		.pipe(dest(DEST))
		.pipe(gulpif(isServer, browsersync.stream()))
	);
}


/**
 * WatchFiles
 * @summary Check if some files changes
 */
function watchFiles(cb) {

	if (isServer === true) {
		watch(`${variables.config.sourceSCSS}**/*.scss`, series(build_scss, browserSyncReload));
		watch(`${variables.config.sourceHTML}**/*.html`, series(minify_html, browserSyncReload));
	} else {
		watch(`${variables.config.sourceSCSS}**/*.scss`, build_scss);
		watch(`${variables.config.sourceHTML}**/*.html`, minify_html);
	}

	// Watch TS Files
	watch(
		[
			`${variables.config.sourceTS}**/*.ts`, //select all files
			`!${variables.config.sourceTS}**/*.min.ts`, //exclude files ends with 'min.ts'
			`!${variables.config.sourceTS}**/_*.ts`, //exclude files starting with '_'
			`!${variables.config.sourceTS}**/__*.ts`, //exclude files starting with '__'
		],
		compile_ts
	);

	// Watch JS Files
	watch(
		[
			`${variables.config.sourceJS}**/*.js`, //select all files
			`!${variables.config.sourceJS}**/*.min.js`, //exclude files ends with 'min.js'
			`!${variables.config.sourceJS}**/_*.js`, //exclude files starting with '_'
			`!${variables.config.sourceJS}**/__*.js`, //exclude files starting with '__'
		],
		minify_js
	);

	cb()
}

// define complex tasks
if (isServer === true) {
	build = series(get_env, clean, browserSyncServe, parallel(build_scss, minify_js, compile_ts, minify_html, minify_img, watchFiles));
	exports.watch = parallel(watchFiles, browserSyncServe);
} else {
	build = series(get_env, clean, parallel(build_scss, minify_js, compile_ts, minify_html, minify_img, watchFiles));
	exports.watch = watchFiles;
}

// export tasks
exports.build = build;
exports.default = build;

exports.clean = clean;
exports.html = minify_html;
exports.ts = compile_ts;
exports.js = minify_js;
exports.img = minify_img;
exports.css = build_scss;
