//==============================================================================
// Filename: VoronoiPage.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Voronoi page html.
//==============================================================================
import './VoronoiPage.css'
import ControlsSidebar from '../../components/ControlsSidebar';
import VoronoiImageSettings from './VoronoiImageSettings';
import VoronoiNoiseSettings from './VoronoiNoiseSettings';
import VoronoiDescription from './VoronoiDescription';
import CanvasArea from '../../components/CanvasArea';
import VoronoiCanvasButtons from './VoronoiCanvasButtons';
import VoronoiCanvasDisplay from './VoronoiCanvasDisplay';
import { VoronoiSettingsProvider } from '../../context/VoronoiSettingsContext';
import { VoronoiImageProvider } from '../../context/VoronoiImageContext';
//------------------------------------------------------------------------------
//HTML FUNCTIONS
//------------------------------------------------------------------------------
export default function VoronoiPage() {
    return (
      <VoronoiSettingsProvider>
        <VoronoiImageProvider>
          <div className="voronoiContent">
            <CanvasArea>
              <VoronoiCanvasDisplay/>
              <VoronoiCanvasButtons/>
            </CanvasArea>
            <ControlsSidebar>
              <VoronoiNoiseSettings/>
              <hr/>
              <VoronoiImageSettings/>
              <hr/>
              <VoronoiDescription/>
            </ControlsSidebar>
          </div>
        </VoronoiImageProvider>
      </VoronoiSettingsProvider>
    );
}
//==============================================================================
//==============================================================================