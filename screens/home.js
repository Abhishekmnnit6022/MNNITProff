import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AttendancePage')} style={styles.box}>
        <Text style={styles.title}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>Records</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>My Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>Students</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "#f4779f",
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 20,
    color: '#3308f3',
    textAlign: 'center',
  }
});
