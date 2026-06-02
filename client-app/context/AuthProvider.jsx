import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// สร้าง Context
const AuthContext = createContext();

// ใช้ context ในคอมโพเนนต์ต่างๆ
export const useAuth = () => useContext(AuthContext);

// สร้าง provider component เพื่อแชร์ข้อมูลไปยังคอมโพเนนต์ต่างๆ
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null); // สถานะของ token
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
          setUserToken(token);
        }
      } catch (e) {
        console.error("Error checking token: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token) => {
    setIsAuthenticated(true);
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


