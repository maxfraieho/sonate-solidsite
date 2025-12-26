import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const tracks = [
  {
    id: 1,
    name: 'Shape of My Heart',
    artist: 'Arsen Kovalenko',
    src: '/audio/shape-of-my-heart.m4a'
  },
  {
    id: 2,
    name: 'Ado - 唱 (Show)',
    artist: 'Arsen Kovalenko',
    src: '/audio/ado-show.m4a'
  },
  {
    id: 3,
    name: 'Classical Dragon',
    artist: 'Arsen Kovalenko',
    src: '/audio/classical-dragon.m4a'
  },
  {
    id: 4,
    name: 'Davie504 Challenge',
    artist: 'Arsen Kovalenko',
    src: '/audio/davie504-challenge.m4a'
  },
  {
    id: 5,
    name: 'Just The Two Of Us',
    artist: 'Arsen Kovalenko',
    src: '/audio/just-two-of-us.m4a'
  },
  {
    id: 6,
    name: 'Project 11',
    artist: 'Arsen Kovalenko',
    src: '/audio/project-11.m4a'
  },
  {
    id: 7,
    name: 'Bling-Bang-Bang-Born',
    artist: 'Arsen Kovalenko',
    src: '/audio/bling-bang-bang-born.m4a'
  },
];

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);
  
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [shuffle, setShuffle] = useState(false);

  const track = tracks[currentTrack];

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initAudioContext = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    
    audioContextRef.current = audioContext;
    analyzerRef.current = analyzer;
    sourceRef.current = source;
  }, []);

  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !analyzerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const analyzer = analyzerRef.current;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Gold gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#d4a252');
        gradient.addColorStop(1, '#8b6914');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        
        x += barWidth;
      }
    };
    
    draw();
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      drawVisualizer();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying, drawVisualizer]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (!audioContextRef.current) {
        initAudioContext();
      }
      
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setProgress((current / dur) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      audioRef.current.currentTime = (value[0] / 100) * dur;
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
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(randomIndex);
    } else {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
  };

  const selectTrack = async (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    setCurrentTime('00:00');
    
    // Auto-play when selecting a track
    setTimeout(async () => {
      if (audioRef.current) {
        if (!audioContextRef.current) {
          initAudioContext();
        }
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Player */}
      <div className="bg-background rounded-2xl p-6 border border-primary/30 mb-6">
        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
          preload="metadata"
        />
        
        {/* Track Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-display font-bold text-foreground">{track.name}</h3>
          <p className="text-primary">{track.artist}</p>
        </div>

        {/* Audio Visualizer */}
        <div className="relative h-24 mb-4 rounded-lg overflow-hidden bg-surface">
          <canvas
            ref={canvasRef}
            width={800}
            height={100}
            className="w-full h-full"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-sm text-subtext mt-1">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={prevTrack}
            className="p-3 rounded-full border border-primary/50 text-foreground hover:bg-primary/20 transition-colors"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-4 rounded-full border-2 border-primary text-foreground hover:bg-primary/20 transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="p-3 rounded-full border border-primary/50 text-foreground hover:bg-primary/20 transition-colors"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`p-3 rounded-full border border-primary/50 transition-colors ${
              shuffle ? 'bg-primary/30 text-primary' : 'text-foreground hover:bg-primary/20'
            }`}
          >
            <Shuffle className="h-5 w-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-center gap-3">
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
      <div className="bg-background rounded-2xl p-6 border border-primary/30">
        <h4 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
          <span className="text-primary">♫</span> Liste de Lecture
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tracks.map((t, index) => (
            <button
              key={t.id}
              onClick={() => selectTrack(index)}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all text-left ${
                currentTrack === index
                  ? 'bg-primary/30 border border-primary'
                  : 'bg-surface hover:bg-primary/10 border border-transparent'
              }`}
            >
              <span className="text-sm text-subtext w-6">{(index + 1).toString().padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${currentTrack === index ? 'text-primary' : 'text-foreground'}`}>
                  {t.name}
                </p>
                <p className="text-xs text-subtext truncate">{t.artist}</p>
              </div>
              {currentTrack === index && isPlaying && (
                <span className="text-primary">•</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
