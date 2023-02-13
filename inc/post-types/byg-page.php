<?php
/**
 * Set up the BYG Page post type.
 *
 * @package before-you-go
 */

namespace Before_You_Go\Post_Types\BYG_Page;

const POST_TYPE = 'byg-page';

/**
 * Connect namespace functions to actions and hooks.
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_type' );
}

/**
 * Register custom post type for Before You Go pages.
 *
 * Uses cta-box as slug for backwards compatibility.
 *
 * @return void
 */
function register_type() {
	$labels = [
		'name'                => esc_html__( 'Before You Go pages', 'byg-admin' ),
		'singular_name'       => esc_html__( 'Before You Go page', 'byg-admin' ),
		'add_new'             => esc_html__( 'Add New Before You Go page', 'byg-admin' ),
		'add_new_item'        => esc_html__( 'Add New Before You Go page', 'byg-admin' ),
		'edit_item'           => esc_html__( 'Edit Before You Go page', 'byg-admin' ),
		'new_item'            => esc_html__( 'New Before You Go page', 'byg-admin' ),
		'view_item'           => esc_html__( 'View Before You Go page', 'byg-admin' ),
		'search_items'        => esc_html__( 'Search Before You Go pages', 'byg-admin' ),
		'not_found'           => esc_html__( 'No Before You Go page found', 'byg-admin' ),
		'not_found_in_trash'  => esc_html__( 'No Before You Go page found in Trash', 'byg-admin' ),
		'menu_name'           => esc_html__( 'Before You Go pages', 'byg-admin' ),
	];

	$args = [
		'labels'              => $labels,
		'hierarchical'        => false,
		'description'         => 'Before You Go pages are used to display customizable content to users leaving the site after visiting from social media.',
		'public'              => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-back',
		'show_in_nav_menus'   => false,
		'publicly_queryable'  => false,
		'exclude_from_search' => true,
		'has_archive'         => false,
		'query_var'           => POST_TYPE,
		'capability_type'     => 'post',
		'supports'            => [
			'title',
			'custom-fields',
			'editor',
		],
		/**
		 * Permit filtering the list of taxonomies added to the BYG Page post types.
		 *
		 * Sites may want to drive triggers of BYG content using specific terms or categories.
		 *
		 * @param string[] $taxonomies List of taxonomy slugs to permit on BYG Page items.
		 */
		'taxonomies' => apply_filters( 'byg\taxonomies_byg-page', [] ),
	];

	register_post_type( POST_TYPE, $args );
}
