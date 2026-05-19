//==============================================================================
// Filename: AuditoryPlaybackDisplay.jsx
// Author: Aaron Thompson
// Date Created: 5/14/2026
// Last Updated: 5/19/2026
//
// Description: Playback controls for the auditory page.
//==============================================================================
import './AuditoryPlaybackDisplay.css';
import { useServerStatus } from '../../context/ServerStatusContext';
import { useSettings } from '../../context/AuditorySettingsContext';
import { usePlayback } from '../../context/PlaybackContext';
import { useRef, useEffect } from 'react';
//------------------------------------------------------------------------------
export default function AuditoryPlaybackDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { serverReady } = useServerStatus(); 
    const { generateNoise, audioData, isPlaying, stopAudio, playAudio, audioContextRef, startTimeRef, startOffsetRef, pauseTimeRef, downloadAudio} = usePlayback();
    const { selectedNoise, volume, samplingRate, duration } = useSettings();
    const sliderRef = useRef(null)
    const isClickingRef = useRef(false)

// REF FUNCTION(s)
//------------------------------------------------------------------------------
    useEffect(() => {
        let animationId

        function playbackDraw() {
            if(isPlaying && !isClickingRef.current && sliderRef.current) {
                const position = startOffsetRef.current + 
                    (audioContextRef.current.currentTime - startTimeRef.current)
                sliderRef.current.value = position  // direct DOM update, no rerender
            }
            animationId = requestAnimationFrame(playbackDraw)
        }

        animationId = requestAnimationFrame(playbackDraw)
        return () => cancelAnimationFrame(animationId)
    }, [isPlaying])

// STATE FUNCTION(s)
//------------------------------------------------------------------------------
    function getState() {
        const state = {
            noiseType: parseInt(selectedNoise),
            volume: parseInt(volume),
            samplingRate: parseInt(samplingRate),
            duration: parseFloat(duration)
        }

        return state;
    }

// HTML FUNCTION(s)
//------------------------------------------------------------------------------
    return (
        <div className="audioPlayback">
            <input 
                className="audioPlaybackSlider" 
                min="0" max={audioData?.duration ?? 0} type="range" step="0.01" defaultValue="0"
                ref={sliderRef}
                onMouseDown={() => {
                    if(audioData == null) {
                        return;
                    }

                    isClickingRef.current = true;

                    if(isPlaying) {
                        stopAudio();
                    }
                }}
                onMouseUp={() => {
                    if(audioData == null) {
                        return;
                    }

                    const value = parseFloat(sliderRef.current.value);
                    const clamped = Math.max(0, Math.min(value, audioData.duration));
                    pauseTimeRef.current = clamped;
                    sliderRef.current.value = clamped;
                    playAudio(audioData.samples, audioData.samplingRate, pauseTimeRef.current);
                    isClickingRef.current = false;
                }}
            />
            <div className="audioPlaybackControls">
                <button
                    className="audioPlaybackStopBtn" 
                    onClick={() => stopAudio(true)}
                >
                    [ ]
                </button>
                <button
                    className="audioPlaybackPauseBtn"
                    onClick={() => stopAudio(false)}
                >
                    | |
                </button>
                <button 
                    className="audioPlaybackPlayBtn" 
                    onClick={() => playAudio(
                        audioData.samples,
                        audioData.samplingRate,
                        pauseTimeRef.current
                    )} disabled={audioData == null}
                >
                    {'>'}
                </button>
            </div>
            <button 
                className={`generateNoiseBtn ${!serverReady ? "inactiveGenerateNoiseBtn" : ""}`}
                onClick={() => generateNoise(getState())} disabled={!serverReady}
            >
                Generate
            </button>
            <button 
                className={`downloadBtn ${audioData == null ? "inactiveDownloadBtn" : ""}`}
                onClick={() => downloadAudio()} disabled={audioData == null}
            >
                Download
            </button>
        </div>
    );
}

//==============================================================================
//==============================================================================