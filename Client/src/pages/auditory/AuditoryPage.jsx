//==============================================================================
// Filename: AuditoryPage.jsx
// Author: Aaron Thompson
// Date Created: 5/18/2026
// Last Updated: 5/18/2026
//
// Description: Auditory page html.
//==============================================================================
import { AuditorySettingsProvider } from '../../context/AuditorySettingsContext';
import { PlaybackProvider } from '../../context/PlaybackContext'
import ControlsSidebar from '../../components/ControlsSidebar';
import AuditoryNoiseSettings from './AuditoryNoiseSettings';
import AuditoryAudioSettings from './AuditoryAudioSettings';
import AuditoryVisualSettings from './AuditoryVisualSettings';
import AuditoryDescription from './AuditoryDescription';
import CanvasArea from '../../components/CanvasArea';
import AuditoryPlaybackDisplay from './AuditoryPlaybackDisplay';
import AuditoryWaveformDisplay from './AuditoryWaveformDisplay';
import AuditorySpectrogramDisplay from './AuditorySpectrogramDisplay';
//------------------------------------------------------------------------------
//HTML FUNCTIONS
//------------------------------------------------------------------------------
export default function AuditoryPage() {
    return (
        <AuditorySettingsProvider>
          <PlaybackProvider>
            <CanvasArea>
              <AuditoryPlaybackDisplay/>
              <AuditoryWaveformDisplay/>
              <AuditorySpectrogramDisplay/>
            </CanvasArea>
            <ControlsSidebar>
              <AuditoryNoiseSettings/>
              <hr/>
              <AuditoryAudioSettings/>
              <hr/>
              <AuditoryVisualSettings/>
              <hr/>
              <AuditoryDescription/>
            </ControlsSidebar>
          </PlaybackProvider>
        </AuditorySettingsProvider>
    );
}
//==============================================================================
//==============================================================================