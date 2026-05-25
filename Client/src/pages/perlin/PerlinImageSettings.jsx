//==============================================================================
// Filename: PerlinImageSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/25/2026
//
// Description: Image Settings for the perlin page.
//==============================================================================
import { useSettings } from '../../context/PerlinSettingsContext'

import PNConstraints from "../../../../Shared/Constraints/PerlinNoiseConstraints.json";
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function PerlinImageSettings() {
    const { width, setWidth, height, setHeight } = useSettings();

    const settings = PNConstraints.settings;

    return (
        <section className="perlinImageSettings">
            <h2>Image</h2>
            {/* Image Size */}
            <div>
                <span>Size</span>
                {/* Width */}
                <div className='perlinSizeX perlinSize'>
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
                <div className='perlinSizeY perlinSize'>
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