import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const TRACKS = [
  { id: 1, title: "DATA_CORRUPTION_A", artist: "USER_0x11", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "NULL_POINTER_BEATS", artist: "SYS_ADMIN", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "KERNEL_PANIC", artist: "UNAUTHORIZED", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  const handlePrev = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => handleNext();

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full flex flex-col font-digital text-white font-bold tracking-wide">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b-4 border-cyber-magenta pb-2">
        <div className="flex items-center gap-2 text-cyber-magenta">
          <Volume2 className="w-7 h-7" />
          <span className="text-2xl uppercase font-black">
            AUDIO_STREAM // {isPlaying ? 'ACTV' : 'IDLE'}
          </span>
        </div>
        <div className="flex gap-1 items-end h-8">
          <div className={`w-3 bg-cyber-cyan ${isPlaying ? 'h-full animate-pulse' : 'h-1'}`} />
          <div className={`w-3 bg-cyber-cyan ${isPlaying ? 'h-4 animate-[pulse_0.4s_infinite]' : 'h-1'}`} />
          <div className={`w-3 bg-cyber-magenta ${isPlaying ? 'h-6 animate-[pulse_0.6s_infinite]' : 'h-1'}`} />
          <div className={`w-3 bg-cyber-magenta ${isPlaying ? 'h-3 animate-[pulse_0.3s_infinite]' : 'h-1'}`} />
        </div>
      </div>

      {/* Track Info */}
      <div className="mb-8">
        <div className="text-4xl text-cyber-cyan glitch-text-wrapper mb-2 truncate leading-none" data-text={currentTrack.title}>
          {currentTrack.title}
        </div>
        <div className="text-2xl text-white opacity-90 flex gap-2 items-center">
          <span className="bg-white text-black px-2 py-0.5">AUTHOR</span> {currentTrack.artist}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center bg-black border-4 border-cyber-cyan p-3 shadow-[4px_4px_0_var(--color-cyber-magenta)]">
          <button 
            onClick={handlePrev}
            className="glitch-button w-14 h-14 flex items-center justify-center"
          >
            <SkipBack className="w-8 h-8 fill-current" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="glitch-button w-20 h-20 flex items-center justify-center bg-cyber-magenta text-black border-cyber-cyan"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-current" />
            ) : (
              <Play className="w-10 h-10 fill-current ml-2" />
            )}
          </button>
          
          <button 
            onClick={handleNext}
            className="glitch-button w-14 h-14 flex items-center justify-center"
          >
            <SkipForward className="w-8 h-8 fill-current" />
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="h-6 bg-cyber-black border-2 border-white relative cursor-pointer group"
               onClick={(e) => {
                 if (audioRef.current && duration) {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   audioRef.current.currentTime = (x / rect.width) * duration;
                 }
               }}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-cyber-cyan opacity-90 transition-all duration-75 group-hover:bg-cyber-magenta"
              style={{ width: `${progressPercentage}%`, boxShadow: '4px 0 0 #fff' }}
            />
          </div>
          
          <div className="flex justify-between items-center text-2xl text-cyber-magenta">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
