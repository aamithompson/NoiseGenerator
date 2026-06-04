//==============================================================================
// Filename: VoronoiNoiseSettings.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Noise Settings for the voronoi page.
//==============================================================================
import { useSettings } from '../../context/VoronoiSettingsContext'

import VNConstraints from "../../../../Shared/Constraints/VoronoiNoiseConstraints.json";
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function VoronoiNoiseSettings() {
    const { cellSize, setCellSize } = useSettings();

    const settings = VNConstraints.settings;

    return (
        <section className="voronoiNoiseSettings">
            <h2>Noise Type</h2>
            {/* Cell Size */}
            <div>
                <span>Cell Size</span>
                <input 
                    type="range" min={settings.cellSize.min} max={settings.cellSize.max} step="1"
                    value={cellSize}
                    onChange={e => setCellSize(parseInt(e.target.value))}
                />
                <input
                    type="number" min={settings.cellSize.min} max={settings.cellSize.max} step="1"
                    value={cellSize}
                    onChange={e => setCellSize(parseInt(e.target.value))}
                />
            </div>
        </section>
    );
}
//==============================================================================
//==============================================================================