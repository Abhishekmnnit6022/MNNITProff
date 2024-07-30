import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingContent}>
    <Text style={styles.loadingText}>
        Please{'\n'}
        <Text style={styles.loadingTextSecondLine}>Wait</Text>
      </Text>     
       <ActivityIndicator
        size="large"
        color="white"
        style={styles.loadingIndicator}
      />
    </View>
  </View>
);

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    setIsCheckingToken(true);
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      try {
        const response = await fetch(
          "https://mnnitproff.as.r.appspot.com/login/verify-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          navigation.navigate("Home");
        } else {
          await AsyncStorage.removeItem("userToken");
        }
      } catch (error) {
        console.error("Token verification error:", error);
      }
    }
    setIsCheckingToken(false);
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://mnnitproff.as.r.appspot.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Data from response", data);

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userEmail", data.user.Email);
        await AsyncStorage.setItem("userName", data.user.Name);
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

  if (isCheckingToken) {
    return <LoadingScreen />;
  }

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
              onPress={() => navigation.navigate("Forget Password")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
    padding: wp("5%"),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: hp("2.5%"),
  },
  logo: {
    width: wp("30%"),
    height: wp("30%"),
  },
  instituteName: {
    alignItems: "center",
    marginBottom: hp("5%"),
  },
  instituteNameText: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: hp("0.6%"),
  },
  instituteLocation: {
    fontSize: wp("4%"),
    color: "#003366",
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: wp("2.5%"),
    padding: wp("5%"),
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
    marginTop: hp("2.5%"),
    color: "#003366",
    fontSize: wp("3.5%"),
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#003366",
    justifyContent: "center",
  },
  loadingLogo: {
    width: wp("20%"),
    height: wp("20%"),
    marginBottom: hp("2%"),
  },
  loadingIndicator: {
    alignSelf: "flex-start",
  },
  loadingContent: {
    marginLeft: wp("10%"),
  },
  loadingTextSecondLine: {
    fontSize: wp('8%'), 
  },

  loadingText: {
    fontSize: wp("10%"),
    color: "white",
    fontWeight: "bold",
    marginBottom: hp("2%"),
    lineHeight: wp('12%'),
  },
});
