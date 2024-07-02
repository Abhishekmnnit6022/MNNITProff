import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import StudentList from '../components/StudentList';

const AttendancePage = () => {
  const route = useRoute();
  const { group, semester } = route.params;
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);

  const fetchStudentData = useCallback(async (group, semester) => {
    try {
      const response = await axios.get(`http://localhost:8000/students/${group}/${semester}`);
      setStudentData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error in fetching student list", error);
      setError("Failed to fetch student data");
    }
  }, []);

  useEffect(() => {
    console.log('group seleceted:', group, 'semester selected:', semester);
    if (group && semester) {
      fetchStudentData(group, semester);
    }
  }, [group, semester, fetchStudentData]);

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <StudentList data={studentData} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AttendancePage;
