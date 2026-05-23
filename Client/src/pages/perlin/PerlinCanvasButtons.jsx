//==============================================================================
// Filename: PerlinCanvasButtons.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/22/2026
//
// Description: Buttons to utilize the perlin canvas, e.g. generation, download,
// etc.
//==============================================================================
import './PerlinCanvasButtons.css'
import { useSettings } from "../../context/PerlinSettingsContext";
import { useImage } from "../../context/PerlinImageContext";
import { useServerStatus } from "../../context/ServerStatusContext";
//------------------------------------------------------------------------------
export default function PerlinCanvasButtons() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { octaves, lacunarity, persistence, width, height, selectedFilter } = useSettings();
    const { generateNoise, downloadImage, imageData} = useImage();
    const { serverReady } = useServerStatus();

// STATE FUNCTION(s)
//------------------------------------------------------------------------------
    function getState() {
        const state = {
            octaves: parseInt(octaves),
            lacunarity: parseFloat(lacunarity),
            persistence: parseFloat(persistence),
            width: parseInt(width),
            height: parseInt(height),
            filter: selectedFilter,
            filterProperties: 0
        }

        return state;
    }

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="perlinCanvasButtons">
            <button 
                className={`generateNoiseBtn ${!serverReady ? "inactiveGenerateNoiseBtn" : ""}`}
                onClick={() => generateNoise(getState())} disabled={!serverReady}
            >
                Generate
            </button>

            <button 
                className={`downloadBtn ${imageData == null ? "inactiveDownloadBtn" : ""}`}
                onClick={() => downloadImage()} disabled={imageData == null}
            >
                Download
            </button>
        </div>
    );
}
//==============================================================================
//==============================================================================