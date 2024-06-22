import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const image = require('../assets/images/collegelogo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignItems: 'center',
    padding: 0,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    color: '#290E47',
    padding: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#290E47',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle2: {
    fontSize: 16,
    color: '#290E47',
    marginBottom: 20,
    textAlign: 'center',
    marginVertical: 15,
  },
  fieldLabel: {
    fontSize: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  textInput: {
    borderColor: '#18089E',
    width: '100%',
    maxWidth: 350,
    height: 50,
    borderWidth: 1.3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FAB54C',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginInfo = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.logo} />
      <Text style={styles.title}>Motilal Nehru National Institute of Technology</Text>
      <Text style={styles.subTitle}>Allahabad</Text>

      <Text style={styles.fieldLabel}>Official Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.fieldLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={loginInfo}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.subTitle2}>Forget Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
