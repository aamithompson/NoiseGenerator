//==============================================================================
// Filename: PerlinImageSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/21/2026
//
// Description: Image Settings for the perlin page.
//==============================================================================
import { useSettings } from '../../context/PerlinSettingsContext'
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function PerlinImageSettings() {
    const { width, setWidth, height, setHeight } = useSettings();

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
                        type="number" min="1" max="1024"
                        value={width}
                        onChange={e => {
                            const val = Math.min(1024, Math.max(1, parseInt(e.target.value)));
                            setWidth(val);
                        }}
                    />
                </div>

                {/* Height */}
                <div className='perlinSizeY perlinSize'>
                    <span>H: </span>
                    <input 
                        type="number" min="1" max="1024"
                        value={height}
                        onChange={e => {
                            const val = Math.min(1024, Math.max(1, parseInt(e.target.value)));
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