import { createContext, use, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { getUserStats } from '../services/api/analytics.api';

const UserStatsContext = createContext(null);

export const UserStatsProvider = ({ children }) => {
  const { status, accessToken } = useAuthContext();
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalFocusTime: 0,
    tasksCompleted: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchUserStats = async () => {
    if (status === 'authenticated' && accessToken) {
      setLoading(true);

      try {
        const res = await getUserStats();
        setUserStats({
          totalSessions: res.totalSessions || 0,
          totalFocusTime: res.totalFocusTime || 0,
          tasksCompleted: res.tasksCompleted || 0,
          currentStreak: res.currentStreak || 0,
        });
      } catch (err) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [status, accessToken]);

  return (
    <UserStatsContext
      value={{
        userStats,
        loading,
        refetchUserStats: fetchUserStats,
      }}
    >
      {children}
    </UserStatsContext>
  );
};

export const useUserStatsContext = () => {
  const context = use(UserStatsContext);

  if (!context) {
    throw new Error(
      'useUserStatsContext must be used within UserStatsProvider',
    );
  }

  return context;
};
