<?php
/**
 * Enqueue assets when needed.
 *
 * @package before-you-go
 */

declare( strict_types=1 );

namespace Before_You_Go\Assets;

use Asset_Loader;
use Before_You_Go\Post_Types\BYG_Page;

/**
 * Connect namespace functions to actions and hooks.
 */
function bootstrap() : void {
	if ( ! function_exists( 'Asset_Loader\\enqueue_asset' ) ) {
		trigger_error( 'Before You Go plugin expects humanmade/asset-loader to be installed and active' );
		return;
	}

	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_frontend_scripts' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
}

/**
 * Choose the appropriate manifest, based on whether the dev server is running.
 *
 * @return string|null Manifest path, or null if no manifest found.
 */
function get_manifest() : ?string {
	$plugin_path = trailingslashit( plugin_dir_path( dirname( __FILE__, 1 ) ) );

	return Asset_Loader\Manifest\get_active_manifest( [
		$plugin_path . 'build/development-asset-manifest.json',
		$plugin_path . 'build/production-asset-manifest.json',
	] );
}

/**
 * Use Asset_Loader to register scripts using the same function signature as wp_register_script.
 *
 * @param string   $handle       Script handle.
 * @param string   $asset        Name of script in asset manifest.
 * @param string[] $dependencies Array of script dependencies.
 */
function register_build_asset( $handle, $asset, $dependencies = [] ) : void {
	$manifest = get_manifest();

	if ( empty( $manifest ) ) {
		trigger_error( "No manifest available for $asset", E_USER_WARNING );
		return;
	}

	Asset_Loader\register_asset( $manifest, $asset, [
		'handle' => $handle,
		'dependencies' => $dependencies,
	] );
}

/**
 * Render
 *
 * @return string
 */
function byg_script() : string {

	$target_link = BYG_Page\get_latest_byg_permalink();

	if ( empty( $target_link ) ) {
		return '';
	}

	$inline_script = [
		'window.BYG = window.BYG || {};',
		sprintf(
			'window.BYG.debug = %s;',
			( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? 'true' : 'false'
		),
		sprintf(
			'window.BYG.referrers = %s;',
			wp_json_encode(
				/**
				 * Permit customization of the referrers which trigger BYG functionality.
				 *
				 * @param string[] $trigger_referrers Referrers which trigger BYG initialization.
				 */
				apply_filters( 'byg/referrers', [ 't.co', 'twitter.com', 'facebook.com' ] )
			)
		),
		sprintf(
			'window.BYG.utmSources = %s;',
			wp_json_encode(
				/**
				 * Permit customization of the utm_source values which trigger BYG functionality.
				 *
				 * @param string[] $trigger_sources utm_source values which trigger BYG initialization.
				 */
				apply_filters( 'byg/utm_sources', [ 'Twitter', 'Facebook' ] )
			)
		),
		sprintf( 'window.BYG.url = "%s";', esc_url( $target_link ) ),
	];

	return implode( "\n", $inline_script );
}

/**
 * Enqueue frontend assets.
 *
 * @return void
 */
function enqueue_frontend_scripts() : void {
	register_build_asset(
		'byg-frontend',
		'before-you-go-frontend.js',
		/**
		 * Allow a theme or plugin to integrate with this plugin by registering
		 * a custom script as a dependency of our BYG frontend script. If the
		 * dependency script defines a BYG global with a custom callback or
		 * trigger, that will alter the behavior of the BYG activation.
		 *
		 * @param string[] $dependencies Script handles to load ahead of the frontend bundle.
		 */
		apply_filters( 'byg\script_dependencies', [] )
	);

	wp_add_inline_script( 'byg-frontend', byg_script() );

	wp_enqueue_script( 'byg-frontend' );
}

/**
 * Enqueue block editor assets.
 *
 * @return void
 */
function enqueue_block_editor_assets() : void {
	register_build_asset(
		'byg-editor',
		'before-you-go-editor.js',
		/**
		 * Allow a theme or plugin to integrate with this plugin by registering
		 * a custom script as a dependency of our BYG frontend script. If the
		 * dependency script defines a BYG global with a custom callback or
		 * trigger, that will alter the behavior of the BYG activation.
		 *
		 * @param string[] $dependencies Script handles to load ahead of the frontend bundle.
		 */
		apply_filters( 'byg\editor_script_dependencies', [ 'altis-analytics-audience-ui' ] )
	);

	wp_enqueue_script( 'byg-editor' );
}
