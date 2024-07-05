import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function Classselect() {
  const departments = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "D1",
    "D2",
    "E1",
    "E2",
    "F1",
    "F2",
    "G1",
    "G2",
    "H1",
    "H2",
    "I1",
    "J1",
    "K1",
    "L1",
    "M1",
    "N1",
    "N2",
    "O1",
  ];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const navigation = useNavigation();
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedG, setSelectedG] = useState(null);

  const handleAttendancePress = () => {
    if (!selectedG || !selectedSem) {
      alert("Please select a department and semester");
      return;
    } else {
      navigation.navigate("Attendance Page", {
        group: selectedG,
        semester: selectedSem,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View  style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 30,
            fontWeight: "bold",
          }}
        >
          Select Class
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedG}
            onValueChange={(itemValue) => setSelectedG(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a department" value="" />
            {departments.map((dept) => (
              <Picker.Item
                key={dept}
                label={dept}
                value={dept}
                style={{ color: "black" }}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSem}
            onValueChange={(itemValue) => setSelectedSem(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a semester" value="" />
            {semesters.map((sem) => (
              <Picker.Item
                key={sem}
                label={sem}
                value={sem}
                style={{ color: "black" }}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleAttendancePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Select</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center"
  },
  pickerContainer: {
    backgroundColor: "#ffffff89",
    marginTop: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: "#000000",
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4643cd",
    height: 50,
    width: 200,
    alignSelf: "center",
    marginTop: 70,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
});
