//==============================================================================
// Filename: CanvasArea.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/18/2026
//
// Description: Canvas area component which contains children which are
// outputs for the respective page.
//==============================================================================
import './CanvasArea.css'
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function CanvasArea({ children }) {

    return (
        <div className="canvasArea">
            <div className="canvasArea-content">
                {children}
            </div>
        </div>
    );
}

//==============================================================================
//==============================================================================