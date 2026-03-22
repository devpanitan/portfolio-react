import { useRef, useState } from 'react';

interface ProfileCardProps {
  name?: string;
  title?: string;
  image?: string;
  github?: string;
  email?: string;
}

export default function ProfileCard({
  name = "Patipan Rueangyong",
  title = "Mobile & Full-Stack Developer",
  image = "/profile.jfif",
  github = "https://github.com/devpanitan",
  email = "mailto:panitan05499@srru.ac.th",
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.2 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div style={{ perspective: '800px' }} className="flex justify-center flex-shrink-0">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[260px] h-[380px] rounded-2xl overflow-hidden cursor-default"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Full background image */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Dark gradient overlay (bottom half) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/70 to-transparent" />

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-[#29ffb8]/25" />

        {/* Glare effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          }}
        />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] p-5 text-center">
          <h3 className="text-lg font-bold text-white mb-0.5">{name}</h3>
          <p className="text-xs text-[#29ffb8]/90 mb-4">{title}</p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <a
              href={github}
              target="_blank"
              className="px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/15 text-white/90 text-xs font-medium hover:bg-white/20 transition-all"
            >
              GitHub
            </a>
            <a
              href={email}
              className="px-4 py-1.5 rounded-lg bg-[#29ffb8]/15 backdrop-blur border border-[#29ffb8]/25 text-[#29ffb8] text-xs font-medium hover:bg-[#29ffb8]/25 transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Top corner glow */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#29ffb8]/10 to-transparent rounded-bl-full" />
      </div>
    </div>
  );
}
