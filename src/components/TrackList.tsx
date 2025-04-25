
import React, { useState } from 'react';
import { AudioPlayer } from './AudioPlayer';
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Music, ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";

export interface Track {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  duration: string;
}

interface TrackListProps {
  tracks: Track[];
  onDeleteTrack: (id: string) => void;
}

type SortKey = 'name' | 'uploadDate';
type SortDirection = 'asc' | 'desc';

export const TrackList: React.FC<TrackListProps> = ({ tracks, onDeleteTrack }) => {
  const [sortKey, setSortKey] = useState<SortKey>('uploadDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleDelete = (id: string) => {
    onDeleteTrack(id);
    toast.success('Трек удален');
  };
  
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  const sortedTracks = [...tracks].sort((a, b) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc' 
        ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime() 
        : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });
  
  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Моя библиотека</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => handleSort('name')}
          >
            <Music size={16} />
            <span>Название</span>
            {renderSortIcon('name')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => handleSort('uploadDate')}
          >
            <Calendar size={16} />
            <span>Дата</span>
            {renderSortIcon('uploadDate')}
          </Button>
        </div>
      </div>
      
      {sortedTracks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <Music className="mx-auto h-12 w-12 mb-4 opacity-20" />
          <p>У вас пока нет загруженных треков</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTracks.map(track => (
            <div key={track.id} className="track-item">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{track.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Загружен: {new Date(track.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(track.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
              <AudioPlayer trackUrl={track.url} trackName={track.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
