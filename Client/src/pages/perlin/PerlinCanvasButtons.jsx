//==============================================================================
// Filename: PerlinCanvasButtons.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/21/2026
//
// Description: Buttons to utilize the perlin canvas, e.g. generation, download,
// etc.
//==============================================================================
import { useSettings } from "../../context/PerlinSettingsContext";
import { useImage } from "../../context/PerlinImageContext";
//------------------------------------------------------------------------------
export default function PerlinCanvasButtons() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { octaves, lacunarity, persistence, width, height } = useSettings();
    const { generateNoise } = useImage();

// STATE FUNCTION(s)
//------------------------------------------------------------------------------
    function getState() {
        const state = {
            octaves: parseInt(octaves),
            lacunarity: parseFloat(lacunarity),
            persistence: parseFloat(persistence),
            width: parseInt(width),
            height: parseInt(height),
            filter: 0,
            filterProperties: 0
        }

        return state;
    }

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="perlinCanvasButtons">
            <button 
                className="generateNoiseBtn"
                onClick={() => generateNoise(getState())} disabled={!true}
            >
                Generate
            </button>

            <button 
                className="downloadBtn"
                onClick={() => {}} disabled={!true}
            >
                Download
            </button>
        </div>
    );
}
//==============================================================================
//==============================================================================