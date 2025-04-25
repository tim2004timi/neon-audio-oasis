
import React from 'react';
import { Button } from "@/components/ui/button";
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Music, Star, Users, Upload } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
          NeonBeats
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Современная платформа для музыкантов и битмейкеров
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button className="neon-button text-lg px-8 py-6">
              <Music className="mr-2 h-5 w-5" />
              Начать сейчас
            </Button>
          </Link>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
          <div className="feature-card">
            <Star className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Высокое качество</h3>
            <p className="text-muted-foreground">
              Поддержка форматов WAV и MP3 в высоком качестве
            </p>
          </div>
          
          <div className="feature-card" style={{animationDelay: '0.2s'}}>
            <Upload className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Простая загрузка</h3>
            <p className="text-muted-foreground">
              Drag-and-drop загрузка треков в вашу библиотеку
            </p>
          </div>
          
          <div className="feature-card" style={{animationDelay: '0.4s'}}>
            <Users className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Сообщество</h3>
            <p className="text-muted-foreground">
              Присоединяйтесь к растущему сообществу музыкантов
            </p>
          </div>
        </div>
        
        {/* Artists Section */}
        <div className="mt-24 w-full">
          <h2 className="text-3xl font-bold mb-12">Создавайте музыку вместе с лучшими</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['artist1', 'artist2', 'artist3', 'artist4'].map((artist, index) => (
              <div 
                key={artist}
                className="aspect-square overflow-hidden rounded-lg bg-secondary animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  backgroundImage: `url(/placeholder.svg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
