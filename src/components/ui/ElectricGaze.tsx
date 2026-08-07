import React, { useEffect, useRef } from 'react';

const bayer = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];

export default function ElectricGaze({
  imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let imgCanvas = document.createElement('canvas');
    let imgCtx = imgCanvas.getContext('2d');
    let imageData: ImageData | null = null;

    const config = {
      cellSize: 9,
      contrast: 158,
      animSpeed: 100,
      animIntensity: 60,
      tint: "#3ca6ff",
      tintOpacity: 0
    };

    const applyContrast = (val: number, contrast: number) => {
      // mapped contrast from 0-255 to factor
      // let's assume 158 means high contrast
      let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      let new_val = factor * (val - 128) + 128;
      return Math.max(0, Math.min(255, new_val));
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      if (img.complete && img.naturalWidth > 0 && imgCtx) {
        // Draw image cover
        imgCanvas.width = width;
        imgCanvas.height = height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const ctxRatio = width / height;
        let renderWidth = width;
        let renderHeight = height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (imgRatio > ctxRatio) {
          renderWidth = height * imgRatio;
          offsetX = (width - renderWidth) / 2;
        } else {
          renderHeight = width / imgRatio;
          offsetY = (height - renderHeight) / 2;
        }

        imgCtx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        imageData = imgCtx.getImageData(0, 0, width, height);
      }
    };

    img.onload = resize;
    window.addEventListener('resize', resize);
    resize();

    const draw = (time: number) => {
      animationFrameId = requestAnimationFrame(draw);
      
      if (!imageData || !ctx) return;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const data = imageData.data;
      const cellSize = config.cellSize;
      
      const t = time * 0.001 * (config.animSpeed / 100);

      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          // sample center of cell
          const sx = Math.min(x + Math.floor(cellSize / 2), width - 1);
          const sy = Math.min(y + Math.floor(cellSize / 2), height - 1);
          
          const index = (sy * width + sx) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          // luminance
          let lum = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // contrast
          lum = applyContrast(lum, config.contrast - 100); 
          // 158 is likely a slider 0-200. let's assume 100 is normal.

          // shimmer animation
          // simple sine wave based on x, y, and time
          const shimmer = Math.sin(x * 0.01 + y * 0.01 + t * 4) * (config.animIntensity / 100) * 50;
          lum += shimmer;
          
          lum = Math.max(0, Math.min(255, lum));

          // Bayer dither threshold (0-255)
          const bayerValue = (bayer[(y / cellSize) % 4][(x / cellSize) % 4] / 16) * 255;

          if (lum > bayerValue) {
            // Dither cell drawn
            ctx.fillStyle = config.tintOpacity > 0 ? config.tint : `rgb(${r}, ${g}, ${b})`;
            
            // Draw primitive (a small square or dot)
            // if we want a dither look, we can draw a dot or square
            const size = cellSize * 0.8; 
            const offset = (cellSize - size) / 2;
            
            ctx.fillRect(x + offset, y + offset, size, size);
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageUrl]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black rounded-[2rem]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
