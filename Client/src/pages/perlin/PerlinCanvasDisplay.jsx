//==============================================================================
// Filename: PerlinCanvasDisplay.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/20/2026
//
// Description: Canvas display for perlin noise after generation.
//==============================================================================
import { useRef, useEffect } from 'react'
//------------------------------------------------------------------------------
export default function PerlinCanvasDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const canvasRef = useRef(null);

    useEffect(() => {

// DRAW FUNCTION(s)
//------------------------------------------------------------------------------
 
// DESTRUCTOR
//------------------------------------------------------------------------------
        return () => {

        }
    }, []);

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="perlinCanvasWrapper">
            <canvas 
                className="perlinCanvasDisplay"
                ref={canvasRef}
                style={{ flex: 1 }}
            />
        </div>
    );
}

//==============================================================================
//==============================================================================