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
    "A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2",
    "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "K1", "L1",
    "M1", "N1", "N2", "O1",
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
      <Text style={styles.title}>Select Class</Text>

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
              style={styles.pickerItem}
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
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity onPress={handleAttendancePress} style={styles.button}>
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    color: "#ECF0F1",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  pickerContainer: {
    backgroundColor: "#ECF0F1",
    marginTop: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    color: "#34495E",
  },
  pickerItem: {
    color: "#34495E",
  },
  button: {
    backgroundColor: "#E74C3C",
    height: 50,
    width: 200,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#111111",
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 3.14,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ECF0F1",
  },
});
