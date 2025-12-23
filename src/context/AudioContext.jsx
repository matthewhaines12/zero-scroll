import { createContext, use, useState, useEffect, useRef } from 'react';
import { SOUND_LIBRARY } from '../services/utils/constants';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef({});
  const [isMuted, setIsMuted] = useState(false);

  // Lazy init that only runs once on initial render
  const [volumes, setVolumes] = useState(() => {
    const initial = {};
    SOUND_LIBRARY.forEach((sound) => {
      initial[sound.id] = 0;
    });
    return initial;
  });

  // Create audio objects once on mount
  useEffect(() => {
    SOUND_LIBRARY.forEach((sound) => {
      const audio = new Audio(sound.src);
      audio.loop = true;
      audio.volume = 0;

      audioRef.current[sound.id] = audio;
    });

    return () => {
      // Cleanup on unmount
      Object.values(audioRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const setVolume = (id, value) => {
    const audio = audioRef.current[id];
    if (!audio) {
      console.log('no audio found');
      return;
    }

    const normalized = value / 100;
    audio.volume = normalized;

    if (value === 0) {
      audio.pause();
    } else if (audio.paused && !isMuted) {
      audio.play().catch((err) => console.error(err));
    }

    setVolumes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const muteAll = () => {
    Object.values(audioRef.current).forEach((audio) => {
      audio.pause();
    });

    setIsMuted(true);
  };

  const unMute = () => {
    Object.values(audioRef.current).forEach((audio) => {
      if (audio.paused) {
        audio.play().catch((err) => console.error(err));
      }
    });

    setIsMuted(false);
  };

  return (
    <AudioContext value={{ volumes, isMuted, setVolume, muteAll, unMute }}>
      {children}
    </AudioContext>
  );
};

export const useAudioContext = () => {
  const context = use(AudioContext);

  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }

  return context;
};
