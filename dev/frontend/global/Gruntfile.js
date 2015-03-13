module.exports = function(grunt)
{
	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg: pkg,
		ver: pkg.version,

		sass: {
			dist: {
				options: {
					style: 'normal',
					sourcemap: 'none'
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

		cssmin: {
			options: {
				sourceMap: true
			},
			target: {
				files: {
					'styles/app.min.css' : 'styles/app.css'
				}
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

		uglify: {
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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default tasks
	grunt.registerTask('CSS', ['sass', 'autoprefixer', 'cssmin']);
	grunt.registerTask('JS',  ['concat', 'uglify']);
};
