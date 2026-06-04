//==============================================================================
// Filename: VoronoiImageContext.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Holds the all the visual components for the voronoi image
// generation and display.
//==============================================================================
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { serverURL } from "../data/ServerURL";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const VoronoiImageContext = createContext();

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function VoronoiImageProvider({ children }) {
    const [imageData, setImageData] = useState(null);
    const canvasRef = useRef(null);

    async function generateNoise(state) {
        const response = await fetch(serverURL + '/api/voronoi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(state)
        });

        const data = await response.json();
        setImageData(data);
    }

    async function downloadImage() {
        if(imageData == null || canvasRef == null) {
            return;
        }

        const link = document.createElement('a');
        link.download = `voronoi_${imageData.width}x${imageData.height}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    }

    return (
        <VoronoiImageContext.Provider value={{
            imageData,
            canvasRef,
            generateNoise,
            downloadImage
        }}>
            {children}
        </VoronoiImageContext.Provider>
    );
}

export function useImage() {
    return useContext(VoronoiImageContext);
}
//==============================================================================
//==============================================================================