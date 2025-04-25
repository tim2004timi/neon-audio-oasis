
import React from 'react';
import { Button } from "@/components/ui/button";
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Music } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          <span className="neon-text">NeonBeats</span>
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
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg bg-secondary animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Управляйте треками</h3>
            <p className="text-muted-foreground">
              Загружайте и организуйте свою музыку в одном месте
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-secondary animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-4">Современный плеер</h3>
            <p className="text-muted-foreground">
              Слушайте с визуализацией аудио и полным контролем
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-secondary animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-4">Удобный интерфейс</h3>
            <p className="text-muted-foreground">
              Стильный и интуитивно понятный дизайн с темной темой
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
