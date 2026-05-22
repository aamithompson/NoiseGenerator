//==============================================================================
// Filename: PerlinSettingsContext.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/21/2026
//
// Description: Holds the state variables for the perlin page to pass between
// components and functions.
//==============================================================================
import { createContext, useContext, useState } from "react"
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const PerlinSettingsContext = createContext();

const DEFAULT_OCTAVES = 4;
const DEFAULT_LACUNARITY = 2.0;
const DEFAULT_PERSISTENCE=0.5
const DEFAULT_WIDTH = 128;
const DEFAULT_HEIGHT = 128;
const DEFAULT_FILTER = 0;

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function PerlinSettingsProvider({ children }) {
    const[octaves, setOctaves] = useState(DEFAULT_OCTAVES);
    const[lacunarity, setLacunarity] = useState(DEFAULT_LACUNARITY);
    const[persistence, setPersistence] = useState(DEFAULT_PERSISTENCE);
    const[width, setWidth] = useState(DEFAULT_WIDTH);
    const[height, setHeight] = useState(DEFAULT_HEIGHT);
    const[selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);

    return (
        <PerlinSettingsContext.Provider value={{ 
            octaves, 
            setOctaves, 
            lacunarity, 
            setLacunarity, 
            persistence, 
            setPersistence, 
            width, 
            setWidth, 
            height, 
            setHeight}}
        >
            {children}
        </PerlinSettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(PerlinSettingsContext);
}
//==============================================================================
//==============================================================================