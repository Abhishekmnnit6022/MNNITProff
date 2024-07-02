import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./login";
import { LinearGradient } from "expo-linear-gradient";

const SidePanelContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/collegelogo.png")}
        style={{
          width: 100,
          height: 200,
          objectFit: "contain",
          marginTop: 50,
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={styles.logout}>
          <Text style={{ fontSize: 23, fontWeight: "bold", color: "white" }}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.help}>
          <Text style={{ fontSize: 23, fontWeight: "bold", color: "white" }}>
            Help
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ marginTop: 40, color: "black" }}>
        All rights reserved @MNNIT
      </Text>
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
    marginTop: 250,
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
