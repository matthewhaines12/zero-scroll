import { createContext, use, useState } from 'react';
import { DEFAULT_TIMER_SETTINGS } from '../services/utils/constants';
import { DAILY_SESSION_GOAL } from '../services/utils/constants';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [timerSettings, setTimerSettings] = useState(DEFAULT_TIMER_SETTINGS);
  const [dailyGoal, setDailyGoal] = useState(DAILY_SESSION_GOAL);

  return (
    <SettingsContext value={{ timerSettings, setTimerSettings, dailyGoal }}>
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
