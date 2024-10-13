<?php

use WP_HTML_Tag_Processor;

class MobileFontSettings {

	public static function init() {
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_assets' ) );
		add_filter( 'render_block_core/paragraph', array( __CLASS__, 'render_block' ), 10, 2 );
		add_filter( 'render_block_core/heading', array( __CLASS__, 'render_block' ), 10, 2 );
	}

	public static function render_block( $block_content, $block ) {

		$mobile_font_size   = isset( $block['attrs']['mobileFontSize'] ) ? $block['attrs']['mobileFontSize'] : false;
		$mobile_line_height = isset( $block['attrs']['mobileLineHeight'] ) ? $block['attrs']['mobileLineHeight'] : false;
		if ( ! $mobile_font_size && ! $mobile_line_height ) {
			return $block_content;
		}

		$block      = new WP_HTML_Tag_Processor( $block_content );
		$new_styles = '';
		if ( $block->next_tag() ) {
			wp_enqueue_style( self::$asset_handle );
			$current_style = $block->get_attribute( 'style' );
			if ( $mobile_font_size ) {
				$block->add_class( 'has-mobile-font-sizes' );
				$new_styles .= "--mobile-font-size: $mobile_font_size;";
			}
			if ( $mobile_line_height ) {
				$block->add_class( 'has-mobile-line-height' );
				$new_styles .= "--mobile-line-height: {$mobile_line_height};";
			}
			$updated_style = $current_style . ';' . $new_styles;
			$block->set_attribute( 'style', $updated_style );
		}
		$block_content = $block->get_updated_html();
		return $block_content;
	}

	public static function enqueue_block_assets() {
		// dependent on build p[rocess and environment
	}

	public static function enqueue_block_editor_assets() {
		// dependent on build p[rocess and environment
	}
}
