import { createContext, use, useState } from 'react';
import { DEFAULT_TIMER_SETTINGS } from '../services/utils/constants';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [timerSettings, setTimerSettings] = useState(DEFAULT_TIMER_SETTINGS);

  return (
    <SettingsContext value={{ timerSettings, setTimerSettings }}>
      {children}
    </SettingsContext>
  );
};

export const useSettingsContext = () => {
  const context = use(SettingsContext);

  if (!context) {
    throw new Error('useSettingsContext must be used within SettingProvider');
  }

  return context;
};
