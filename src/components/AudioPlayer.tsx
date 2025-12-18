import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const tracks = [
  {
    id: 1,
    name: 'Méditation de Thaïs',
    artist: 'Jules Massenet',
    cover: 'https://violin.pp.ua/assets/img/audio-covers/cover-1.webp',
    src: 'https://violin.pp.ua/assets/audio/meditation.mp3'
  },
  {
    id: 2,
    name: 'Czardas',
    artist: 'Vittorio Monti',
    cover: 'https://violin.pp.ua/assets/img/audio-covers/cover-2.webp',
    src: 'https://violin.pp.ua/assets/audio/czardas.mp3'
  },
  {
    id: 3,
    name: 'Libertango',
    artist: 'Astor Piazzolla',
    cover: 'https://violin.pp.ua/assets/img/audio-covers/cover-3.webp',
    src: 'https://violin.pp.ua/assets/audio/libertango.mp3'
  },
];

export const AudioPlayer = () => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  const track = tracks[currentTrack];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (value[0] / 100) * duration;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Main Player */}
      <div className="bg-surface rounded-2xl p-6 border border-primary/30">
        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextTrack}
        />
        
        {/* Album Art & Info */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={track.cover}
            alt={track.name}
            className="w-24 h-24 rounded-xl object-cover shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://violin.pp.ua/assets/img/chee-yun-s.jpg';
            }}
          />
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">{track.name}</h3>
            <p className="text-primary">{track.artist}</p>
            <p className="text-subtext text-sm">{t('portfolio.artist')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={prevTrack}
            className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <Volume2 className="h-5 w-5 text-subtext" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-surface rounded-2xl p-6 border border-primary/30">
        <h4 className="text-lg font-display font-bold text-primary mb-4">Playlist</h4>
        <div className="space-y-2">
          {tracks.map((t, index) => (
            <button
              key={t.id}
              onClick={() => selectTrack(index)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all ${
                currentTrack === index
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-background hover:bg-primary/10 border border-transparent'
              }`}
            >
              <img
                src={t.cover}
                alt={t.name}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://violin.pp.ua/assets/img/chee-yun-s.jpg';
                }}
              />
              <div className="text-left">
                <p className={`font-semibold ${currentTrack === index ? 'text-primary' : 'text-foreground'}`}>
                  {t.name}
                </p>
                <p className="text-sm text-subtext">{t.artist}</p>
              </div>
              {currentTrack === index && isPlaying && (
                <div className="ml-auto flex gap-0.5">
                  <span className="w-1 h-4 bg-primary animate-pulse rounded-full" />
                  <span className="w-1 h-4 bg-primary animate-pulse rounded-full animation-delay-200" />
                  <span className="w-1 h-4 bg-primary animate-pulse rounded-full animation-delay-400" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
