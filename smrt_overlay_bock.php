<?php
/**
 * Plugin Name: Backcground Overlay Gutenberg Block
 * Description: A custom block that creates a section with background image, overlay and padding controls
 * Version: 1.0.0
 * Author: Alexander Trejo
 */

function loadOverlayBlock() {
  //load assets for back-end
  wp_enqueue_script('smrt-overlay-block', plugin_dir_url(__FILE__) . 'block.js', array('wp-blocks','wp-editor'), true);
}

function loadOverlayBlockAssets(){
  //Load assets in front and back end
  wp_enqueue_style('smrt-overlay-block-css', plugin_dir_url(__FILE__) . 'block.css');
}
   
add_action('enqueue_block_editor_assets', 'loadOverlayBlock');
add_action('enqueue_block_assets', 'loadOverlayBlockAssets');