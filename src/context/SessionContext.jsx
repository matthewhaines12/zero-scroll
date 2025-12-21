import { createContext, use, useState, useCallback } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1); // Which focus cycle 1 - 4 (Repeat)

  const completeFocusSession = useCallback(() => {
    setCompletedFocusSessions((prev) => prev + 1);
  }, []);

  const nextCycle = useCallback(() => {
    setCurrentCycle((prev) => prev + 1);
  }, []);

  const resetCycle = useCallback(() => {
    setCompletedFocusSessions(0);
    setCurrentCycle(1);
  }, []);

  return (
    <SessionContext
      value={{
        completedFocusSessions,
        currentCycle,
        completeFocusSession,
        nextCycle,
        resetCycle,
      }}
    >
      {children}
    </SessionContext>
  );
};

export const useSessionContext = () => {
  const context = use(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider');
  }

  return context;
};
