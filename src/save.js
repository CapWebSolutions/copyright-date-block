import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { fallbackCurrentYear, showStartingYear, startingYear } = attributes;
    const currentYear = new Date().getFullYear().toString();

    // Instead of returning just the copyright symbol, 
    //    let’s add a condition that if fallbackCurrentYear is not set, 
    //    return null. It’s generally better to save no HTML in the 
    //    database than incomplete data.
    if ( ! fallbackCurrentYear ) {
        return null;
    }

    let displayDate;

    if ( showStartingYear && startingYear ) {
        displayDate = startingYear + '–' + fallbackCurrentYear;
    } else {
        displayDate = fallbackCurrentYear;
    }

    return (
        <p { ...useBlockProps.save() }>© { displayDate }</p>
    );
}