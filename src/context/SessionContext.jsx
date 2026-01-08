import {
  createContext,
  use,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useAuthContext } from './AuthContext';
import { getDailySessionStats } from '../services/api/session.api';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const { status, accessToken } = useAuthContext();
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1); // Which focus cycle 1 - 4 (Repeat)
  const [totalDeepWorkMins, setTotalDeepWorkMins] = useState(0); // For Daily stats
  const [totalFocusSessions, setTotalFocusSessions] = useState(0); // For Daily stats
  const [loading, setLoading] = useState(status === 'authenticated'); // only load if we expect a fetch

  // Load daily stats when user is authenticated
  useEffect(() => {
    const loadDailyStats = async () => {
      if (status === 'authenticated' && accessToken) {
        setLoading(true);

        try {
          const dailyStats = await getDailySessionStats(accessToken);
          setTotalDeepWorkMins(dailyStats.totalDeepWorkMins);
          setTotalFocusSessions(dailyStats.totalFocusSessions);
        } catch (err) {
          console.error('Failed to fetch daily stats:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadDailyStats();
  }, [status, accessToken]);

  const completeFocusSession = useCallback(
    (minutesSpent, countsTowardStats) => {
      setCompletedFocusSessions((prev) => prev + 1);

      // Only update stats if session meets minimum time requirement
      if (countsTowardStats) {
        setTotalDeepWorkMins((prev) => prev + minutesSpent);
        setTotalFocusSessions((prev) => prev + 1);
      }
    },
    []
  );

  const nextCycle = useCallback(() => {
    setCurrentCycle((prev) => prev + 1);
  }, []);

  const resetCycle = useCallback(() => {
    setCompletedFocusSessions(0);
    setCurrentCycle(1);
  }, []);

  const value = useMemo(
    () => ({
      completedFocusSessions,
      currentCycle,
      totalDeepWorkMins,
      totalFocusSessions,
      loading,
      completeFocusSession,
      nextCycle,
      resetCycle,
    }),
    [
      completedFocusSessions,
      currentCycle,
      totalDeepWorkMins,
      totalFocusSessions,
      loading,
      completeFocusSession,
      nextCycle,
      resetCycle,
    ]
  );

  return <SessionContext value={value}>{children}</SessionContext>;
};

export const useSessionContext = () => {
  const context = use(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider');
  }

  return context;
};
