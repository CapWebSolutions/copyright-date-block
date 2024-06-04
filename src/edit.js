/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
    const { fallbackCurrentYear, showStartingYear, startingYear } = attributes;

    // Get the current year and make sure it's a string.
    const currentYear = new Date().getFullYear().toString();

	// Ensure this code only runs once when the block is initialized. 
	//   To do so, you can use the useEffect React hook.

    // When the block loads, set the fallbackCurrentYear attribute to the
    // current year if it's not already set.
    useEffect( () => {
        if ( currentYear !== fallbackCurrentYear ) {
            setAttributes( { fallbackCurrentYear: currentYear } );
        }
    }, [ currentYear, fallbackCurrentYear, setAttributes ] );

	// When the block is initialized in the Editor, the fallbackCurrentYear 
	//   attribute will be immediately set. This value will then be available 
	//   to the save() function, and the correct block content will be displayed 
	//   without block validation errors
	
	let displayDate;

	if ( showStartingYear && startingYear ) {
		displayDate = startingYear + '-' + currentYear;
	} else {
		displayDate = currentYear;
	}

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'copyright-date-block' ) }>
                    <ToggleControl
                        checked={ !! showStartingYear }
                        label={ __(
                            'Show starting year',
                            'copyright-date-block'
                        ) }
                        onChange={ () =>
                            setAttributes( {
                                showStartingYear: ! showStartingYear,
                            } )
                        }
                    />
                    { showStartingYear && (
                        <TextControl
                            label={ __(
                                'Starting year',
                                'copyright-date-block'
                            ) }
                            value={ startingYear || '' }
                            onChange={ ( value ) =>
                                setAttributes( { startingYear: value } )
                            }
                        />
                    ) }
                </PanelBody>
            </InspectorControls>
            <p { ...useBlockProps() }>© { displayDate }</p>
        </>
    );
}
