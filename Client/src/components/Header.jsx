//==============================================================================
// Filename: Header.jsx
// Author: Aaron Thompson
// Date Created: 5/13/2026
// Last Updated: 5/26/2026
//
// Description: Header component for the website which contains the website
// title and navigation bar.
//==============================================================================
import './Header.css'
import { useServerStatus } from '../context/ServerStatusContext';
import { useNavigate } from 'react-router-dom'
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const pages = [
    { label: 'Auditory', path: '/NoiseGenerator/auditory' },
    { label: 'Perlin', path: '/NoiseGenerator/perlin' },
    { label: 'Wavelet', path: '/NoiseGenerator/wavelet' },
    { label: 'Value', path: '/NoiseGenerator/value' },
    { label: 'OpenSimplex', path: '/NoiseGenerator/opensimplex' },
    { label: 'Voronoi', path: '/NoiseGenerator/voronoi' },
]

// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function Header({ref}){
    const navigate = useNavigate();
    const { serverReady } = useServerStatus();

    return (
    //<!-- Header: Title + Tabs -->
        <header ref={ref}>
            <h1>
                Noise Generator
                <div className={`serverConnectionNotification ${serverReady ? "hideServerConnectionNotification" : ""}`}>
                    Server is connecting. . . (May take 30 seconds)
                </div>
            </h1>
            <nav className = "menu">
                {pages.map(page => (
                    <button key={page.path} onClick={() => navigate(page.path)}>
                        {page.label}
                    </button>
                ))}
            </nav>
        </header>
    );
}

//==============================================================================
//==============================================================================