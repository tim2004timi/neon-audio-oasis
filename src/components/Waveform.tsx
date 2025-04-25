
import React, { useEffect, useState, useRef } from 'react';

interface WaveformProps {
  audioUrl: string;
  isPlaying: boolean;
  progress: number;
  onClick?: (position: number) => void;
}

export const Waveform: React.FC<WaveformProps> = ({ 
  audioUrl, 
  isPlaying, 
  progress,
  onClick
}) => {
  const [waveform, setWaveform] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateWaveform = () => {
      const segments = 50;
      const data: number[] = [];
      
      for (let i = 0; i < segments; i++) {
        const height = Math.random() * 0.7 + 0.15;
        data.push(height);
      }
      
      setWaveform(data);
    };
    
    generateWaveform();
  }, [audioUrl]);
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !onClick) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    onClick(position);
  };
  
  return (
    <div 
      className="waveform relative h-[60px]" 
      ref={containerRef}
      onClick={handleClick}
    >
      {waveform.map((height, index) => (
        <div
          key={index}
          className="wave-segment absolute bottom-[30%] transition-all duration-200"
          style={{
            left: `${(index / waveform.length) * 100}%`,
            height: `${height * 40}%`,
            opacity: index / waveform.length <= progress ? 1 : 0.4,
            transform: isPlaying && index / waveform.length <= progress 
              ? `scaleY(1)` 
              : 'scaleY(0.8)'
          }}
        />
      ))}
      
      <div 
        className="absolute bottom-[30%] h-[40%] bg-accent/20 pointer-events-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
