import api from './axios';

export const getFocusConsistency = async (days, accessToken) => {
  const { data } = await api.get(`/analytics/focus-consistency/${days}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
