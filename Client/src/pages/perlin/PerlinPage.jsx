//==============================================================================
// Filename: PerlinPage.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/21/2026
//
// Description: Perlin page html.
//==============================================================================
import ControlsSidebar from '../../components/ControlsSidebar';
import PerlinNoiseSetings from './PerlinNoiseSettings';
import PerlinImageSettings from './PerlinImageSettings';
import CanvasArea from '../../components/CanvasArea';
import PerlinCanvasDisplay from './PerlinCanvasDisplay';
import PerlinCanvasButtons from './PerlinCanvasButtons';
import { PerlinSettingsProvider } from '../../context/PerlinSettingsContext';
import { PerlinImageProvider } from '../../context/PerlinImageContext';
//------------------------------------------------------------------------------
//HTML FUNCTIONS
//------------------------------------------------------------------------------
export default function PerlinPage() {
    return (
      <PerlinSettingsProvider>
        <PerlinImageProvider>
          <div className="perlinContent">
            <CanvasArea>
              <PerlinCanvasDisplay/>
              <PerlinCanvasButtons/>
            </CanvasArea>
            <ControlsSidebar>
              <PerlinNoiseSetings/>
              <PerlinImageSettings/>
            </ControlsSidebar>
          </div>
        </PerlinImageProvider>
      </PerlinSettingsProvider>
    );
}
//==============================================================================
//==============================================================================