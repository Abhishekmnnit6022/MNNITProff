// AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userEmail, setuserEmail] = useState(null);
  const [userName, setuserName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        setuserName(userName);
        setuserEmail(userEmail);

      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ userEmail, userName, setuserEmail, setuserName }}>
      {children}
    </AppContext.Provider>
  );
};