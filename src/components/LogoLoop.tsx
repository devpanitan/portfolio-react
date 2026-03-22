import { useEffect, useRef, useState, useCallback } from 'react';
import './LogoLoop.css';

interface LogoItem {
  src: string;
  alt: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 100,
  logoHeight = 32,
  gap = 48,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor,
  className = '',
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const [copyCount, setCopyCount] = useState(3);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);

  const updateCopies = useCallback(() => {
    if (!containerRef.current || !seqRef.current) return;
    const containerW = containerRef.current.clientWidth;
    const seqW = seqRef.current.getBoundingClientRect().width;
    if (seqW > 0) {
      setCopyCount(Math.max(3, Math.ceil(containerW / seqW) + 2));
    }
  }, []);

  useEffect(() => {
    updateCopies();
    window.addEventListener('resize', updateCopies);
    return () => window.removeEventListener('resize', updateCopies);
  }, [updateCopies, logos]);

  useEffect(() => {
    let last: number | null = null;

    const animate = (ts: number) => {
      if (last === null) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      if (!isPaused.current && seqRef.current && trackRef.current) {
        const seqW = seqRef.current.getBoundingClientRect().width;
        if (seqW > 0) {
          offsetRef.current = (offsetRef.current + speed * dt) % seqW;
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const rootClass = `logoloop ${fadeOut ? 'logoloop--fade' : ''} ${className}`;
  const cssVars = {
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onMouseEnter={() => pauseOnHover && (isPaused.current = true)}
      onMouseLeave={() => pauseOnHover && (isPaused.current = false)}
    >
      <div ref={trackRef} className="logoloop__track">
        {Array.from({ length: copyCount }, (_, ci) => (
          <ul key={ci} className="logoloop__list" ref={ci === 0 ? seqRef : undefined}>
            {logos.map((logo, li) => (
              <li key={`${ci}-${li}`} className="logoloop__item">
                <img src={logo.src} alt={logo.alt} loading="lazy" draggable={false} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
