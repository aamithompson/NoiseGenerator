//==============================================================================
// Filename: VoronoiCanvasDisplay.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/5/2026
//
// Description: Canvas display for voronoi noise after generation.
//==============================================================================
import "./VoronoiCanvasDisplay.css"

import { useImage } from '../../context/VoronoiImageContext';
import { useRef, useEffect } from 'react'
//------------------------------------------------------------------------------
export default function VoronoiCanvasDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { imageData, canvasRef } = useImage();

    useEffect(() => {
        if(imageData == null || canvasRef == null) {
            return;
        }
        
        console.log(imageData)
        const canvasCtx = canvasRef.current.getContext('2d');

// DRAW FUNCTION(s)
//------------------------------------------------------------------------------
        function drawToCanvas() {
            const WIDTH = imageData.width;
            const HEIGHT = imageData.height;

            canvasRef.current.width = WIDTH;
            canvasRef.current.height = HEIGHT;

            const canvasCtxImgData = canvasCtx.createImageData(imageData.width, imageData.height);

            for(let x = 0; x < WIDTH; x++) {
                for(let y = 0; y < HEIGHT; y++) {
                    const value = Math.floor(imageData.data[y][x] * 255);
                    const index = (x + y * WIDTH) * 4;
                    canvasCtxImgData.data[index] = value;        // R
                    canvasCtxImgData.data[index + 1] = value;    // G
                    canvasCtxImgData.data[index + 2] = value;    // B
                    canvasCtxImgData.data[index + 3] = 255;      // A
                }
            }

            canvasCtx.putImageData(canvasCtxImgData, 0, 0);
        }

        drawToCanvas();
// DESTRUCTOR
//------------------------------------------------------------------------------
        return () => {

        }
    }, [imageData]);

// HTML FUNCTION(s)
//------------------------------------------------------------------------------

    return (
        <div className="perlinCanvasArea">
            <div className="perlinCanvasWrapper">
                <canvas 
                    className="perlinCanvasDisplay"
                    ref={canvasRef}
                    style={{ flex: 1 }}
                />
            </div>
        </div>
    );
}

//==============================================================================
//==============================================================================