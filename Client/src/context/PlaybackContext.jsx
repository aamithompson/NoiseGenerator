//==============================================================================
// Filename: PlaybackContext.jsx
// Author: Aaron Thompson
// Date Created: 5/18/2026
// Last Updated: 5/19/2026
//
// Description: Holds the all the Web Audio components and data, keeping track
// of playstate, nodes, and the source.
//==============================================================================
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { serverURL } from "../data/ServerURL";
//------------------------------------------------------------------------------
// VARIABLE(s)
//------------------------------------------------------------------------------
const PlaybackContext = createContext();

// CONTEXT FUNCTION(s)
//------------------------------------------------------------------------------
export function PlaybackProvider({ children }) {
    //Audio Engine
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const analyserNodeRef = useRef(null);
    const sourceRef = useRef(null);

    //Playback State
    const [audioData, setAudioData] = useState(null);
    const [serverReady, setServerReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const startTimeRef = useRef(0);
    const startOffsetRef = useRef(0);
    const pauseTimeRef = useRef(0);

    //Use Effect
    useEffect(() => {
        audioContextRef.current = new AudioContext();
        gainNodeRef.current = audioContextRef.current.createGain();
        analyserNodeRef.current = audioContextRef.current.createAnalyser();
        analyserNodeRef.current.fftSize = 2048

        return () => {
            //Cleanup
            audioContextRef.current.close()
        }
    }, []);

    async function generateNoise(state) {
        try {
            const response = await fetch(serverURL + '/api/noise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(state)
            });

            
            const data = await response.json();
            setAudioData(data);

            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            pauseTimeRef.current = 0;
            await playAudio(data.samples, data.samplingRate);
        } catch(error) {
            console.error('[ERROR] Could not generate audio noise: ', error);
        }
    }

    async function playAudio(samples, samplingRate, offset=0) {
        const ctx = audioContextRef.current

        //Disconnect old source if existing
        if(sourceRef.current != null) {
            try{
                sourceRef.current.disconnect();
            } catch(error) {

            }
        }

        const buffer = ctx.createBuffer(1, samples.length, parseInt(samplingRate))
        const channelData = buffer.getChannelData(0)
        for(let i = 0; i < samples.length; i++) {
            channelData[i] = samples[i]
        }

        sourceRef.current = ctx.createBufferSource()
        sourceRef.current.buffer = buffer
        sourceRef.current.connect(analyserNodeRef.current)
        analyserNodeRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(ctx.destination)

        sourceRef.current.start(0, offset)
        startTimeRef.current   = ctx.currentTime
        startOffsetRef.current = offset
        setIsPlaying(true)
    }

    async function stopAudio(reset=false) {
        if(sourceRef.current == null) return

        if(reset) {
            pauseTimeRef.current = 0
        } else {
            pauseTimeRef.current = startOffsetRef.current + 
                (audioContextRef.current.currentTime - startTimeRef.current)
        }

        sourceRef.current.stop()
        setIsPlaying(false)
    }

    async function downloadAudio() {
        if(audioData == null) return;
        console.log("downloading")

        const samples = audioData.samples;
        const sampleRate = audioData.samplingRate;
        const numSamples = samples.length;

        // WAV header is 44 bytes
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);

        // RIFF header
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);        // chunk size
        view.setUint16(20, 1, true);         // PCM format
        view.setUint16(22, 1, true);         // mono
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true); // byte rate
        view.setUint16(32, 2, true);         // block align
        view.setUint16(34, 16, true);        // bits per sample
        writeString(view, 36, 'data');
        view.setUint32(40, numSamples * 2, true);

        // Write samples as 16-bit PCM
        for(let i = 0; i < numSamples; i++) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(44 + i * 2, s * 0x7FFF, true);
        }

        // Trigger download
        const blob = new Blob([buffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `noise_${audioData.noiseType}_${sampleRate}hz_${audioData.duration}s.wav`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function writeString(view, offset, string) {
        for(let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    return (
        <PlaybackContext.Provider value={{
            analyserNodeRef,
            gainNodeRef,
            audioData,
            serverReady, setServerReady,
            isPlaying,
            pauseTimeRef,
            startTimeRef,
            startOffsetRef,
            audioContextRef,
            generateNoise,
            playAudio,
            stopAudio,
            downloadAudio
        }}>
            {children}
        </PlaybackContext.Provider>
    );
}

export function usePlayback() {
    return useContext(PlaybackContext);
}
//==============================================================================
//==============================================================================