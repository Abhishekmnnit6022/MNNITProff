import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/login/forgot-password', { email });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <FormField
          title="Email"
          value={email}
          otherStyles={styles.formField}
          handleChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomButton
          title="Reset Password"
          handlePress={handleForgotPassword}
          isLoading={isLoading}
          containerStyle={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  formField: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default ForgotPassword;