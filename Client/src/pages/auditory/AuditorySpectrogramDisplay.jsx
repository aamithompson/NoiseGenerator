//==============================================================================
// Filename: AuditorySpectrogramDisplay.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/19/2026
//
// Description: Canvas display for frequency data of the audio playing.
//==============================================================================
import './AuditorySpectrogramDisplay.css'
import { useSettings } from '../../context/AuditorySettingsContext'
import { usePlayback } from '../../context/PlaybackContext'
import { useRef, useEffect } from 'react'
//------------------------------------------------------------------------------
export default function AuditorySpectrogramDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { analyserNodeRef } = usePlayback();
    const { showSpectrogram } = useSettings();
    const canvasRef = useRef(null);

    const EPSILON = 0.0001;

    useEffect(() => {
        if(analyserNodeRef.current == null) {
            return;
        }

        const spectrogramCanvas = canvasRef.current;
        const spectrogramCtx = spectrogramCanvas.getContext('2d');
        const spectrogramBufferLength = analyserNodeRef.current.frequencyBinCount;
        const spectrogramData = new Uint8Array(spectrogramBufferLength);
        const waveformBufferLength = analyserNodeRef.current.fftSize;
        const waveformData = new Uint8Array(waveformBufferLength)
        let animationId;

// DRAW FUNCTION(s)
//------------------------------------------------------------------------------
        function heatMapColor(amplitude) {
            let r, g, b;
    
            if(amplitude < 64) {
                // black to blue
                r = 0;
                g = 0;
                b = Math.round((amplitude / 63) * 255);
            } else if(amplitude < 128) {
                // blue to red
                const t = (amplitude - 64) / 63;
                r = Math.round(t * 255);
                g = 0;
                b = Math.round((1 - t) * 255);
            } else if(amplitude < 192) {
                // red to yellow
                const t = (amplitude - 128) / 63;
                r = 255;
                g = Math.round(t * 255);
                b = 0;
            } else {
                // yellow to white
                const t = (amplitude - 192) / 63;
                r = 255;
                g = 255;
                b = Math.round(t * 255);
            }
    
            return `rgb(${r}, ${g}, ${b})`;
        }

        function getRMSVolume() {
            analyserNodeRef.current.getByteTimeDomainData(waveformData);
            let sumSquares = 0;
            for(let i = 0; i < waveformBufferLength; i++) {
                const normalized = (waveformData[i] / 128.0) - 1;
                sumSquares += normalized * normalized;
            }
            return Math.sqrt(sumSquares / waveformBufferLength);
        }

        function spectrogramDraw() {
            animationId = requestAnimationFrame(spectrogramDraw);

            if(analyserNodeRef.current == null || getRMSVolume() <= EPSILON) {
                return;
            }

            const WIDTH = spectrogramCanvas.width;
            const HEIGHT = spectrogramCanvas.height;

            analyserNodeRef.current.getByteFrequencyData(spectrogramData);

            spectrogramCtx.drawImage(spectrogramCanvas, -1, 0);

            for(let i = 0; i < spectrogramBufferLength; i++) {
                const amplitude = spectrogramData[i];
                const y = Math.round((1 - i/spectrogramBufferLength) * HEIGHT);
                const binHeight = Math.ceil(HEIGHT / spectrogramBufferLength);

                //color
                spectrogramCtx.fillStyle = heatMapColor(amplitude);
                spectrogramCtx.fillRect(WIDTH - 1, y, 1, binHeight);
            }
        }

        spectrogramDraw();

// DESTRUCTOR
//------------------------------------------------------------------------------
        return () => cancelAnimationFrame(animationId);
    }, [analyserNodeRef.current]);

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <canvas 
            className={`spectrogramDisplay ${!showSpectrogram ? "hideSpectrogramDisplay" : ""}`}
            ref={canvasRef}
        />
    );
}

//==============================================================================
//==============================================================================