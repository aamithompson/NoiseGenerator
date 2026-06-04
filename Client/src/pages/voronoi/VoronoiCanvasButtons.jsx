//==============================================================================
// Filename: VoronoiCanvasButtons.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Buttons to utilize the voronoi canvas, e.g. generation, download,
// etc.
//==============================================================================
import { useSettings } from "../../context/VoronoiSettingsContext";
import { useImage } from "../../context/VoronoiImageContext";
import { useServerStatus } from "../../context/ServerStatusContext";
//------------------------------------------------------------------------------
export default function VoronoiCanvasButtons() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { cellSize, width, height } = useSettings();
    const { generateNoise, downloadImage, imageData} = useImage();
    const { serverReady } = useServerStatus();

// STATE FUNCTION(s)
//------------------------------------------------------------------------------
    function getState() {
        const state = {
            cellSize: parseInt(cellSize),
            width: parseInt(width),
            height: parseInt(height)
        }

        return state;
    }

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="voronoiCanvasButtons">
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