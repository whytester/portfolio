import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntitytProp } from '@wordpress/core-data';
import { PanelBody, TextControl } from '@wordpress/components';
import metaData from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes , setAttributes , context: { postType , postId } } ) {

	const [ meta, updateMeta ] = useEntitytProp( 'postType' , postType , 'meta' , postId );

	const updateSingleMetaValue = (metaKey , value) => {
		updateMeta( {
			...meta, 
			[metaKey]: value 
		})
	}

	return (
		<>
		<div { ...useBlockProps() }>
			{ __( 'Update Meta Skeleton', metaData.textdomain ) }
		</div>
			<InspectorControls>
				<PanelBody title={ __(`${metaData.title} settings` , metaData.textdomain ) }>
					<small>MetaKey field</small>

					<TextControl
						//value={ meta['metaKeyName'] }
						onChange={ (newValue) => { updateSingleMetaValue('metaKeyName' , newValue) } }
						//placeholder={ 'metakeyname' }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
