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
  const { data } = await api.post('/auth/logout'); // generate new access token
  return data;
};
