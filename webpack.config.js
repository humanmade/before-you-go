const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
    ...defaultConfig,
	externals: {
		...( defaultConfig.externals || {} ),
		'@altis/analytics': 'Altis.Analytics',
	},
};
