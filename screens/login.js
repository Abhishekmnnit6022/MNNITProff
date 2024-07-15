import React, { useState, useEffect } from "react";
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
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  // Added useEffect to check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Added function to check login status
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      try {
        const response = await fetch(
          "http://192.168.29.178:8000/login/verify-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          navigation.navigate("Home");

          // User is logged in, navigate to home screen
        } else {
          // Token is invalid, clear it
          await AsyncStorage.removeItem("userToken");
        }
      } catch (error) {
        console.error("Token verification error:", error);
      }
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://192.168.29.178:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Data from response", data)

      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem("userToken", data.token);
        // Added: Store the regNo
        // await AsyncStorage.setItem('userEmail', Email.toString());
        // Navigate to home screen
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/collegelogo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <View style={styles.instituteName}>
            <Text style={styles.instituteNameText}>
              MOTILAL NEHRU NATIONAL INSTITUTE OF TECHNOLOGY
            </Text>
            <Text style={styles.instituteLocation}>ALLAHABAD</Text>
          </View>

          <View style={styles.formContainer}>
            <FormField
              title="Official Email"
              value={email}
              handleChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={password}
              handleChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              rightIcon={
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#003366"
                />
              }
              onIconPress={() => setShowPassword(!showPassword)}
            />

            <CustomButton
              title="Log In"
              handlePress={submit}
              isLoading={isLoading}
            />

            <TouchableOpacity
              onPress={()=>navigation.navigate("Forget Password")}>
                <Text style={styles.forgotPassword}> Forgot
              Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  instituteName: {
    alignItems: "center",
    marginBottom: 40,
  },
  instituteNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 5,
  },
  instituteLocation: {
    fontSize: 16,
    color: "#003366",
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  forgotPassword: {
    textAlign: "center",
    marginTop: 20,
    color: "#003366",
    fontSize: 14,
  },
});
