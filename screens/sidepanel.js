import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./login";
import { LinearGradient } from "expo-linear-gradient";

const SidePanelContent = ({ navigation }) => {
  return (
    <View className="justify-between" style={styles.container}>
      <Image
        source={require("./../assets/images/collegelogo.png")}
        style={{
          width: 100,
          height: 200,
          objectFit: "contain",
          marginTop: 50,
        }}
      />
      <View className="mb-7 items-center justify-center">
      <TouchableOpacity>
        <View className="rounded-3xl bg-[#4643cd] m-3 p-3 items-center">
          <Text className="text-white font-pregular text-xl">
            Forgot Password
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View className="rounded-3xl bg-[#4643cd] m-3 p-3 items-center">
          <Text className="text-white font-pregular text-xl">
            Logout
          </Text>
        </View>
      </TouchableOpacity>
     
      <Text style={{ marginTop: 40, color: "black" }}>
        All rights reserved @MNNIT
      </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    backgroundColor: "#4643cd",
    padding: 15,
    borderRadius: 50,
  },
  help: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    backgroundColor: "#4643cd",
    padding: 15,
    borderRadius: 50,
  },
});
export default SidePanelContent;
