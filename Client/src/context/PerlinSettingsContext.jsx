//==============================================================================
// Filename: PerlinSettingsContext.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/25/2026
//
// Description: Holds the state variables for the perlin page to pass between
// components and functions.
//==============================================================================
import { createContext, useContext, useState } from "react";

import PNConstraints from "../../../Shared/Constraints/PerlinNoiseConstraints.json";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const PerlinSettingsContext = createContext();

const settings = PNConstraints.settings;

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function PerlinSettingsProvider({ children }) {
    const[octaves, setOctaves] = useState(settings.octaves.default);
    const[lacunarity, setLacunarity] = useState(settings.lacunarity.default);
    const[persistence, setPersistence] = useState(settings.persistence.default);
    const[width, setWidth] = useState(settings.width.default);
    const[height, setHeight] = useState(settings.height.default);
    const[selectedFilter, setSelectedFilter] = useState(settings.filter.default);

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
            setHeight,
            selectedFilter,
            setSelectedFilter}}
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