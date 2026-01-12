import { createContext, use, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import {
  getSettings,
  updatePreferences,
  updateTimerSettings,
} from '../services/api/auth.api';
import {
  DEFAULT_TIMER_SETTINGS,
  DEFAULT_PREFERENCE_SETTINGS,
} from '../services/utils/constants';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const { status, accessToken } = useAuthContext();

  const [timerSettings, setTimerSettings] = useState(DEFAULT_TIMER_SETTINGS);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCE_SETTINGS);
  const [loading, setLoading] = useState(status === 'authenticated'); // only load if we expect a fetch

  useEffect(() => {
    const loadUserSettings = async () => {
      if (status === 'authenticated' && accessToken) {
        setLoading(true);

        try {
          const data = await getSettings();

          if (data.timerSettings) setTimerSettings(data.timerSettings);
          if (data.preferences) setPreferences(data.preferences);
        } catch (err) {
          console.error('Failed to load user settings:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserSettings();
  }, [status, accessToken]);

  const saveTimerSettings = async (newTimerSettings) => {
    setTimerSettings(newTimerSettings);

    if (status === 'authenticated' && accessToken) {
      try {
        await updateTimerSettings(newTimerSettings);
      } catch (err) {
        console.error('Failed to save timer settings to backend:', err);
      }
    }
  };

  const savePreferences = async (newPreference) => {
    setPreferences((prev) => ({ ...prev, ...newPreference }));

    if (status === 'authenticated' && accessToken) {
      try {
        await updatePreferences(newPreference);
      } catch (err) {
        console.error('Failed to save preference to backend:', err);
      }
    }
  };

  return (
    <SettingsContext
      value={{
        timerSettings,
        preferences,
        loading,
        saveTimerSettings,
        savePreferences,
      }}
    >
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
