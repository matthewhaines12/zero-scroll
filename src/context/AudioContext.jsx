import { createContext, use, useState } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [mode, setMode] = useState('FOCUS');

  return <AudioContext value={{ mode, setMode }}>{children}</AudioContext>;
};

export const useAudioContext = () => {
  const context = use(AudioContext);

  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }

  return context;
};
