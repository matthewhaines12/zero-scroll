let accessToken = null;
let refreshListener = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = (token) => {
  accessToken = null;
};

export const getAccessToken = () => accessToken;

// register refresh callback
export const setRefreshListener = (cb) => {
  refreshListener = cb;
};

export const notifyTokenRefreshed = (token, user) => {
  if (refreshListener) {
    refreshListener(token, user);
  }
};
