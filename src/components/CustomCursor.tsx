import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const spotRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const isDark = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 5}px`;
        dotRef.current.style.top = `${e.clientY - 5}px`;
      }

      // Check if over dark or light section
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (el) {
        const section = el.closest('section, footer, nav') as HTMLElement;
        const bg = section ? getComputedStyle(section).backgroundColor : 'rgb(255,255,255)';
        const match = bg.match(/\d+/g);
        if (match) {
          const brightness = (parseInt(match[0]) * 299 + parseInt(match[1]) * 587 + parseInt(match[2]) * 114) / 1000;
          isDark.current = brightness < 128;
        }
      }

      // Update colors based on background
      const dotColor = isDark.current ? '#29ffb8' : '#6366f1';
      const glowColor = isDark.current ? 'rgba(41,255,184,0.4)' : 'rgba(99,102,241,0.4)';
      const ringColor = isDark.current ? 'rgba(41,255,184,0.4)' : 'rgba(99,102,241,0.35)';

      if (dotRef.current) {
        dotRef.current.style.background = dotColor;
        dotRef.current.style.boxShadow = `0 0 10px 3px ${glowColor}`;
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = ringColor;
      }

      // Check hover
      const isHover = !!el?.closest('a, button, [role="button"]');
      if (dotRef.current) dotRef.current.style.transform = isHover ? 'scale(2.5)' : 'scale(1)';
      if (ringRef.current) {
        ringRef.current.style.width = isHover ? '50px' : '36px';
        ringRef.current.style.height = isHover ? '50px' : '36px';
      }
    };

    // Ring + Spotlight follow smoothly
    let raf: number;
    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;

      if (ringRef.current) {
        const size = parseInt(ringRef.current.style.width || '36');
        ringRef.current.style.left = `${smooth.current.x - size / 2}px`;
        ringRef.current.style.top = `${smooth.current.y - size / 2}px`;
      }

      if (spotRef.current) {
        const spotColor = isDark.current ? 'rgba(41,255,184,0.06)' : 'rgba(99,102,241,0.04)';
        spotRef.current.style.background = `radial-gradient(circle 200px at ${smooth.current.x}px ${smooth.current.y}px, ${spotColor} 0%, transparent 100%)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Spotlight */}
      <div ref={spotRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9997 }} />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.35)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s, height 0.25s, border-color 0.3s',
          left: -100,
          top: -100,
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#6366f1',
          boxShadow: '0 0 10px 3px rgba(99,102,241,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.2s ease, background 0.3s, box-shadow 0.3s',
          left: -100,
          top: -100,
        }}
      />
    </>
  );
}
