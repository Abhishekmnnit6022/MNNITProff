import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationPage = () => {
  // const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const departments = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2","E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "K1", "L1", "M1", "N1", "N2", "O1"];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const sendNotification = async () => {

    const title = await AsyncStorage.getItem('userName');
    if (!title || !message || !selectedDepartment || !selectedSemester) {
      alert('Please fill all fields');
      return;
    }
    
    const currentDate = new Date();
    const notificationData = {
      title,
      message,
      Date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }),
      department: selectedDepartment,
      semester: selectedSemester
    };
    console.log('Notification data:', notificationData);

    try {
      const response = await axios.post(`http://localhost:8000/pushNotification`, notificationData);
      alert('Notification sent successfully');
      
      setMessage('');
      setSelectedDepartment('');
      setSelectedSemester('');
      console.log('Notification sent:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        <View style={styles.content}>
          
          {/* <TextInput
            style={styles.input}
            placeholder="Sender Name/Department"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          /> */}

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Notification Message"
            placeholderTextColor="#666"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Department" value="" />
              {departments.map((dept) => (
                <Picker.Item key={dept} label={dept} value={dept} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSemester}
              onValueChange={(itemValue) => setSelectedSemester(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Semester" value="" />
              {semesters.map((sem) => (
                <Picker.Item key={sem} label={sem} value={sem} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={sendNotification}>
            <Text style={styles.buttonText}>Send Notification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#003366',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    fontSize: 16,
    color: '#333333',
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  picker: {
    color: '#333333',
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NotificationPage;