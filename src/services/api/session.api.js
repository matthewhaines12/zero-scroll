import api from './axios';

export const startSession = async (sessionType, plannedDuration) => {
  const { data } = await api.post(
    '/sessions',
    { sessionType, plannedDuration } // *** FIX LATER: Calc startTime and endTime client side first ***
  );
  return data;
};

export const stopSession = async (
  sessionID,
  actualDuration,
  completed, // If session was ended early or less than focus minutes minimum, completed = false
  countsTowardStats
) => {
  const { data } = await api.patch(`/sessions/${sessionID}`, {
    actualDuration,
    completed,
    countsTowardStats,
  });
  return data;
};

// export const getSessions = async () => {
//   const { data } = await api.get('/sessions');
//   return data;
// };

export const getDailySessionStats = async () => {
  const { data } = await api.get('/sessions/today');
  return data;
};
