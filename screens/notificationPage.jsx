import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const NotificationPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes] = useState(['ECMS1', 'ECMS2', 'ECMS3', 'ECMS4']); 

  const sendNotification = async () => {
    if (!title || !message || !selectedClass) {
      alert('Please enter a title, message, and select a class');
      return;
    }

    const currentDate = new Date();
    const notificationData = {
      title,
      message,
      date: currentDate,
      time: currentDate.toLocaleTimeString(),
      class: selectedClass 
    };

    try {
      const response = await axios.post('http://localhost:8000/pushNotification', notificationData);
      alert('Notification sent successfully');
      setTitle('');
      setMessage('');
      setSelectedClass('');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Send Notification</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter notification title"
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
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a class" value="" />
            {classes.map((className) => (
              <Picker.Item key={className} label={className} value={className} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={sendNotification}>
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#4CAF50',
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