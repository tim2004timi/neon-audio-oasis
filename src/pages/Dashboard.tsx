
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { UploadTrack } from '@/components/UploadTrack';
import { TrackList, Track } from '@/components/TrackList';
import { getCurrentUser } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    // Load tracks from localStorage on component mount
    const savedTracks = localStorage.getItem('userTracks');
    if (savedTracks) {
      try {
        setTracks(JSON.parse(savedTracks));
      } catch (e) {
        console.error('Failed to parse tracks from localStorage');
      }
    }
  }, []);
  
  // Save tracks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userTracks', JSON.stringify(tracks));
  }, [tracks]);
  
  const handleUploadComplete = (newTrack: Track) => {
    setTracks(prev => [newTrack, ...prev]);
  };
  
  const handleDeleteTrack = (id: string) => {
    setTracks(prev => prev.filter(track => track.id !== id));
  };
  
  if (!user) {
    return null; // Will redirect due to the useEffect above
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Добро пожаловать, {user.username}!
        </h1>
        
        <UploadTrack onUploadComplete={handleUploadComplete} />
        
        <TrackList 
          tracks={tracks} 
          onDeleteTrack={handleDeleteTrack} 
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
