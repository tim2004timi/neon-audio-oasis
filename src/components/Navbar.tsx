
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Music, User, LogOut, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock authentication - this would be replaced with real auth logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { label: "Главная", path: "/" },
    ...(isAuthenticated 
      ? [{ label: "Мой кабинет", path: "/dashboard" }] 
      : [
          { label: "Вход", path: "/login" },
          { label: "Регистрация", path: "/register" }
        ])
  ];
  
  return (
    <header className="bg-secondary py-4 border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-neon-purple" />
          <h1 className="text-xl font-bold neon-text">NeonBeats</h1>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`transition hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Выход</span>
            </Button>
          )}
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-secondary border-b border-border md:hidden animate-slide-in">
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`transition hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Выход</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
