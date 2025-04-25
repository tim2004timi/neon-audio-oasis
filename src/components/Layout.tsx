
import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
      <footer className="bg-secondary py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NeonBeats | All rights reserved
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};
