//==============================================================================
// Filename: PerlinCanvasDisplay.jsx
// Author: Aaron Thompson
// Date Created: 5/20/2026
// Last Updated: 5/21/2026
//
// Description: Canvas display for perlin noise after generation.
//==============================================================================
import { useImage } from '../../context/PerlinImageContext';
import { useRef, useEffect } from 'react'
//------------------------------------------------------------------------------
export default function PerlinCanvasDisplay() {
// VARIABLE(s)
//------------------------------------------------------------------------------
    const { imageData } = useImage();
    const canvasRef = useRef(null);

    useEffect(() => {
        if(imageData == null || canvasRef == null) {
            return;
        }
        
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
                    const value = Math.floor(imageData.data[x][y] * 255);
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
        <div className="perlinCanvasWrapper">
            <canvas 
                className="perlinCanvasDisplay"
                ref={canvasRef}
                style={{ flex: 1 }}
            />
        </div>
    );
}

//==============================================================================
//==============================================================================