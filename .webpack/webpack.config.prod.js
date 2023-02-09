require( './restrict-hierarchy-lookup' );

const { externals, helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );

const { filePath } = helpers;

module.exports = presets.production( {
    name: 'before-you-go',
    externals,
    entry: {
        'before-you-go-editor': filePath( 'src/editor.js' ),
        'before-you-go-frontend': filePath( 'src/frontend.js' ),
    },
    plugins: [
        plugins.clean(),
    ],
	cache: {
		type: 'filesystem',
	},
} );
