//==============================================================================
// Filename: PerlinCanvasButtons.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/20/2026
//
// Description: Buttons to utilize the perlin canvas, e.g. generation, download,
// etc.
//==============================================================================

//------------------------------------------------------------------------------
export default function PerlinCanvasButtons() {

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="perlinCanvasButtons">
            <button 
                className="generateNoiseBtn"
                onClick={() => {}} disabled={!true}
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