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
	$frontend_asset_file = include( plugin_dir_path( __DIR__ ) . 'build/frontend.asset.php');

	wp_register_script(
		'byg-frontend',
		plugins_url( 'build/frontend.js', __DIR__ ),
		$frontend_asset_file['dependencies'],
		$frontend_asset_file['version']
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
	$editor_asset_file = include( plugin_dir_path( __DIR__ ) . 'build/editor.asset.php');

	wp_register_script(
		'byg-editor',
		plugins_url( 'build/editor.js', __DIR__ ),
		$editor_asset_file['dependencies'],
		$editor_asset_file['version']
	);

	wp_enqueue_script( 'byg-editor' );
}
