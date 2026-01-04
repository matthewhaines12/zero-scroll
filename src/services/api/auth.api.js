import api from './axios';

export const signup = async (userData) => {
  const { data } = await api.post('/auth/signup', userData);
  return data;
};

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const refresh = async () => {
  const { data } = await api.post('/auth/refresh'); // generate new access token
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

// verify email
export const verifyEmail = async (emailToken) => {
  const { data } = await api.get('/auth/verify-email', {
    params: { token: emailToken },
  });
  return data;
};

export const resendVerification = async (email) => {
  const { data } = await api.post('/auth/resend-verification', {
    email: email,
  });
  return data;
};

// forgotPassword

export const deleteAccount = async (accessToken) => {
  const { data } = await api.delete('/auth/delete-account', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

// User settings and preferences
export const getSettings = async (accessToken) => {
  const { data } = await api.get('/auth/settings', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateTimerSettings = async (updates, accessToken) => {
  const { data } = await api.patch('/auth/settings/timer', updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updatePreferences = async (updates, accessToken) => {
  const { data } = await api.patch('/auth/settings/preferences', updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
