import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SidePanel = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isOnSidePanel, setIsOnSidePanel] = useState(true);
  const navigation = useNavigation();

  const menuItems = [
    { icon: "home-outline", label: "Home", screen: "Home" },
    { icon: "calendar-outline", label: "Schedule", screen: "Schedule" },
    { icon: "person-outline", label: "Profile", screen: "Profile" },
  ];

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
    setActiveMenu(screen);
    setIsOnSidePanel(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsOnSidePanel(true);
      setActiveMenu("Home");
    });

    return unsubscribe;
  }, [navigation]);

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "userRegNo"]);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred during logout");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./../assets/icons/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.instituteName}>MNNIT Allahabad</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                (isOnSidePanel && item.label === "Home") ||
                (!isOnSidePanel && activeMenu === item.label)
                  ? styles.activeMenuItem
                  : null,
              ]}
              onPress={() => handleMenuPress(item.screen)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={
                  (isOnSidePanel && item.label === "Home") ||
                  (!isOnSidePanel && activeMenu === item.label)
                    ? "#ffffff"
                    : "#003366"
                }
              />
              <Text
                style={[
                  styles.menuItemText,
                  (isOnSidePanel && item.label === "Home") ||
                  (!isOnSidePanel && activeMenu === item.label)
                    ? styles.activeMenuItemText
                    : null,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Reset Password")}
          >
            <Ionicons name="key-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={logout}
          >
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            © 2024 MNNIT Allahabad. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: Platform.OS === "ios" ? 20 : 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 30,
  },
  instituteName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginTop: 10,
    textAlign: "center",
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeMenuItem: {
    backgroundColor: "#003366",
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#003366",
    fontWeight: "500",
  },
  activeMenuItemText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  bottomContainer: {
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#003366",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: "#8b0000",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  footer: {
    color: "#666666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SidePanel;
