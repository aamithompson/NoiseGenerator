//==============================================================================
// Filename: PerlinNoiseSettings.jsx
// Author: Aaron Thompson
// Date Created: 5/21/2026
// Last Updated: 5/22/2026
//
// Description: Noise Settings for the perlin page.
//==============================================================================
import './PerlinNoiseSettings.css'
import { useState } from 'react';
import { useSettings } from '../../context/PerlinSettingsContext'
import { filterTypes } from '../../data/PerlinFilterTypes';

import PNConstraints from "../../../../Shared/Constraints/PerlinNoiseConstraints.json";
//------------------------------------------------------------------------------
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function PerlinNoiseSettings() {
    const { octaves, setOctaves } = useSettings();
    const { lacunarity, setLacunarity} = useSettings();
    const { persistence, setPersistence } = useSettings();
    const { selectedFilter, setSelectedFilter } = useSettings();

    const [filterSelectionExpanded, setFilterSelectionExpanded] = useState(false);
    const settings = PNConstraints.settings;

    return (
        <section className="perlinNoiseSettings">
            <h2>Noise Type</h2>
            {/* Octaves */}
            <div>
                <span>Octaves</span>
                <input 
                    type="range" min={settings.octaves.min} max={settings.octaves.max} step="1"
                    value={octaves}
                    onChange={e => setOctaves(parseInt(e.target.value))}
                />
                <input
                    type="number" min={settings.octaves.min} max={settings.octaves.max} step="1"
                    value={octaves}
                    onChange={e => setOctaves(parseInt(e.target.value))}
                />
            </div>

            {/* Lacunarity */}
            <div>
                <span>Lacunarity</span>
                <input 
                    type="range" min={settings.lacunarity.min} max={settings.lacunarity.max} step="0.1"
                    value={lacunarity}
                    onChange={e => setLacunarity(parseFloat(e.target.value))}
                />
                <input
                    type="number" min={settings.lacunarity.min} max={settings.lacunarity.max} step="0.1"
                    value={lacunarity}
                    onChange={e => setLacunarity(parseFloat(e.target.value))}
                />
            </div>

            {/* Persistence */}
            <div>
                <span>Persistence</span>
                <input 
                    type="range" min={settings.persistence.min} max={settings.persistence.max} step="0.05"
                    value={persistence}
                    onChange={e => setPersistence(parseFloat(e.target.value))}
                />
                <input
                    type="number" min={settings.persistence.min} max={settings.persistence.max} step="0.05"
                    value={persistence}
                    onChange={e => setPersistence(parseFloat(e.target.value))}
                />
            </div>

            {/* Filters */}
            <div>
                <button 
                    className={filterSelectionExpanded ? 'filterTypeExpandToggleOn' : 'filterTypeExpandToggleOff'}
                    onClick={() => setFilterSelectionExpanded(!filterSelectionExpanded)}
                >
                    {filterSelectionExpanded ? '-' : '+'}
                </button>
                <span>Filter: {filterTypes[selectedFilter].label}</span>
            </div>

            <ul className={`filterTypeSelection ${filterSelectionExpanded ? 'filterTypeSelectionExpanded' : 'filterTypeSelectionCollapsed'}`}>
                {filterTypes.map((filter, index) => (
                    <li key={filter.label}><button
                        className={index === selectedFilter ? 'selectedFilter' : ''}
                        onClick={() => setSelectedFilter(index)}
                    >
                        {filter.label}
                    </button></li>
                ))}
            </ul>
        </section>
    );
}
//==============================================================================
//==============================================================================