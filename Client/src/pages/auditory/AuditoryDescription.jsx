//==============================================================================
// Filename: AuditoryDecription.jsx
// Author: Aaron Thompson
// Date Created: 5/18/2026
// Last Updated: 5/18/2026
//
// Description: Description section for the auditory page.
//==============================================================================
import { useSettings } from '../../context/AuditorySettingsContext';
import { noiseTypes } from '../../data/AuditoryNoiseTypes';
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------

export default function AuditoryDescription() {
    const { selectedNoise } = useSettings();

    const currentNoise = noiseTypes[selectedNoise];

    return(
        <section className="descriptionSection">
            <h2 className="descriptionTitle">
                {currentNoise.description.title}
            </h2>
            <p className="descriptionText">
                {currentNoise.description.description}
            </p>
        </section>
    )
}
//==============================================================================
//==============================================================================