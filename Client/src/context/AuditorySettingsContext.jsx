//==============================================================================
// Filename: AuditoryContext.jsx
// Author: Aaron Thompson
// Date Created: 5/18/2026
// Last Updated: 5/19/2026
//
// Description: Holds the state variables for the auditory page to pass between
// components and functions.
//==============================================================================
import { createContext, useContext, useState } from "react"

import ANConstraints from "../../../Shared/Constraints/AuditoryNoiseConstraints.json";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const AuditorySettingsContext = createContext()

const settings = ANConstraints.settings; 

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function AuditorySettingsProvider({ children }) {
    const[selectedNoise, setSelectedNoise] = useState(settings.noiseType.default);
    const[volume, setVolume] = useState(settings.volume.default);
    const[samplingRate, setSamplingRate] = useState(settings.samplingRate.default);
    const[duration, setDuration] = useState(settings.duration.default);
    const[showWaveform, setShowWaveform] = useState(true);
    const[showSpectrogram, setShowSpectrogram] = useState(true);

    return (
        <AuditorySettingsContext.Provider value={{ selectedNoise, setSelectedNoise, volume, setVolume, samplingRate, setSamplingRate, duration, setDuration, showWaveform, setShowWaveform, showSpectrogram, setShowSpectrogram}}>
            {children}
        </AuditorySettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(AuditorySettingsContext);
}
//==============================================================================
//==============================================================================