<?php


use WP_HTML_Tag_Processor;

class MobileDimensionsSettings {


	public static function init() {
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_assets' ) );
		add_filter( 'render_block_core/paragraph', array( __CLASS__, 'render_block' ), 10, 2 );
		add_filter( 'render_block_core/heading', array( __CLASS__, 'render_block' ), 10, 2 );
		add_filter( 'render_block_core/group', array( __CLASS__, 'render_block' ), 10, 2 );
	}

	public static function render_block( $block_content, $block ) {

		$mobile_spacing = isset( $block['attrs']['mobileSpacingCSSValues'] ) ? $block['attrs']['mobileSpacingCSSValues'] : false;

		if ( ! $mobile_spacing ) {
			return $block_content;
		}

		$mobile_padding = isset( $mobile_spacing['padding'] ) ? $mobile_spacing['padding'] : [];
    	$mobile_margin = isset( $mobile_spacing['margin'] ) ? $mobile_spacing['margin'] : [];

		if ( ! $mobile_padding && !$mobile_margin ) {
			return $block_content;
		}

		$block      = new WP_HTML_Tag_Processor( $block_content );
		$new_styles = '';
		if ( $block->next_tag() ) {
			wp_enqueue_style( self::$asset_handle );
			$current_style = $block->get_attribute( 'style' );

			foreach($mobile_spacing as $dimension => $metric) {
				$sides = array( 'top', 'bottom', 'left', 'right' );
				foreach ( $sides as $side ) {
					if ( isset( $metric[ $side ] ) && $metric[ $side ] > 0 ) {
						$block->add_class( "has-mobile-{$dimension}--{$side}" );
						$new_styles .= "--mobile-{$dimension}-{$side}: {$metric[$side]};";
					}
				}
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
