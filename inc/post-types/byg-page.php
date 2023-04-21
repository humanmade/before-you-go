<?php
/**
 * Set up the BYG Page post type.
 *
 * @package before-you-go
 */

namespace Before_You_Go\Post_Types\BYG_Page;

const POST_TYPE = 'byg-page';

const AUDIENCE_META_KEY = 'byg-audience';

/**
 * Connect namespace functions to actions and hooks.
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_type' );
	add_filter( 'manage_byg-page_posts_columns', __NAMESPACE__ . '\\add_audience_column' );
	add_action( 'manage_pages_custom_column', __NAMESPACE__ . '\\output_byg_page_audience', 10, 2 );

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
		'menu_name'           => esc_html__( 'Before You Go', 'byg-admin' ),
	];

	$args = [
		'labels'              => $labels,
		'hierarchical'        => true,
		'description'         => 'Before You Go pages are used to display customizable content to users leaving the site after visiting from social media.',
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_admin_bar'   => false,
		'show_in_rest'        => true, // Enables block editor.
		'menu_icon'           => 'dashicons-arrow-left',
		'show_in_nav_menus'   => false,
		'publicly_queryable'  => true,
		'exclude_from_search' => true,
		'has_archive'         => false,
		'query_var'           => 'byg',
		'capability_type'     => 'post',
		'supports'            => [
			'title',
			'custom-fields',
			'editor',
		],
		'rewrite' => [
			'slug'       => 'byg',
			'with_front' => false,
			'pages'      => false,
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

	register_post_meta( POST_TYPE, AUDIENCE_META_KEY, [
		'type' => 'integer',
		'single' => true,
		'description' => __(
			'Target audience for this before-you-go page.',
			'byg-admin'
		),
		'show_in_rest' => [
			'schema' => [
				'type' => 'integer',
			],
		],
	] );
}

/**
 * Add a column for "audience" to the post list table for BYG posts.
 *
 * @param array $post_columns Array of column titles, keyed by column ID.
 * @return array Filtered array of list table column titles.
 */
function add_audience_column( $post_columns ) {
	return array_merge(
		array_slice( $post_columns, 0, -1 ),
		[ 'audience' => __( 'Audience', 'byg-admin' ) ],
		array_slice( $post_columns, -1 )
	);
}

/**
 * Render the content of the "audience" list table column.
 *
 * @param string $column_name Key of column to output.
 * @param int $post_id ID of current post.
 * @return void
 */
function output_byg_page_audience( $column_name, $post_id ) {
	if ( $column_name !== 'audience' ) {
		return;
	}

	$audience_id = get_post_meta( $post_id, AUDIENCE_META_KEY, true );
	echo $audience_id ? get_the_title( $audience_id ) : esc_html__( 'No audience defined', 'byg-admin' );
}

/**
 * Return the URL of the most recent BYG item, if there is one.
 *
 * @return array|null Array containing permalinks and audience IDs for BYG pages.
 */
function get_byg_pages() : ?array {
	$byg_posts = get_posts( [
		'post_type'   => POST_TYPE,
		'numberposts' => 100,
		'orderby' => 'menu_order',
	] );

	if ( empty( $byg_posts ) ) {
		return null;
	}

	return array_map(
		function ( $post ) {
			return [
				'permalink' => get_permalink( $post->ID ),
				'audience' => (int) get_post_meta( $post->ID, AUDIENCE_META_KEY, true ),
			];
		},
		$byg_posts
	);
}
