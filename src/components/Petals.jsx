import { useEffect, useRef } from 'react';

const COUNT = 24;

export default function Petals() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const g = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -20 - Math.random() * 60,
      r: 4 + Math.random() * 6,
      vy: 0.35 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.3,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.025,
      phase: Math.random() * Math.PI * 2,
      spark: Math.random() < 0.32,
    });

    resize();
    const items = Array.from({ length: COUNT }, () => spawn(true));

    const drawPetal = (p) => {
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.rot);
      g.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(t * 0.02 + p.phase)));
      const grad = g.createRadialGradient(-p.r * 0.3, -p.r * 0.3, 0, 0, 0, p.r * 1.2);
      grad.addColorStop(0, 'rgba(255,240,236,0.95)');
      grad.addColorStop(1, 'rgba(232,176,170,0.55)');
      g.fillStyle = grad;
      g.beginPath();
      g.moveTo(0, -p.r);
      g.bezierCurveTo(p.r, -p.r, p.r, p.r * 0.6, 0, p.r);
      g.bezierCurveTo(-p.r, p.r * 0.6, -p.r, -p.r, 0, -p.r);
      g.fill();
      g.restore();
    };

    const drawSpark = (p) => {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.04 + p.phase));
      const s = p.r * 0.45;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.rot);
      g.globalAlpha = a;
      g.fillStyle = '#f1dca4';
      g.shadowColor = 'rgba(241,210,140,0.9)';
      g.shadowBlur = 8;
      g.beginPath();
      for (let i = 0; i < 4; i++) {
        g.rotate(Math.PI / 2);
        g.lineTo(0, -s * 2.2);
        g.lineTo(s * 0.35, -s * 0.35);
      }
      g.closePath();
      g.fill();
      g.restore();
    };

    const frame = () => {
      t++;
      g.clearRect(0, 0, w, h);
      for (let i = 0; i < items.length; i++) {
        const p = items[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.012 + p.phase) * 0.45;
        p.rot += p.vr;
        if (p.y > h + 20 || p.x < -30 || p.x > w + 30) items[i] = spawn(false);
        if (p.spark) drawSpark(p);
        else drawPetal(p);
      }
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="petals" aria-hidden="true" />;
}
