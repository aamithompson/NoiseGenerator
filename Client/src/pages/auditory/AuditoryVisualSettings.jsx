//==============================================================================
// Filename: AuditoryVisualSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/19/2026
//
// Description: Visual Settings for the auditory page.
//==============================================================================
import { useSettings } from '../../context/AuditorySettingsContext';
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function AuditoryVisualSettings() {
    const { showWaveform, setShowWaveform, showSpectrogram, setShowSpectrogram } = useSettings();

    return (
        <section id="visualSettingsSection">
            <h2>Visual</h2>
            <label>
                <input 
                    type="checkbox" 
                    checked={showWaveform}
                    onChange={e => setShowWaveform(e.target.checked)}
                />
                Show Waveform
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={showSpectrogram}
                    onChange={e => setShowSpectrogram(e.target.checked)}
                />
                Show Spectrogram
            </label>
        </section>
    );
}

//==============================================================================
//==============================================================================