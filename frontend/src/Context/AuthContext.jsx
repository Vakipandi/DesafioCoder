import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = (user) => {
    setUserInfo(user);
  };

  const logout = () => {
    setUserInfo(null);
      
  };

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated: !!userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
