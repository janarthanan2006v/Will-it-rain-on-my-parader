'use client';

import { useState, useEffect } from 'react';

export function MouseFollower({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    requestAnimationFrame(() => {
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      setPosition({ x, y });
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="mouse-follower-background"
      style={{ backgroundPosition: `${position.x}% ${position.y}%` }}
    >
      {children}
    </div>
  );
}
