import { createContext, use, useState, useCallback, useMemo } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1); // Which focus cycle 1 - 4 (Repeat)
  const [totalDeepWorkMins, setTotalDeepWorkMins] = useState(0);

  const completeFocusSession = useCallback((minutesSpent) => {
    setCompletedFocusSessions((prev) => prev + 1);
    setTotalDeepWorkMins((prev) => prev + minutesSpent);
  }, []);

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
      completeFocusSession,
      nextCycle,
      resetCycle,
    }),
    [
      completedFocusSessions,
      currentCycle,
      totalDeepWorkMins,
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
