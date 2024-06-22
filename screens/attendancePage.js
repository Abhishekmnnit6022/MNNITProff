import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import studentData from '../studentData.json';
import StudentList from '../components/StudentList';

const AttendancePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StudentList data={studentData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AttendancePage;
