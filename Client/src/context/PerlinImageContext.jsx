//==============================================================================
// Filename: PerlinImageContexy.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/21/2026
//
// Description: Holds the all the visual components for the perlin image
// generation and display.
//==============================================================================
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { serverURL } from "../data/ServerURL";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const PerlinImageContext = createContext();

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function PerlinImageProvider({ children }) {
    const [imageData, setImageData] = useState(null);

    async function generateNoise(state) {
        const response = await fetch(serverURL + '/api/perlin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(state)
        });

        const data = await response.json();
        setImageData(data);
    }

    return (
        <PerlinImageContext.Provider value={{
            imageData, 
            generateNoise
        }}>
            {children}
        </PerlinImageContext.Provider>
    );
}

export function useImage() {
    return useContext(PerlinImageContext);
}
//==============================================================================
//==============================================================================