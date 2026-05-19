//==============================================================================
// Filename: AuditoryNoiseSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/18/2026
//
// Description: Noise Settings for the auditory page.
//==============================================================================
import './AuditoryNoiseSettings.css';
import { useSettings } from '../../context/AuditorySettingsContext'
import { noiseTypes } from '../../data/AuditoryNoiseTypes';
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function AuditoryNoiseSettings() {
    const { selectedNoise, setSelectedNoise } = useSettings();

    function handleNoiseSelection(index) {
        setSelectedNoise(index);
    }

    return (
        <section className="auditoryNoiseSettings">
            <h2>Noise Type</h2>
            <div className="noiseButtons">
                {noiseTypes.map((noise, index) => (
                    <button
                        key={noise.label}
                        className={index === selectedNoise ? 'noiseBtnSelected' : ''}
                        onClick={() => handleNoiseSelection(index)}
                    >
                        {noise.label}
                    </button>
                ))}
            </div>
        </section>
    );
}
//==============================================================================
//==============================================================================