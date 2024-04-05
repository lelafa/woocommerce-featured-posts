<?php
/**
 * Plugin Name:       featured-post 
 * Description:       Plugin to display featured post
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:        featured-post
 *
 * @package           lelafa
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function my_block_enqueue() {
    wp_enqueue_script(
        'my-block-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-data' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
}

add_action( 'enqueue_block_editor_assets', 'my_block_enqueue' );
