interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ShinyText({ text, className = '', speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, #94a3b8 0%, #94a3b8 35%, #ffffff 50%, #94a3b8 65%, #94a3b8 100%)',
        backgroundSize: '200% auto',
        animation: `shiny-slide ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`@keyframes shiny-slide { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }`}</style>
    </span>
  );
}
