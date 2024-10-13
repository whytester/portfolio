import { InspectorControls, useSettings } from '@wordpress/block-editor';
import { FontSizePicker, __experimentalNumberControl as NumberControl} from '@wordpress/components';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import './editor.scss';

export const enableMobileFontOnBlocks = [
	'core/paragraph','core/heading','core/query-title'
];

const addInspectorControls = (BlockEdit) => {	
	return ( props ) => {

		if ( ! enableMobileFontOnBlocks.includes( props.name ) ) {
			return <BlockEdit key="edit" { ...props } />
		}

		const { attributes, setAttributes } = props;
		const { mobileFontSize, mobileLineHeight } = attributes;

		const [availableFontSizes] = useSettings('typography.fontSizes');
		const fallbackFontSize = 16;

		const classes = classNames({
			'has-mobile-font-sizes': mobileFontSize,
			'has-mobile-line-height': mobileLineHeight
		  });
		
		  const customStyle = {
			...(attributes.style || {}),  // Get existing inline styles
			...(mobileFontSize ? { '--mobile-font-size': mobileFontSize } : {}),
			...(mobileLineHeight ? { '--mobile-line-height': `${mobileLineHeight}` } : {}),
		};

		return (
			<>
				
				<div className={classes} style={customStyle}>
					<BlockEdit key="edit" { ...props } />
				</div>
                
				<InspectorControls group="typography">
					<div className="full-width-control-wrapper">
						<h2>
							{ __( 'Mobile Font Size', 'textdomain' ) }
						</h2>
						<FontSizePicker
							fontSizes={ availableFontSizes }
							value={ mobileFontSize }
							fallbackFontSize={ fallbackFontSize }
							withSlider={ true }
							onChange={ ( newMobileFontSize ) => {
								setAttributes( {mobileFontSize: newMobileFontSize} );
							} }
						/>
						<br />
						<h2>
							{ __( 'Mobile Line Height', 'textdomain' ) }
						</h2>
						<NumberControl
							isShiftStepEnabled={ true }
							onChange={ (newMobileLineHeight) => setAttributes( {mobileLineHeight: newMobileLineHeight }) }
							step={ 0.1 }
							spinControls="custom"
							value={ mobileLineHeight }
						/>
					</div>
				</InspectorControls>
			</>
		);
	};
}
				

addFilter( 'editor.BlockEdit', 'add-mobile-font-controls', addInspectorControls );

addFilter(
	'blocks.registerBlockType',
	'add-mobile-font-attributes',
	( settings, name ) => {
		if ( ! enableMobileFontOnBlocks.includes( name ) ) {
			return settings;
		}
		return {
			...settings,
			attributes: {
				...settings.attributes,
				mobileFontSize: { type: 'string' },
				mobileLineHeight: { type: 'string' },
			},
		};
	}
);
