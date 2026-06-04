//==============================================================================
// Filename: VoronoiImageSettings.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Image Settings for the voronoi page.
//==============================================================================
import { useSettings } from '../../context/VoronoiSettingsContext'

import VNConstraints from "../../../../Shared/Constraints/VoronoiNoiseConstraints.json";
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function VoronoiImageSettings() {
    const { width, setWidth, height, setHeight } = useSettings();

    const settings = VNConstraints.settings;

    return (
        <section className="voronoiImageSettings">
            <h2>Image</h2>
            {/* Image Size */}
            <div>
                <span>Size</span>
                {/* Width */}
                <div className='voronoiSizeX voronoiSize'>
                    <span>W: </span>
                    <input 
                        type="number" min={settings.width.min} max={settings.width.max}
                        value={width}
                        onChange={e => {
                            const val = Math.min(settings.width.max, Math.max(settings.width.min, parseInt(e.target.value)));
                            setWidth(val);
                        }}
                    />
                </div>

                {/* Height */}
                <div className='voronoiSizeY voronoiSize'>
                    <span>H: </span>
                    <input 
                        type="number" min={settings.height.min} max={settings.height.max}
                        value={height}
                        onChange={e => {
                            const val = Math.min(settings.height.max, Math.max(settings.height.min, parseInt(e.target.value)));
                            setHeight(val);
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
//==============================================================================
//==============================================================================