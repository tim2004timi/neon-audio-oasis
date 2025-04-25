
import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Music } from "lucide-react";
import { toast } from "sonner";

interface UploadTrackProps {
  onUploadComplete: (track: {
    id: string;
    name: string;
    url: string;
    uploadDate: string;
    duration: string;
  }) => void;
}

export const UploadTrack: React.FC<UploadTrackProps> = ({ 
  onUploadComplete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const processFile = useCallback((file: File) => {
    if (!file) return;
    
    const allowedTypes = ['audio/mpeg', 'audio/wav'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Неподдерживаемый формат файла. Загрузите MP3 или WAV.');
      return;
    }
    
    // Simulate upload process
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate creating a URL for the audio file
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // In a real app, we'd upload to a server and get a URL back
      // Here we use URL.createObjectURL for demo purposes
      const trackUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
        
        // Create a track object and pass it to the parent component
        onUploadComplete({
          id: `track-${Date.now()}`,
          name: file.name.replace(/\.(mp3|wav)$/i, ''),
          url: trackUrl,
          uploadDate: new Date().toISOString(),
          duration: '0:00' // In a real app, we'd calculate this from the audio file
        });
        
        toast.success('Трек успешно загружен!');
      }, 500);
    }, 2000);
    
  }, [onUploadComplete]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);
  
  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Загрузить трек</h2>
      
      <div
        className={`drag-drop-zone ${isDragging ? 'drag-drop-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".mp3,.wav"
          className="hidden"
        />
        
        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
        
        {isUploading ? (
          <div className="w-full max-w-xs">
            <p className="mb-2 font-medium">Загрузка...</p>
            <Progress value={progress} className="h-2" />
          </div>
        ) : (
          <>
            <p className="mb-4 font-medium">
              Перетащите аудиофайл сюда или нажмите для выбора
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Поддерживаемые форматы: MP3, WAV
            </p>
            <Button 
              onClick={handleFileSelect}
              className="neon-button"
            >
              <Music className="mr-2 h-4 w-4" />
              Выбрать файл
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
