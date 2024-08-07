import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import StudentList from "../components/StudentList";
const AttendancePage = () => {
  const route = useRoute();
  const { group, semester, subject } = route.params;
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentData = useCallback(async (group, semester, subject) => {

    try {
      //change port according to your server
      const response = await axios.get(
        `https://mnnitproff.as.r.appspot.com/students/${group}/${semester}`
      );
      setStudentData(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error in fetching student list", error);
      setLoading(false);
      setError("Failed to fetch student data");
    }
  }, []);

  useEffect(() => {
    if (group && semester &&  subject) {
      fetchStudentData(group, semester);
      console.log("Fetching student data", group, semester, subject);
    }
  }, [group, semester, fetchStudentData]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="grey" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <StudentList data={studentData} group={group} semester={semester} subject={subject}/>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AttendancePage;
