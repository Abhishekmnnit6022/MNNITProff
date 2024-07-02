import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const image = require('../assets/images/collegelogo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 1,
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
    marginLeft: 8,
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
    backgroundColor: '#E1963F',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  testButton:{backgroundColor: '#4643cd',
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
  box: {
    width: '100%',
    maxWidth: 350,
  },
});

const emailRegex = /^[a-zA-Z0-9._%+-]+@mnnit\.ac\.in$/; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginInfo = () => {
    // if (!email || !password) {
    //   Alert.alert('Error', 'Please fill out all fields.')}
    // else if (!emailRegex.test(email)) {
    //   Alert.alert('Error', 'Please enter a valid institutional email address.');
    // }
    // else if((password.length)<4){
    //   Alert.alert('Password can\'t be less than 4 character');
    // }
    //  else {
    
      navigation.navigate("Home");
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>Motilal Nehru National Institute of Technology</Text>
        <Text style={styles.subTitle}>Allahabad</Text>

        <View style={styles.box}>
          <Text style={styles.fieldLabel}>Official Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="email@mnnit.ac.in"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={loginInfo}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testButton} onPress={() =>    navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Forget Password")}>
          <Text style={styles.subTitle2}>Forget Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
