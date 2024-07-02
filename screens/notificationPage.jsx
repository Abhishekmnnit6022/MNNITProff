import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const NotificationPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  const departments = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2","E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "K1", "L1", "M1", "N1", "N2", "O1"];
  const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  const sendNotification = async () => {
    if (!title || !message || !selectedDepartment || !selectedSemester) {
      alert('Please fill all fields');
      return;
    }

    const currentDate = new Date();
    const notificationData = {
      title,
      message,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }),
      department: selectedDepartment,
      semester: selectedSemester
    };

    try {
      const response = await axios.post('http://localhost:8000/pushNotification', notificationData);
      alert('Notification sent successfully');
      setTitle('');
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
      <ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>Send Notification</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your name or department"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Enter your message"
          placeholderTextColor="#999"
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
            <Picker.Item label="Select a department" value="" />
            {departments.map((dept) => (
              <Picker.Item key={dept} label={dept} value={dept}  style={{color:"black"}} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSemester}
            onValueChange={(itemValue) => setSelectedSemester(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a semester" value="" />
            {semesters.map((sem) => (
              <Picker.Item key={sem} label={sem} value={sem} style={{color:"black"}} />
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
    backgroundColor: '#1E1E1E',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    color: 'black12',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  messageInput: {
    minHeight: 100,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#4643cd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationPage;