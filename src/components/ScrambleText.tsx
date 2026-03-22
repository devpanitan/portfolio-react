import { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleChars?: string;
  speed?: number;
}

export default function ScrambleText({
  text,
  className = '',
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
  speed = 50,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasPlayed.current) {
        setInView(true);
        hasPlayed.current = true;
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = text.length * 3; // 3 scramble cycles per character

    const interval = setInterval(() => {
      frame++;
      const resolved = Math.floor(frame / 3); // how many chars are final

      const result = text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < resolved) return text[i]; // resolved
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]; // scrambling
      }).join('');

      setDisplay(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [inView, text, scrambleChars, speed]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {display}
    </span>
  );
}
