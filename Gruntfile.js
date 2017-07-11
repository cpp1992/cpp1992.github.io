module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			build: ['dist/css'],
		},
		sass: {
			expanded: {
				options: {
					style: 'expanded',
				},
				files: [{
					src: 'components/index.scss',
					dest: 'dist/css/fairy.css',
				}],
			},
			compressed: {
				options: {
					style: 'compressed',
				},
				files: [{
					src: 'components/index.scss',
					dest: 'dist/css/fairy.min.css',
				}],
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', [
		'clean',
		'sass',
	]);
};
