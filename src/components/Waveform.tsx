
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

  // Generate random waveform data for demo
  // In a real app, this would analyze the actual audio file
  useEffect(() => {
    const generateWaveform = () => {
      const segments = 50;
      const data: number[] = [];
      
      for (let i = 0; i < segments; i++) {
        // Generate random heights with some smoothing
        const height = Math.random() * 0.7 + 0.15; // between 0.15 and 0.85
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
      className="waveform relative" 
      ref={containerRef}
      onClick={handleClick}
    >
      {waveform.map((height, index) => (
        <div
          key={index}
          className="wave-segment absolute transition-all duration-200"
          style={{
            left: `${(index / waveform.length) * 100}%`,
            height: `${height * 100}%`,
            opacity: index / waveform.length <= progress ? 1 : 0.4,
            transform: isPlaying && index / waveform.length <= progress 
              ? 'scaleY(1.2)' 
              : 'scaleY(1)'
          }}
        />
      ))}
      
      {/* Progress indicator */}
      <div 
        className="absolute bottom-0 h-full bg-accent/20 pointer-events-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
