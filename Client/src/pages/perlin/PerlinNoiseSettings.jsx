//==============================================================================
// Filename: PerlinNoiseSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/21/2026
//
// Description: Noise Settings for the perlin page.
//==============================================================================
import { useSettings } from '../../context/PerlinSettingsContext'
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function PerlinNoiseSettings() {
    const { octaves, setOctaves, lacunarity, setLacunarity, persistence, setPersistence } = useSettings();

    return (
        <section className="perlinNoiseSettings">
            <h2>Noise Type</h2>
            {/* Octaves */}
            <div>
                <span>Octaves</span>
                <input 
                    type="range" min="1" max="16" step="1"
                    value={octaves}
                    onChange={e => setOctaves(parseInt(e.target.value))}
                />
                <input
                    type="number" min="1" max="16" step="1"
                    value={octaves}
                    onChange={e => setOctaves(parseInt(e.target.value))}
                />
            </div>

            {/* Lacunarity */}
            <div>
                <span>Lacunarity</span>
                <input 
                    type="range" min="1" max="4" step="0.1"
                    value={lacunarity}
                    onChange={e => setLacunarity(parseFloat(e.target.value))}
                />
                <input
                    type="number" min="1" max="4" step="0.1"
                    value={lacunarity}
                    onChange={e => setLacunarity(parseFloat(e.target.value))}
                />
            </div>

            {/* Persistence */}
            <div>
                <span>Persistence</span>
                <input 
                    type="range" min="0" max="1" step="0.05"
                    value={persistence}
                    onChange={e => setPersistence(parseFloat(e.target.value))}
                />
                <input
                    type="number" min="0" max="1" step="0.05"
                    value={persistence}
                    onChange={e => setPersistence(parseFloat(e.target.value))}
                />
            </div>
        </section>
    );
}
//==============================================================================
//==============================================================================