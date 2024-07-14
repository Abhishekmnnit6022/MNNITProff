// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          router.replace('/');
        } else {
          setIsLoading(false);
        }
      };

      checkToken();
    }, []);

    if (isLoading) {
      return <View><Text>Loading...</Text></View>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;