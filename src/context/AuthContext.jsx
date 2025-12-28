// import { createContext, useContext, useEffect, useState } from 'react';
// import { login, signup, refresh, logout } from '../services/apiAuth';

// let accessToken = null;

// export const setAccessToken = (token) => {
//   accessToken = token;
// };

// export const getAccessToken = () => accessToken;

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const tryRefresh = async () => {
//       try {
//         const res = await refresh();
//         setAccessToken(res.data.accessToken);
//         setUser(res.data.user);
//       } catch (err) {
//         setAccessToken(null);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     tryRefresh();
//   }, []); // Run on mount

//   const handleSignup = async (userData) => {
//     const res = await signup(userData);
//     setAccessToken(res.data.accessToken);
//     setUser(res.data.user);
//     return res;
//   };

//   const handleLogin = async (credentials) => {
//     const res = await login(credentials);
//     setAccessToken(res.data.accessToken);
//     setUser(res.data.user);
//     return res;
//   };

//   //   const handleLogout = async () => {
//   //     await logout();
//   //     setAccessToken(null);
//   //     setUser(null);
//   //   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         handleLogin,
//         handleSignup,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, use, useState } from 'react';
import * as authApi from '../services/api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const signup = async (data) => {
    await authApi.signup(data);
  };

  const login = async (data) => {
    const res = await authApi.login(data);

    setUser(res.userObj);
    setAccessToken(res.accessToken);
  };

  return <AuthContext value={{ user, signup, login }}>{children}</AuthContext>;
};

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
