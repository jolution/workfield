/**
 * @file This is my gulpfile
 * @author Julian Kasimir <info@jolution.de>
 * @copyright Jolution 2022
 * @version 1.2 - 30.04.2022
 * @license MIT
 * @see {@link https://gist.github.com/jolution/9b2abbd53a326b8f1b2a13403f12e16f} Source (Github Gist)
 * @see {@link https://gist.github.com/jolution/15fc7fbf72530caeef0dbe27d8e2e17d} variables.json (Github Gist)
 * @see {@link https://gist.github.com/jolution/872214c27f9e9e36a718c48ae3853876} tsconfig.json (Github Gist)
 * @see {@link https://gist.github.com/jolution/139d0f848358a689dbe32ff57836c2ef} tailwind.sconfig.js (Github Gist)
 */

/* jshint node: true */
'use strict';

/**
 * Set the date options
 * @tutorial https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */
const dateOptions = {
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
const {Stream} = require("stream");

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
	tailwindcss = require('tailwindcss'),
	atImport = require("postcss-import"),
	jsImport = require("gulp-js-import"),
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
	browsersync = require("browser-sync").create(),
	minimist = require('minimist');

/**
 * get Environment
 * @summary If the flag "dev" was passed when starting Gulp, the variable isEnv defined as (production|development)
 * @param {string} process.argv[2] - command line flag "--env development" or "--env production"
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md}
 */
let knownOptions = {
	string: 'env',
	default: {env: process.env.NODE_ENV || variables.settings.isEnv || 'production'}
};
let envOptions = minimist(process.argv.slice(2), knownOptions);

let isEnv = envOptions.env,
	isServer = variables.settings.isServer,
	build;

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
	if (isEnv === 'production') {
		del([
			`${variables.config.targetCSS}/map`,
			`${variables.config.targetJS}/map`,
		], {
			force: true
		});

		let SRC = [variables.config.targetCSS + '**/*.css', variables.config.targetJS + '**/*.js'];
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
function getGitEnv(cb) {
	exec("git rev-parse --abbrev-ref HEAD", function (err, stdout, stderr) {
		const git__branch = stdout.replace(/(\r\n|\n|\r)/gm, ""),
			regex__feature = new RegExp("feature/feature-*");

		if (git__branch === "develop") {
			log.info("👨‍💻 Develop Branch");
		} else if (git__branch === "master") {
			log.info("🌎 Master Branch");
		} else if (regex__feature.test(git__branch) === true) {
			log.info("✨ Feature Branch");
		} else {
			/**
			 * @todo check for other branch names
			 */
			log.warn(`Unknown ${git__branch}, maybe hotfix?`);
		}

		if (isEnv === 'production') {
			log.info("🌎 Production Environment");
		} else {
			log.info("👨‍💻 Development Environment");
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
let onError = function (err) {
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
function minifyHtml() {
	let SRC = [
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
					isEnv === 'production',
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
function buildScss() {

	let SRC = variables.config.sourceSCSS + '**/*.scss',
		DEST = variables.config.targetCSS,
		DEST__MAP = "./map/";

	let plugins = [
		tailwindcss("tailwind.config.js"),
		autoprefixer(),
		//cssnano({zindex: false}),
		atImport(),
	];

	let plugins__minify = [
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

	if (isEnv === 'production') {
		// Src: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_syntax
		plugins.push(...plugins__minify);
	}

	return (
		src(SRC)
			.pipe(
				gulpif(isEnv !== 'production', sourcemaps.init())
			)
			.pipe(
				scss({
					outputStyle: "expanded",
					// includePaths doesn't work with dart-sass (https://github.com/webpack-contrib/sass-loader/issues/684)
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
			// .pipe(replace('metadata__update-date', new Date().toLocaleString('de-DE', dateOptions)))
			// Source: https://stackoverflow.com/a/34081095/14331711
			.pipe(gulpif(isEnv === 'production', replace(/@lastmodified:.*\n/g, `lastmodified:  ${new Date().toLocaleString('de-DE', dateOptions)}\n`)))
			.pipe(gulpif(isEnv !== 'production', replace(/@lastmodified:.*\n/g, '')))
			//.pipe(gulpif(isEnv !== 'production', headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
			.pipe(gulpif(isEnv !== 'production', sourcemaps.write(DEST__MAP)))
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
function minifyImg() {

	let SRC = `${variables.config.sourceFileadmin}user_upload/**/*.jpg`,
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
function compileTs() {
	let SRC = [
		`${variables.config.sourceTS}**/*.ts`, //select all files
		`!${variables.config.sourceTS}**/*.min.ts`, //exclude files ends with 'min.ts'
		`!${variables.config.sourceTS}**/_*.ts`, //exclude files starting with '_'
		`!${variables.config.sourceTS}**/__*.ts`, //exclude files starting with '__'
		`!${variables.config.sourceJS}**/* copy.ts`, //exclude files ending with copy
	];

	let DEST = variables.config.targetJS,
		DEST__MAP = "./map/";

	return (
		src(SRC)
			//.pipe (changed (DEST))
			.pipe(
				gulpif(isEnv !== 'production', sourcemaps.init())
			)
			.pipe(ts(tsconfig.compilerOptions))
			.pipe(
				rename({
					dirname: "/",
					extname: ".min.js",
				})
			)
			.pipe(gulpif(isEnv !== 'production', headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
			.pipe(gulpif(isEnv !== 'production', sourcemaps.write(DEST__MAP)))
			.pipe(dest(DEST))
			.pipe(gulpif(isServer, browsersync.stream()))
	);
}

/**
 * Minify JS
 * @summary Minify JavaScript-Files
 * @returns {Stream} - A stream that can be used in the middle or at the end of a pipeline to create files on the file system.
 */
function minifyJs() {
	let SRC = [
		`${variables.config.sourceJS}**/*.js`, //select all files
		`!${variables.config.sourceJS}**/*.min.js`, //exclude files ends with 'min.js'
		`!${variables.config.sourceJS}**/_*.js`, //exclude files starting with '_'
		`!${variables.config.sourceJS}**/__*.js`, //exclude files starting with '__'
		`!${variables.config.sourceJS}**/* copy.js`, //exclude files ending with copy
	];

	let DEST = variables.config.targetJS,
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
			.pipe(
				gulpif(isEnv !== 'production', sourcemaps.init())
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
					isEnv === 'production',
					babel({
						presets: ["@babel/env"],
					})
				)
			)
			.pipe(
				gulpif(
					isEnv === 'production',
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
			.pipe(gulpif(isEnv !== 'production', headerComment(`Generated on: <%= moment().format('DD.MM.YY') %>`)))
			.pipe(gulpif(isEnv !== 'production', sourcemaps.write(DEST__MAP)))
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
		watch(`${variables.config.sourceSCSS}**/*.scss`, series(buildScss, browserSyncReload));
		watch(`${variables.config.sourceHTML}**/*.html`, series(minifyHtml, browserSyncReload));
	} else {
		watch(`${variables.config.sourceSCSS}**/*.scss`, buildScss);
		watch(`${variables.config.sourceHTML}**/*.html`, minifyHtml);
	}

	// Watch TS Files
	watch(
		[
			`${variables.config.sourceTS}**/*.ts`, //select all files
			`!${variables.config.sourceTS}**/*.min.ts`, //exclude files ends with 'min.ts'
			`!${variables.config.sourceTS}**/_*.ts`, //exclude files starting with '_'
			`!${variables.config.sourceTS}**/__*.ts`, //exclude files starting with '__'
		],
		compileTs
	);

	// Watch JS Files
	watch(
		[
			`${variables.config.sourceJS}**/*.js`, //select all files
			`!${variables.config.sourceJS}**/*.min.js`, //exclude files ends with 'min.js'
			`!${variables.config.sourceJS}**/_*.js`, //exclude files starting with '_'
			`!${variables.config.sourceJS}**/__*.js`, //exclude files starting with '__'
		],
		minifyJs
	);

	cb()
}

// define complex tasks
if (isServer === true) {
	build = series(getGitEnv, clean, browserSyncServe, parallel(buildScss, minifyJs, compileTs, minifyHtml, minifyImg, watchFiles));
	exports.watch = parallel(watchFiles, browserSyncServe);
} else {
	build = series(getGitEnv, clean, parallel(buildScss, minifyJs, compileTs, minifyHtml, minifyImg, watchFiles));
	exports.watch = watchFiles;
}

// export tasks
exports.build = build;
exports.default = build;

exports.clean = clean;
exports.html = minifyHtml;
exports.ts = compileTs;
exports.js = minifyJs;
exports.img = minifyImg;
exports.css = buildScss;
