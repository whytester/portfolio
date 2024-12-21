import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, TextareaControl, __experimentalNumberControl as NumberControl, Panel, CheckboxControl } from '@wordpress/components';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { blockHeight, mobileBlockHeight, midScreenBlockHeight, options, isFixed } = attributes;

	const blockProps = useBlockProps( {
		className: `finisher-header ${ isFixed ? 'finisher-header--is-fixed' : '' }`,
		style: { height: `${ blockHeight }px` },
	} );

	const dialogRef = useRef( null );
	const [ copyMessage, setCopyMessage ] = useState( '' );

	const openDialog = () => {
		if ( dialogRef.current ) {
			dialogRef.current.showModal();
		}
	};

	const closeDialog = () => {
		if ( dialogRef.current ) {
			dialogRef.current.close();
		}
		setCopyMessage( '' );
	};

	const jsonCode = `{
		"count": 6,
		"size": {
		  "min": 1100,
		  "max": 1300,
		  "pulse": 0
		},
		"speed": {
		  "x": {
			"min": 0.1,
			"max": 0.3
		  },
		  "y": {
			"min": 0.1,
			"max": 0.3
		  }
		},
		"colors": {
		  "background": "#9138e5",
		  "particles": [
			"#6bd6ff",
			"#ffcb57",
			"#ff333d"
		  ]
		},
		"blending": "overlay",
		"opacity": {
		  "center": 1,
		  "edge": 0.1
		},
		"skew": -2,
		"shapes": [
		  "c"
		]
	  }`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText( jsonCode ).then(
			() => {
				setCopyMessage( 'Code copied to clipboard!' );
				setTimeout( () => setCopyMessage( '' ), 2000 ); // Clear message after 2 seconds
			},
			() => {
				setCopyMessage( 'Failed to copy code. Please try again.' );
				setTimeout( () => setCopyMessage( '' ), 2000 ); // Clear message after 2 seconds
			}
		);
	};

	useEffect( () => {
		// Initialize the canvas animation
		if ( options ) {
			const optionsObject = JSON.parse( options );
			const header = new window.FinisherHeader( optionsObject );
		}

		// Cleanup function to remove canvas on unmount
		return () => {
			const canvas = document.getElementById( 'finisher-canvas' );
			if ( canvas ) {
				canvas.remove();
			}
		};
	}, [ options ] );

	let content = '';

	if ( options ) {
		content = <div { ...blockProps }>
			<InnerBlocks />
		</div>;
	} else {
		content = <div className="animated-header__block-instructions">Please paste the options code into the &quot;Animated header&quot; textarea in the right hand sidebar. <p>The options code can be generated <a href="https://www.finisher.co/lab/header/" target="_blank" rel="noreferrer">here</a>.</p>  <p>Only copy the options code within and including the curly braces.<a href="#" onClick={ openDialog }>See example JSON Code</a></p>
			<dialog ref={ dialogRef } className="animated-header__dialog-box">
				<a href="#" onClick={ closeDialog } className="animated-header__close-dialog">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="currentColor"
					>
						<path d="M18 6L6 18M6 6l12 12" stroke="#FF4B4B" strokeWidth="2" />
					</svg>
				</a>
				<p>
					{ jsonCode }
				</p>
				<button onClick={ copyToClipboard }>
					Copy Code
				</button>
				{ copyMessage && <p className="animated-header__action-text">{ copyMessage }</p> }
			</dialog>
		</div>;
	}

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title={ 'Settings' }>

						<NumberControl
							label="Small screen Block height (px)"
							value={ mobileBlockHeight }
							onChange={ ( newMobileBlockHeight ) => setAttributes( { mobileBlockHeight: parseInt( newMobileBlockHeight ) } ) }
						/>

						<NumberControl
							label="Medium screen Block height (px)"
							value={ midScreenBlockHeight }
							onChange={ ( newMidScreenBlockHeight ) => setAttributes( { midScreenBlockHeight: parseInt( newMidScreenBlockHeight ) } ) }
						/>

						<NumberControl
							label="Large screen Block height (px)"
							value={ blockHeight }
							onChange={ ( newBlockHeight ) => setAttributes( { blockHeight: parseInt( newBlockHeight ) } ) }
						/>

						<TextareaControl
							label="Animated header options"
							value={ options }
							onChange={ ( newOptions ) => setAttributes( { options: newOptions } ) }
						/>

						<CheckboxControl
							__nextHasNoMarginBottom
							label="Fix to top of the page"
							help="When set any content blocks within the animated header will also remain fixed"
							checked={ isFixed }
							onChange={ ( newFixedState ) => setAttributes( { isFixed: newFixedState } ) }
						/>

					</PanelBody>
				</Panel>
			</InspectorControls>
			{ content }
		</>
	);
};

registerBlockType( metadata, {
	edit: Edit,
	save: ( ) => {
		return (
			<InnerBlocks.Content />
		);
	},
} );
