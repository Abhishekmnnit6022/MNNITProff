import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function ClassSelect() {
  const departments = [
    "A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2",
    "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "K1", "L1",
    "M1", "N1", "N2", "O1",
  ];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const navigation = useNavigation();
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const handleAttendancePress = () => {
    if (!selectedDept || !selectedSem) {
      alert("Please select both a department and semester");
    } else {
      navigation.navigate("Attendance Page", {
        group: selectedDept,
        semester: selectedSem,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Class</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Department</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDept}
            onValueChange={(itemValue) => setSelectedDept(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a department" value="" />
            {departments.map((dept) => (
              <Picker.Item key={dept} label={dept} value={dept} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Semester</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSem}
            onValueChange={(itemValue) => setSelectedSem(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a semester" value="" />
            {semesters.map((sem) => (
              <Picker.Item key={sem} label={sem} value={sem} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleAttendancePress} style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#003366',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  picker: {
    color: '#333333',
  },
  button: {
    backgroundColor: '#003366',
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});