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

export const deleteAccount = async () => {
  const { data } = await api.delete('/auth/delete-account');
  return data;
};

// User settings and preferences
export const getSettings = async () => {
  const { data } = await api.get('/auth/settings');
  return data;
};

export const updateTimerSettings = async (updates) => {
  const { data } = await api.patch('/auth/settings/timer', updates);
  return data;
};

export const updatePreferences = async (updates) => {
  const { data } = await api.patch('/auth/settings/preferences', updates);
  return data;
};
