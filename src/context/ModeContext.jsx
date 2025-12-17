import { createContext, use, useState } from 'react';

const ModeContext = createContext(null);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('focus');

  return <ModeContext value={{ mode, setMode }}>{children}</ModeContext>;
};

export const useModeContext = () => {
  const context = use(ModeContext);

  if (!context) {
    throw new Error('useModeContext must be used within ModeProvider');
  }

  return context;
};
