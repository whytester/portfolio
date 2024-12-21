<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

  $blockHeight = '600';
  if(isset( $attributes['blockHeight'] )) {
	$blockHeight = $attributes['blockHeight'];
  }

  $midScreenBlockHeight = '600';
  if(isset( $attributes['midScreenBlockHeight'] )) {
	$midScreenBlockHeight = $attributes['midScreenBlockHeight'];
  } 

  $mobileBlockHeight = '600';
  if(isset( $attributes['mobileBlockHeight'] )) {
	$mobileBlockHeight = $attributes['mobileBlockHeight'];
  }

  $className =  "finisher-header";
  if(isset( $attributes['isFixed']) &&  $attributes['isFixed'] == true ) {
	$className  .= ' finisher-header--is-fixed ';
  }

  $id = "finisher-header-" . rand();

 ?>
 <style>
	@media  (max-width: 768px) {
		<?php echo "#$id" ?> {
			height: <?php echo $mobileBlockHeight ?>px;
		}
	}

	@media  (min-width: 769px) and (max-width: 1200px) {
		<?php echo "#$id" ?> {
			height: <?php echo $midScreenBlockHeight ?>px;
		}
	}

	@media  (min-width: 1201px) {
		<?php echo "#$id" ?> {
			height: <?php echo $blockHeight ?>px;
		}
	}
?>
 </style>
 <div id="<?php echo $id ?>" <?php echo get_block_wrapper_attributes( array( 'class' => $className, 'style' => $blockHeight .'px'  ) ); ?>>
 <?php echo $content; ?>
 </div>
 <?php
	if(isset($attributes['options'])) {
		echo '<script type="text/javascript">';
		echo 'new FinisherHeader('. $attributes['options'] .')';
		echo '</script>';
	}
?>