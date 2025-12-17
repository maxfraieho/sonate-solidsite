# TASK 005: Fix Audio Player

## Priority: MEDIUM

## Problems
1. Control buttons show text instead of icons
2. Volume slider not styled with gold color
3. Inconsistent styling

## Required Changes

### 1. Replace Text Labels with SVG Icons

In the audio player HTML section, replace text with Material Symbols icons:

```html
<div class="audio-controls flex items-center justify-center gap-4">
  <!-- Previous Track -->
  <button class="audio-btn prev" aria-label="Previous track" data-i18n-attr="aria-label:portfolio.prev_track">
    <span class="material-symbols-outlined text-2xl">skip_previous</span>
  </button>
  
  <!-- Play/Pause -->
  <button class="audio-btn play-pause" aria-label="Play/Pause" data-i18n-attr="aria-label:portfolio.play_pause">
    <span class="material-symbols-outlined text-4xl play-icon">play_arrow</span>
    <span class="material-symbols-outlined text-4xl pause-icon hidden">pause</span>
  </button>
  
  <!-- Next Track -->
  <button class="audio-btn next" aria-label="Next track" data-i18n-attr="aria-label:portfolio.next_track">
    <span class="material-symbols-outlined text-2xl">skip_next</span>
  </button>
  
  <!-- Shuffle -->
  <button class="audio-btn shuffle" aria-label="Shuffle" data-i18n-attr="aria-label:portfolio.shuffle">
    <span class="material-symbols-outlined text-xl">shuffle</span>
  </button>
  
  <!-- Volume Container -->
  <div class="volume-container flex items-center gap-2">
    <button class="audio-btn mute" aria-label="Mute" data-i18n-attr="aria-label:portfolio.mute">
      <span class="material-symbols-outlined text-xl volume-icon">volume_up</span>
      <span class="material-symbols-outlined text-xl muted-icon hidden">volume_off</span>
    </button>
    <input type="range" class="volume-slider" min="0" max="100" value="80" aria-label="Volume">
  </div>
</div>
```

### 2. CSS for Audio Player

Add to main.css:

```css
/* Audio Player Controls */
.audio-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.audio-btn {
  background: transparent;
  border: none;
  color: #D4AF37; /* Gold */
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  transform: scale(1.1);
}

.audio-btn:active {
  transform: scale(0.95);
}

/* Play/Pause button - larger */
.audio-btn.play-pause {
  background: rgba(212, 175, 55, 0.15);
  padding: 1rem;
}

.audio-btn.play-pause:hover {
  background: rgba(212, 175, 55, 0.25);
}

/* Hide default text fallbacks */
.audio-btn span.sr-only,
.audio-btn .text-label {
  display: none;
}

/* Volume Slider - Gold Styling */
.volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #D4AF37;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(212, 175, 55, 0.4);
  transition: transform 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #D4AF37;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(212, 175, 55, 0.4);
}

/* Volume slider track fill (gold) */
.volume-slider::-webkit-slider-runnable-track {
  background: linear-gradient(to right, 
    #D4AF37 0%, 
    #D4AF37 var(--volume-fill, 80%), 
    rgba(255, 255, 255, 0.2) var(--volume-fill, 80%), 
    rgba(255, 255, 255, 0.2) 100%
  );
  border-radius: 3px;
}

/* Progress bar - Gold fill */
.audio-progress {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
}

.audio-progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #D4AF37;
  border-radius: 50%;
  cursor: pointer;
}
```

### 3. JavaScript for Volume Slider Fill

Add to audio-player.js or main.js:

```javascript
// Update volume slider fill color
const volumeSlider = document.querySelector('.volume-slider');
if (volumeSlider) {
  volumeSlider.addEventListener('input', function() {
    const value = this.value;
    this.style.setProperty('--volume-fill', value + '%');
  });
  // Set initial value
  volumeSlider.style.setProperty('--volume-fill', volumeSlider.value + '%');
}

// Toggle play/pause icons
function togglePlayPause(isPlaying) {
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  
  if (isPlaying) {
    playIcon?.classList.add('hidden');
    pauseIcon?.classList.remove('hidden');
  } else {
    playIcon?.classList.remove('hidden');
    pauseIcon?.classList.add('hidden');
  }
}

// Toggle volume/mute icons
function toggleMute(isMuted) {
  const volumeIcon = document.querySelector('.volume-icon');
  const mutedIcon = document.querySelector('.muted-icon');
  
  if (isMuted) {
    volumeIcon?.classList.add('hidden');
    mutedIcon?.classList.remove('hidden');
  } else {
    volumeIcon?.classList.remove('hidden');
    mutedIcon?.classList.add('hidden');
  }
}
```

## Verification Checklist
- [ ] All control buttons show icons (not text)
- [ ] Volume slider has gold fill
- [ ] Slider thumb is gold colored
- [ ] Play/Pause toggles between icons
- [ ] Mute button toggles between volume_up and volume_off
- [ ] Hover states work correctly
- [ ] Accessible (aria-labels present)
