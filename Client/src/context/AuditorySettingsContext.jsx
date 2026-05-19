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
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const AuditorySettingsContext = createContext()

const STARTING_VOLUME = 50;
const STARTING_SAMPLING_RATE = 44100;
const STARTING_DURATION = 5;

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function AuditorySettingsProvider({ children }) {
    const[selectedNoise, setSelectedNoise] = useState(0);
    const[volume, setVolume] = useState(STARTING_VOLUME);
    const[samplingRate, setSamplingRate] = useState(STARTING_SAMPLING_RATE);
    const[duration, setDuration] = useState(STARTING_DURATION);
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