//==============================================================================
// Filename: AuditoryWaveformDisplay.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/19/2026
//
// Description: Canvas display for waveforms of the audio playing.
//==============================================================================
import './AuditoryWaveformDisplay.css'
import { useSettings } from '../../context/AuditorySettingsContext'
import { usePlayback } from '../../context/PlaybackContext'
import { useRef, useEffect } from 'react'
//------------------------------------------------------------------------------
export default function AuditoryWaveformDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { showWaveform } = useSettings();
    const { analyserNodeRef } = usePlayback();
    const canvasRef = useRef(null);

    const COLOR_BACKGROUND = "rgb(183, 183, 183)";
    const COLOR_LINE = "rgb(131, 144, 250)";

    useEffect(() => {
        const waveformCanvas = canvasRef.current;
        const waveformCtx = waveformCanvas.getContext('2d');

        if(analyserNodeRef.current == null) {
            const WIDTH = waveformCanvas.width;
            const HEIGHT = waveformCanvas.height;

            waveformCtx.fillStyle = COLOR_BACKGROUND;
            waveformCtx.fillRect(0, 0, WIDTH, HEIGHT);
            waveformCtx.lineWidth = 1;
            waveformCtx.strokeStyle = COLOR_LINE;
            waveformCtx.beginPath();
            waveformCtx.moveTo(0, HEIGHT/2);
            waveformCtx.lineTo(WIDTH, HEIGHT/2);
            waveformCtx.stroke();
            return;
        }

        const bufferLength = analyserNodeRef.current.fftSize;
        const waveformData = new Uint8Array(bufferLength);

        const resizeObserver = new ResizeObserver(() => {
            waveformCanvas.width = waveformCanvas.clientWidth;
            waveformCanvas.height = waveformCanvas.clientHeight;
        });
        resizeObserver.observe(waveformCanvas);

        let animationId;

// DRAW FUNCTION(s)
//------------------------------------------------------------------------------
        function waveformDraw() {
            animationId = requestAnimationFrame(waveformDraw);

            if(analyserNodeRef.current == null) {
                return;
            }

            const WIDTH = waveformCanvas.width;
            const HEIGHT = waveformCanvas.height;

            analyserNodeRef.current.getByteTimeDomainData(waveformData);

            waveformCtx.fillStyle = COLOR_BACKGROUND;
            waveformCtx.fillRect(0, 0, WIDTH, HEIGHT);
            waveformCtx.lineWidth = 1;
            waveformCtx.strokeStyle = COLOR_LINE;

            const sliceWidth = (WIDTH * 1.0) / bufferLength;
            let x = 0;

            waveformCtx.beginPath();
            for (let i = 0; i < bufferLength; i++) {
                const v = waveformData[i] / 128.0;
                const y = (v * HEIGHT) / 2;

                if (i === 0) {
                    waveformCtx.moveTo(x, y);
                } else {
                    waveformCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            waveformCtx.lineTo(WIDTH, HEIGHT / 2);
            waveformCtx.stroke();
        }

        waveformDraw();

// DESTRUCTOR
//------------------------------------------------------------------------------
        return () => { 
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        }
    }, [analyserNodeRef.current]);

// HTML FUNCTION(s)
//------------------------------------------------------------------------------
    return (
        <canvas 
            className={`waveformDisplay ${!showWaveform ? "hideWaveformDisplay" : ""}`}
            ref={canvasRef}
            style={{ flex: 1 }}
        />
    );
}
//==============================================================================
//==============================================================================