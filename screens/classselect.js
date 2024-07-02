import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

export default function Classselect() {
  const navigation = useNavigation();
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedG, setSelectedG] = useState(null);

  const handleAttendancePress = () => {
    navigation.navigate('AttendancePage', { group: selectedG, semester: selectedSem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Semester:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedSem(value)}
        items={[
          { label: "SEM 1", value: "1" },
          { label: "SEM 2", value: "2" },
          { label: "SEM 3", value: "3" },
          { label: "SEM 4", value: "4" },
          { label: "SEM 5", value: "5" },
          { label: "SEM 6", value: "6" },
          { label: "SEM 7", value: "7" },
          { label: "SEM 8", value: "8" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Semester...", value: null }}
      />

      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>Select Group:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedG(value)}
          items={[
            { label: "A1", value: "A1" },
            { label: "A2", value: "A2" },
            { label: "B1", value: "B1" },
            { label: "B2", value: "B2" },
            { label: "C1", value: "C1" },
            { label: "C2", value: "C2" },
            { label: "D1", value: "D1" },
            { label: "D2", value: "D2" },
            { label: "E1", value: "E1" },
            { label: "E2", value: "E2" },
            { label: "F1", value: "F1" },
            { label: "F2", value: "F2" },
            { label: "G1", value: "G1" },
            { label: "G2", value: "G2" },
            { label: "H1", value: "H1" },
            { label: "H2", value: "H2" },
            { label: "I1", value: "I1" },
            { label: "I2", value: "I2" },
            { label: "J1", value: "J1" },
            { label: "J2", value: "J2" },
            { label: "K1", value: "K1" },
            { label: "K2", value: "K2" },
            { label: "L1", value: "L1" },
            { label: "L2", value: "L2" },
            { label: "M1", value: "M1" },
            { label: "M2", value: "M2" },
            { label: "N1", value: "N1" },
            { label: "N2", value: "N2" },
            { label: "O1", value: "O1" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Group...", value: null }}
        />
      </View>

      <TouchableOpacity onPress={handleAttendancePress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Take Attendance</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 150,
   
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#B095FD",
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: 70,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
