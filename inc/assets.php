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

	$byg_config = BYG_Page\get_byg_pages();

	if ( empty( $byg_config ) ) {
		return '';
	}

	$inline_script = [
		'window.BYG = window.BYG || {};',
		sprintf(
			'window.BYG.debug = %s;',
			( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? 'true' : 'false'
		),
		sprintf(
			'window.BYG.urls = %s;',
			json_encode( $byg_config )
		),
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
		[]
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
		[ 'altis-analytics-audience-ui' ]
	);

	wp_enqueue_script( 'byg-editor' );
}
