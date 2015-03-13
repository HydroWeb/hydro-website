module.exports = function(grunt)
{
	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg: pkg,
		ver: pkg.version,

		sass: {
			dist: {
				options: {
					style: 'normal'
				},
				files: {
					'styles/app.css' : 'styles/src/app.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 4 versions']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'styles/app.css',
				dest: 'styles/'
			}
		},

		concat: {
			options: {
				stripBanners: true
			},
			dist: {
				src: 'scripts/src/**/*.js',
				dest: 'scripts/app.js'
			}
		},

		uglifyjs: {
			options: {
				sourceMap: true,
				banner: '/*! HydroWeb <%= pkg.version %> */'
			},
			my_target: {
				files: {
					'scripts/app.min.js' : 'scripts/app.js'
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.renameTask('uglify', 'uglifycss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.renameTask('uglify', 'uglifyjs');

	// Default tasks
	grunt.registerTask('CSS', ['sass', 'autoprefixer'/*, 'uglifycss'*/]);
	grunt.registerTask('JS',  ['concat', 'uglifyjs']);
};
