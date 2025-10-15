import React, { useEffect, useRef, useState } from 'react';

type AuroraHoverProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
  hue: number;
  sat: number;
  light: number;
};

const AuroraHover: React.FC<AuroraHoverProps> = ({ src, alt = '', style, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const [ready, setReady] = useState(false);

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    if (img.complete) setReady(true);
    const onLoad = () => setReady(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    let lastSpawn = 0;

    const ensureOffscreen = () => {
      if (!offscreenRef.current) offscreenRef.current = document.createElement('canvas');
      const off = offscreenRef.current;
      const img = imgRef.current!;
      off.width = img.naturalWidth || img.width;
      off.height = img.naturalHeight || img.height;
      const octx = off.getContext('2d');
      if (!octx) return;
      // Draw current GIF frame; okay on same-origin
      octx.clearRect(0, 0, off.width, off.height);
      octx.drawImage(img, 0, 0, off.width, off.height);
    };

    const sampleHueAt = (clientX: number, clientY: number) => {
      const img = imgRef.current!;
      const off = offscreenRef.current!;
      const octx = off.getContext('2d');
      if (!octx) return 330; // fallback pink-ish
      const rect = img.getBoundingClientRect();
      const ix = ((clientX - rect.left) / rect.width) * off.width;
      const iy = ((clientY - rect.top) / rect.height) * off.height;
      const sx = Math.max(0, Math.min(off.width - 1, Math.floor(ix)));
      const sy = Math.max(0, Math.min(off.height - 1, Math.floor(iy)));
      try {
        const data = octx.getImageData(sx, sy, 1, 1).data;
        const [r, g, b] = [data[0] / 255, data[1] / 255, data[2] / 255];
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const d = max - min;
        let h = 0;
        if (d === 0) h = 0; else if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
        h = Math.round((h * 60 + 360) % 360);
        return isFinite(h) ? h : 330;
      } catch {
        return 330;
      }
    };

    const spawnAt = (x: number, y: number, clientX: number, clientY: number) => {
      ensureOffscreen();
      const hue = sampleHueAt(clientX, clientY);
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.0;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.2,
          hue,
          sat: 70 + Math.random() * 20,
          light: 60 + Math.random() * 15,
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!activeRef.current || prefersReduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (now - lastSpawn > 28) {
        lastSpawn = now;
        spawnAt(x, y, e.clientX, e.clientY);
      }
    };
    const onPointerEnter = () => { activeRef.current = true; };
    const onPointerLeave = () => { activeRef.current = false; };
    const onPointerDown = () => { activeRef.current = true; };
    const onPointerUp = () => { activeRef.current = false; };

    const loop = () => {
      const ctx2 = ctx;
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length) {
        ctx2.globalCompositeOperation = 'lighter';
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const alpha = Math.max(0, Math.min(1, p.life));
          const radius = 2 + (1 - p.life) * 10;
          const grad = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
          grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${0.35 * alpha})`);
          grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);
          ctx2.fillStyle = grad;
          ctx2.beginPath();
          ctx2.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx2.fill();
        }
        ctx2.globalCompositeOperation = 'source-over';
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerenter', onPointerEnter);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, prefersReduced]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <img ref={imgRef} src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      {/* Canvas overlay for particles; pointer events on canvas to capture hover/touch */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default AuroraHover;


