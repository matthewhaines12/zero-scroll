let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = (token) => {
  accessToken = null;
};

export const getAccessToken = () => accessToken;
