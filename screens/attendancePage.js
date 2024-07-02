import React, { useEffect ,useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
// import studentData from '../studentData.json';
import axios from 'axios';
import StudentList from '../components/StudentList';

const AttendancePage = () => {
  const [studentData, setStudentData] = useState([]);
  
  const fetchStudentData = async (group,semester) => {
    try {
      const response = await axios.get(`http://localhost:8000/students/${group}/${semester}`);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error in fetching student list ",error);
    }
  }
  useEffect(() => {

    fetchStudentData("O1", "3");
  }, []);



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
