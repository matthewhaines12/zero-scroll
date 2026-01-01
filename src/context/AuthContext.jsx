import { createContext, use, useEffect, useState } from 'react';
import * as authApi from '../services/api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await authApi.refresh();
        setUser(res.user);
        setAccessToken(res.newAccessToken);
      } catch (err) {
        console.error(err);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
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
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setAccessToken(null);
  };

  const verifyEmail = async (emailToken) => {
    await authApi.verifyEmail(emailToken);
  };

  const resendVerification = async (email) => {
    await authApi.resendVerification(email);
  };

  const deleteAccount = async () => {
    try {
      console.log('we made it here');
      await authApi.deleteAccount(accessToken);
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.log('hi, i failed ');
      console.error(err);
    }
  };

  return (
    <AuthContext
      value={{
        user,
        loading,
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
