import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function GradientText({ children, className = '', colors = ['#6366f1', '#a855f7', '#ec4899', '#6366f1'], speed = 5 }: GradientTextProps) {
  const gradient = colors.join(', ');
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradient})`,
        backgroundSize: '300% 100%',
        animation: `gradient-slide ${speed}s linear infinite`,
      }}
    >
      {children}
      <style>{`@keyframes gradient-slide { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
    </span>
  );
}
