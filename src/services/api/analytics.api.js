import api from './axios';

export const getFocusConsistency = async (days) => {
  const { data } = await api.get(`/analytics/focus-days/${days}`);
  return data;
};

export const getBestFocusHours = async (days) => {
  const { data } = await api.get(`/analytics/focus-hours/${days}`);
  return data;
};

export const getSessionOutcomes = async (days) => {
  const { data } = await api.get(`/analytics/session-outcomes/${days}`);
  return data;
};

export const getUserStats = async () => {
  const { data } = await api.get('/analytics/user-stats');
  return data;
};
