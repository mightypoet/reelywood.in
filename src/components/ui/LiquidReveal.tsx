import React, { useEffect, useRef } from 'react';

interface LiquidRevealProps {
  baseSrc: string;
  revealSrc: string;
}

export default function LiquidReveal({ baseSrc, revealSrc }: LiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mainCanvas = mainCanvasRef.current;
    if (!container || !mainCanvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = mainCanvas.getContext('2d', { willReadFrequently: true, alpha: true });
    if (!ctx) return;

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d', { willReadFrequently: true });
    
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d', { willReadFrequently: true });

    let width = 0;
    let height = 0;
    
    let pointerX = -1000;
    let pointerY = -1000;
    let lastPointerX = -1000;
    let lastPointerY = -1000;
    
    let drawing = false;
    let idle = 0;
    let points: { x: number, y: number }[] = [];
    let rAFId = 0;

    const revealImg = new Image();
    revealImg.crossOrigin = "anonymous";
    let imgLoaded = false;
    revealImg.onload = () => {
      imgLoaded = true;
      resize();
    };
    revealImg.src = revealSrc;

    function resize() {
      if (!container || !mainCanvas || !coverCtx || !brushCtx) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      mainCanvas.width = width * dpr;
      mainCanvas.height = height * dpr;
      mainCanvas.style.width = `${width}px`;
      mainCanvas.style.height = `${height}px`;

      coverCanvas.width = width * dpr;
      coverCanvas.height = height * dpr;

      const radius = brushRadius * dpr;
      const diam = Math.ceil(radius * 2);
      brushCanvas.width = diam;
      brushCanvas.height = diam;

      if (imgLoaded) {
        // Object-fit: cover math
        const imgW = revealImg.width;
        const imgH = revealImg.height;
        const scale = Math.max(coverCanvas.width / imgW, coverCanvas.height / imgH);
        const x = (coverCanvas.width / 2) - (imgW / 2) * scale;
        const y = (coverCanvas.height / 2) - (imgH / 2) * scale;
        
        coverCtx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
        coverCtx.drawImage(revealImg, x, y, imgW * scale, imgH * scale);
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    function onPointerMove(e: PointerEvent) {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      
      const radius = brushRadius * dpr;
      
      if (
        x < -radius || x > mainCanvas.width! + radius ||
        y < -radius || y > mainCanvas.height! + radius
      ) {
        lastPointerX = -1000;
        lastPointerY = -1000;
        drawing = false;
        return;
      }
      
      drawing = true;
      
      if (lastPointerX === -1000) {
        lastPointerX = x;
        lastPointerY = y;
      }
      
      const dx = x - lastPointerX;
      const dy = y - lastPointerY;
      const dist = Math.hypot(dx, dy);
      
      const step = Math.max(radius * 0.3, 1);
      const n = Math.min(Math.ceil(dist / step), 60);
      
      if (n > 0) {
        for (let i = 1; i <= n; i++) {
          points.push({
            x: lastPointerX + dx * (i / n),
            y: lastPointerY + dy * (i / n)
          });
        }
      } else {
        points.push({ x, y });
      }
      
      lastPointerX = x;
      lastPointerY = y;
    }

    window.addEventListener('pointermove', onPointerMove);

    function stamp(x: number, y: number) {
      if (!brushCtx || !coverCtx || !ctx) return;
      const radius = brushRadius * dpr;
      const diam = Math.ceil(radius * 2);
      
      brushCtx.clearRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = 'source-over';
      const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.55, 'rgba(255,255,255,0.82)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diam, diam);
      
      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(
        coverCanvas,
        x - radius, y - radius, diam, diam,
        0, 0, diam, diam
      );
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brushCanvas, x - radius, y - radius);
    }

    function tick() {
      if (!ctx || !mainCanvas) return;
      
      if (points.length > 0) {
        idle = 0;
      } else {
        idle++;
        if (idle > 120) {
          ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
          rAFId = requestAnimationFrame(tick);
          return;
        }
      }
      
      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
      
      if (drawing) {
        for (const pt of points) {
          stamp(pt.x, pt.y);
        }
        points = [];
      }
      
      rAFId = requestAnimationFrame(tick);
    }
    
    rAFId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rAFId);
    };
  }, [revealSrc]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <img 
        src={baseSrc} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      <canvas 
        ref={mainCanvasRef} 
        aria-hidden="true" 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 block" 
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
