import api from './axios';

export const getFocusConsistency = async (days, accessToken) => {
  const { data } = await api.get(`/analytics/focus-days/${days}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getBestFocusHours = async (days, accessToken) => {
  const { data } = await api.get(`/analytics/focus-hours/${days}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getSessionOutcomes = async (days, accessToken) => {
  const { data } = await api.get(`/analytics/session-outcomes/${days}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
