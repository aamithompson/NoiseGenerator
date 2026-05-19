//==============================================================================
// Filename: ControlsSidebar.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/18/2026
//
// Description: Controls sidebar component which contains children which are
// inputs for options for the user.
//==============================================================================
import './ControlsSidebar.css'
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function ControlsSidebar({ children }) {

    return (
        <aside className="controlsSidebar">
            <div className="controlsSidebar-content">
                {children}
            </div>
        </aside>
    );
}

//==============================================================================
//==============================================================================