const { externals, helpers, presets } = require( '@humanmade/webpack-helpers' );

const { choosePort, cleanOnExit, filePath } = helpers;

cleanOnExit( [
	filePath( 'build', 'development-asset-manifest.json' ),
] );

module.exports = choosePort( 9090 ).then( ( port ) => presets.development( {
	name: 'before-you-go',
	devServer: {
		server: 'https',
		port,
	},
	externals: {
		...externals,
		'@altis/analytics': 'Altis.Analytics',
	},
	entry: {
		'before-you-go-editor': filePath( 'src/editor.js' ),
		'before-you-go-frontend': filePath( 'src/frontend.js' ),
	},
} ) );
