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

 function register_featured_post_route() {
    register_rest_route( 'featured-post/v1', '/selected-posts', array(
        'methods' => 'GET',
        'callback' => 'get_selected_posts',
        'permission_callback' => '__return_true'
    ) );
}
function get_selected_posts() {
    // Query for the selected posts
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 5,  // Adjust this value as needed
    );
    $query = new WP_Query( $args );

    // Prepare the post data for the REST API response
    $posts = array();
    while ( $query->have_posts() ) {
        $query->the_post();
        $posts[] = array(
            'ID' => get_the_ID(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
        );
    }

    // Return the post data
    return $posts;
}

add_action( 'rest_api_init', 'register_featured_post_route' );
function my_block_enqueue() {
    wp_enqueue_script(
        'my-block-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-data', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
}

add_action( 'enqueue_block_editor_assets', 'my_block_enqueue' );


add_action( 'admin_menu', 'my_plugin_menu' );

function my_plugin_menu() {
    add_menu_page(
        'Featured Post Options', // Page title
        'Featured Post', // Menu title
        'manage_options', // Capability
        'featured-post', // Menu slug
        'my_plugin_options', // Function to handle the page content
        'dashicons-admin-post', // Icon URL
        3 // Position in menu order
    );
}

function my_plugin_options() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
    }

    $post_1 = get_option('post_1');
    $post_2 = get_option('post_2');
    $post_3 = get_option('post_3');

    echo "Post 1: " . $post_1 . "<br>";
    echo "Post 2: " . $post_2 . "<br>";
    echo "Post 3: " . $post_3 . "<br>";

    ?>
    <div class="wrap">
        <h1>My Plugin</h1>
        <form method="post" action="options.php">
            <?php settings_fields( 'my-plugin-settings-group' ); ?>
            <?php do_settings_sections( 'my-plugin-settings-group' ); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Post 1</th>
                    <td>
                        <select name="post_1">
                            <?php
                            $posts = get_posts();
                            $selected_post_1 = get_option('post_1');
                            foreach ( $posts as $post ) {
                                $selected = $selected_post_1 == $post->ID ? 'selected' : '';
                                echo '<option value="' . $post->ID . '" ' . $selected . '>' . $post->post_title . '</option>';
                            }
                            ?>
                        </select>
                    </td>
                    <th scope="row">Post 2</th>
                    <td>
                        <select name="post_2">
                            <?php
                            $posts = get_posts();
                            $selected_post_1 = get_option('post_2');
                            foreach ( $posts as $post ) {
                                $selected = $selected_post_1 == $post->ID ? 'selected' : '';
                                echo '<option value="' . $post->ID . '" ' . $selected . '>' . $post->post_title . '</option>';
                            }
                            ?>
                        </select>
                    </td>
                    <th scope="row">Post 3</th>
                    <td>
                        <select name="post_3">
                            <?php
                            $posts = get_posts();
                            $selected_post_1 = get_option('post_3');
                            foreach ( $posts as $post ) {
                                $selected = $selected_post_1 == $post->ID ? 'selected' : '';
                                echo '<option value="' . $post->ID . '" ' . $selected . '>' . $post->post_title . '</option>';
                            }
                            ?>
                        </select>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

add_action( 'admin_init', 'my_plugin_settings' );

function my_plugin_settings() {
    register_setting( 'my-plugin-settings-group', 'post_1' );
    register_setting( 'my-plugin-settings-group', 'post_2' );
    register_setting( 'my-plugin-settings-group', 'post_3' );
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'featured-post/v1', '/selected-posts', array(
        'methods' => 'GET',
        'callback' => 'featured-post_get_selected_posts',
    ) );
} );

function my_plugin_get_selected_posts() {
    $post_1 = get_option( 'post_1' );
    $post_2 = get_option( 'post_2' );
    $post_3 = get_option( 'post_3' );

    return array(
        'post_1' => get_post( $post_1 ),
        'post_2' => get_post( $post_2 ),
        'post_3' => get_post( $post_3 ),
    );
}

function render_featured_post_block( $attributes ) {
    $output = '';

    if (isset($attributes['selectedPosts'])) {
        $post_ids = $attributes['selectedPosts'];
        $post_titles = $attributes['postTitles'];
        $post_excerpts = $attributes['postExcerpts'];

        foreach ( $post_ids as $index => $post_id ) {
            $title = isset($post_titles[$index]) ? $post_titles[$index] : '';
            $excerpt = isset($post_excerpts[$index]) ? $post_excerpts[$index] : '';

            $output .= sprintf(
                '<div className="featured-post">
                    <h2 className="featured-post">%s</h2>
                    <span className="post-title">%s</span>
                    <span className="post-excerpt">%s</span>
                </div>',
                esc_attr( $post_id ),
                esc_html( $title ),
                wp_kses_post( $excerpt )
            );
        }
    }

    return $output;
}

register_block_type( 'featured-post/featured-post', array(
    'render_callback' => 'render_featured_post_block',
) );