import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import axios from 'axios';

export default function StudentRecordsScreen({ route }) {
  const { regNo, group, semester, subject } = route.params; // Destructure parameters from route
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student data based on the passed parameters
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://your-backend-url/api/student-records', {
          params: {
            regNo,
            group,
            semester,
            subject
          }
        });
        setStudentData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [regNo, group, semester, subject]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Records</Text>
      {studentData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Registration Number: {studentData.regNo}</Text>
          <Text style={styles.dataText}>Name: {studentData.name}</Text>
          <Text style={styles.dataText}>Department: {studentData.department}</Text>
          <Text style={styles.dataText}>Semester: {studentData.semester}</Text>
          <Text style={styles.dataText}>Subject: {studentData.subject}</Text>
          <Text style={styles.dataText}>Attendance Records:</Text>
          {studentData.attendanceRecords.map((record, index) => (
            <Text key={index} style={styles.dataText}>
              Date: {record.date}, Status: {record.status}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noRecordsText}>No records found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  dataContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  dataText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  noRecordsText: {
    fontSize: 18,
    color: '#003366',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
