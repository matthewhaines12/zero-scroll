import api from './axios';

export const startSession = async (
  sessionType,
  plannedDuration,
  accessToken
) => {
  const { data } = await api.post(
    '/sessions',
    { sessionType, plannedDuration }, // *** FIX LATER: Calc startTime and endTime client side first ***
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const stopSession = async (
  sessionID,
  actualDuration,
  completed, // If session was ended early, completed = false
  accessToken
) => {
  const { data } = await api.patch(
    `/sessions/${sessionID}`,
    {
      actualDuration,
      completed,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const getSessions = async (accessToken) => {
  const { data } = await api.get('/sessions', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
