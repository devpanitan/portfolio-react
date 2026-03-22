import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({ children, padding = 80, strength = 2, className = '' }: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      if (Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding) {
        setActive(true);
        setPosition({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength });
      } else {
        setActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <div style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.5s ease-in-out',
        willChange: 'transform',
      }}>
        {children}
      </div>
    </div>
  );
}
