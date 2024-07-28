import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PasswordResetScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const resetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const email = await AsyncStorage.getItem('userEmail');
      //add correct api
      const response = await fetch("will add my api", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password reset successfully');
        // Navigate back to the previous screen or home screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert('Error', 'An error occurred during password reset');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView  className="h-full m-4"
    style={{
    }}>
      <View >
        <FormField
          title="Current Password"
          value={currentPassword}
          handleChangeText={(text) => setCurrentPassword(text)}
             otherStyles="m-4"
          
        />
        <FormField
          title="New Password"
          value={newPassword}
          handleChangeText={(text) => setNewPassword(text)}
             otherStyles="m-4"
          
        />
        <FormField
          title="Confirm New Password"
          value={confirmNewPassword}
          handleChangeText={(text) => setConfirmNewPassword(text)}
          otherStyles="m-4"
          
        />
        <CustomButton
          title="Reset Password"
          handlePress={resetPassword}
          isLoading={isLoading}
          containerStyle="m-4"
         
        />
      </View>
    </SafeAreaView>
  );
};

export default PasswordResetScreen;