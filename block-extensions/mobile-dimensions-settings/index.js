import {__experimentalSpacingSizesControl as SpacesSizesControl, getSpacingPresetCssVar, InspectorControls} from "@wordpress/block-editor"; 
import { __ } from '@wordpress/i18n';
import _ from 'lodash';
import { addFilter } from '@wordpress/hooks';
import classNames from 'classnames';
export const enableMobileDimensionsOnBlocks = [
	'core/paragraph','core/heading','core/group'
];

const addInspectorControls = (BlockEdit) => {
	return ( props ) => {

		if ( ! enableMobileDimensionsOnBlocks.includes( props.name ) ) {
			return <BlockEdit key="edit" { ...props } />
		}

		const { attributes, setAttributes } = props;
		const { mobileSpacing, mobileSpacingCSSValues } = attributes;

		const classes = classNames({
			'has-mobile-padding--top': mobileSpacing.padding.top,
			'has-mobile-padding--right': mobileSpacing.padding.right,
			'has-mobile-padding--bottom': mobileSpacing.padding.bottom,
			'has-mobile-padding--left': mobileSpacing.padding.left,
			'has-mobile-margin--top': mobileSpacing.margin.top, 
			'has-mobile-margin--right': mobileSpacing.margin.right, 
			'has-mobile-margin--bottom': mobileSpacing.margin.bottom, 
			'has-mobile-margin--left': mobileSpacing.margin.left
		});
		
		const customStyle = {};

		const metrics = [ 'padding' , 'margin'];
		const sides = ['top', 'bottom', 'left', 'right'];

		metrics.forEach((type) => {
			sides.forEach((side) => {
				// Construct the CSS variable name and check if the value exists
				const cssVarName = `--mobile-${type}-${side}`;
				const value = mobileSpacingCSSValues[type]?.[side];

				if (value !== undefined) {
					customStyle[cssVarName] = value;
				}
			});
		});

		const updateDimensions = (newDimensions, type) => {
			// update mobileSpacing for the spacer block , update mobileSpacingCSSValues to see preview changes in mobile editor view
			let newMobileSpacing = _.cloneDeep(mobileSpacing);
			newMobileSpacing[type] = _.cloneDeep(newDimensions);
			let newMobileSpacingCSSvars = _.cloneDeep(newMobileSpacing);
			setAttributes( {mobileSpacing : newMobileSpacing});

			metrics.forEach((type) => {
				sides.forEach((side) => {
					if (!newMobileSpacingCSSvars[type]) {
						newMobileSpacingCSSvars[type] = {};
					}
			
					let dimension_setting = newMobileSpacingCSSvars[type][side] || '';
			
					if (dimension_setting) {
						newMobileSpacingCSSvars[type][side] = getSpacingPresetCssVar(dimension_setting);
					}
				});
			});

			setAttributes( {mobileSpacingCSSValues: newMobileSpacingCSSvars})

		}

		return (
			<>
				<div className={classes} style={customStyle}>
					<BlockEdit key="edit" { ...props } />
				</div>
                <InspectorControls group="dimensions">
					<div className="full-width-control-wrapper">
						<h2>Mobile Dimensions</h2>
						<SpacesSizesControl 
							label="padding" 
							onChange={ (newDimensions) => updateDimensions(newDimensions, 'padding') }
							values={ mobileSpacing.padding }
						/>
					</div>
					<div className="full-width-control-wrapper">
						<SpacesSizesControl 
							label="margin" 
							onChange={ (newDimensions) => updateDimensions(newDimensions, 'margin') }
							values={ mobileSpacing.margin }
						/>
					</div>
                </InspectorControls>
			</>
		);
	};
}
				

addFilter( 'editor.BlockEdit', 'add-mobile-dimensions-controls', addInspectorControls );

addFilter(
	'blocks.registerBlockType',
	'add-mobile-dimensions-attributes',
	( settings, name ) => {
		if ( ! enableMobileDimensionsOnBlocks.includes( name ) ) {
			return settings;
		}
		return {
			...settings,
			attributes: {
				...settings.attributes,
				mobileSpacing: { 
					type: 'object', 
					default: {
						"padding" : {
							type: 'object', 
							default: {}
						},
						"margin" : {
							type: 'object', 
							default: {}
						}
					}
				},
				mobileSpacingCSSValues: {
					type: 'object', 
					default: {
						"padding" : {
							type: 'object', 
							default: {}
						},
						"margin" : {
							type: 'object', 
							default: {}
						}
					}
				},
			},
		};
	}
);
