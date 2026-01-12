import { createContext, use, useEffect, useState } from 'react';
import * as authApi from '../services/api/auth.api';
import {
  setAccessToken as setApiAccessToken,
  clearAccessToken,
} from '../services/api/authToken';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | authenticated | unauthenticated

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await authApi.refresh();
        setUser(res.user);
        setAccessToken(res.newAccessToken);
        setApiAccessToken(res.newAccessToken);
        setStatus('authenticated');
      } catch (err) {
        console.error(err);
        setUser(null);
        setAccessToken(null);
        setStatus('unauthenticated');
      }
    };

    refreshAuth();
  }, []);

  const signup = async (data) => {
    await authApi.signup(data);
  };

  const login = async (data) => {
    const res = await authApi.login(data);
    setUser(res.userObj);
    setAccessToken(res.accessToken);
    setApiAccessToken(res.accessToken);
    setStatus('authenticated');
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setAccessToken(null);
    clearAccessToken();
    setStatus('unauthenticated');
  };

  const verifyEmail = async (emailToken) => {
    await authApi.verifyEmail(emailToken);
  };

  const resendVerification = async (email) => {
    await authApi.resendVerification(email);
  };

  const deleteAccount = async () => {
    try {
      await authApi.deleteAccount();
      setUser(null);
      setAccessToken(null);
      clearAccessToken();
      setStatus('unauthenticated');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext
      value={{
        user,
        status,
        accessToken,
        signup,
        login,
        logout,
        verifyEmail,
        resendVerification,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
