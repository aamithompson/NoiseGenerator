//==============================================================================
// Filename: AuditoryAudioSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/18/2026
//
// Description: Audio Settings for the auditory page.
//==============================================================================
import './AuditoryAudioSettings.css';
import {useSettings} from '../../context/AuditorySettingsContext'
import {usePlayback} from '../../context/PlaybackContext'
import { useState } from "react";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const samplingRates = [
    { label: 'Telephone', samplingRate: 8000 },
    { label: 'Wideband', samplingRate: 16000 },
    { label: 'AM Radio', samplingRate: 22050 },
    { label: 'FM Radio', samplingRate: 32000 },
    { label: 'CD', samplingRate: 44100 },
    { label: 'HD1', samplingRate: 96000 },
    { label: 'HD2', samplingRate: 192000 }
];

// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function AuditoryAudioSettings() {
    const { volume, setVolume } = useSettings();
    const { samplingRate, setSamplingRate } = useSettings();
    const { duration, setDuration } = useSettings();
    const { gainNodeRef } = usePlayback();

    const [samplingRateSelectionExpanded, setSamplingRateSelectionExpanded] = useState(false);

    return (
        <section className="audioSettingsSection">
            <h2>Audio</h2>

            {/* Volume */}
            <div>
                <span>Volume</span>
                <input 
                    type="range" min="0" max="100"
                    value={volume}
                    onChange={e => {
                        setVolume(parseFloat(e.target.value));
                        gainNodeRef.current.gain.value = parseFloat(e.target.value) / 100;
                    }}
                />
                <input 
                    type="number" min="0" max="100"
                    value={volume}
                    onChange={e => {
                        setVolume(parseFloat(e.target.value));
                        gainNodeRef.current.gain.value = parseFloat(e.target.value) / 100;
                    }}
                />
            </div>

            {/* SamplingRate */}
            <div>
                <button 
                    className={samplingRateSelectionExpanded ? 'samplingRateExpandToggleOn' : 'samplingRateExpandToggleOff'}
                    onClick={() => setSamplingRateSelectionExpanded(!samplingRateSelectionExpanded)}
                >
                    {samplingRateSelectionExpanded ? '-' : '+'}
                </button>
                <span>Sampling Rate</span>
                <input 
                    type="range" min="8000" max="192000" step="100"
                    value={samplingRate}
                    onChange={e => setSamplingRate(parseInt(e.target.value))}
                />
                <input 
                    type="number" min="8000" max="192000" step="100"
                    value={samplingRate}
                    onChange={e => setSamplingRate(parseInt(e.target.value))}
                />
            </div>

            <ul className={`samplingRateSelection ${samplingRateSelectionExpanded ? 'samplingRateSelectionExpanded' : 'samplingRateSelectionCollapsed'}`}>
                {samplingRates.map(sr => (
                    <li key={sr.label}><button
                        className={samplingRate === sr.samplingRate ? 'selectedSamplingRate' : ''}
                        onClick={() => setSamplingRate(parseInt(sr.samplingRate))}
                    >
                        {sr.label}
                    </button></li>
                ))}
            </ul>

            {/* Duration */}
            <div>
                <span>Duration</span>
                <input 
                    type="range" min="1" max="30" step="0.1"
                    value={duration}
                    onChange={e => setDuration(parseFloat(e.target.value))}
                />
                <input
                    type="number" min="1" max="30" step="0.1"
                    value={duration}
                    onChange={e => setDuration(parseFloat(e.target.value))}
                />
            </div>
        </section>
    );
}

//==============================================================================
//==============================================================================