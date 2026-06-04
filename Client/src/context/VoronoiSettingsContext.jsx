//==============================================================================
// Filename: VoronoiSettingsContext.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Holds the state variables for the voronoi page to pass between
// components and functions.
//==============================================================================
import { createContext, useContext, useState } from "react";

import VNConstraints from "../../../Shared/Constraints/VoronoiNoiseConstraints.json";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const VoronoiSettingsContext = createContext();

const settings = VNConstraints.settings;

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function VoronoiSettingsProvider({ children }) {
    const[cellSize, setCellSize] = useState(settings.cellSize.default);
    const[width, setWidth] = useState(settings.width.default);
    const[height, setHeight] = useState(settings.height.default);

    return (
        <VoronoiSettingsContext.Provider value={{ 
            cellSize, 
            setCellSize,
            width, 
            setWidth, 
            height, 
            setHeight}}
        >
            {children}
        </VoronoiSettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(VoronoiSettingsContext);
}
//==============================================================================
//==============================================================================