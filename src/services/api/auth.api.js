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
