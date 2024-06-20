import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
const image = require('./assets/images/collegelogo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 120,
    width: 100,
    resizeMode: 'contain',
    marginTop: 70,
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
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.logo} />
      <Text style={styles.title}>Motilal Nehru National Institute of Technology</Text>
      <Text style={styles.subTitle}>Allahabad</Text>

      <Text style={styles.fieldLabel}>Official Email</Text>
      <TextInput style={styles.textInput} />

      <Text style={styles.fieldLabel}>Password</Text>
      <TextInput style={styles.textInput} secureTextEntry={true} />

      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
