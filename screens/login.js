import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const image = require("../assets/images/collegelogo.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Added useEffect to check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  
  // Added function to check login status
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    console.log("userToken", token);
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/login/verify-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          navigation.navigate("Home");

          // User is logged in, navigate to home screen
          
        } else {
          // Token is invalid, clear it
          await AsyncStorage.removeItem('userToken');
        }
      } catch (error) {
        console.error('Token verification error:', error);
      }
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
      });

      const data = await response.json();
      console.log("Data from response", data)

      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem('userToken', data.token);
        // Added: Store the regNo
        // await AsyncStorage.setItem('userEmail', Email.toString());
        // Navigate to home screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
   
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>
          Motilal Nehru National Institute of Technology
        </Text>
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

        <TouchableOpacity style={styles.loginButton} onPress={submit} 
            isloading={isLoading}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot Password")}
        >
          <Text style={styles.subTitle2}>Forget Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    color: "#290E47",
    padding: 20,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#290E47",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 1,
  },
  subTitle2: {
    fontSize: 16,
    color: "#290E47",
    marginBottom: 20,
    textAlign: "center",
    marginVertical: 15,
  },
  fieldLabel: {
    fontSize: 15,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 8,
  },
  textInput: {
    borderColor: "#18089E",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderWidth: 1.3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#E1963F",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  testButton: {
    backgroundColor: "#4643cd",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  box: {
    width: "100%",
    maxWidth: 350,
  },
});
