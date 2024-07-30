import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationPage = () => {
  const [message, setMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [editingNotification, setEditingNotification] = useState(null);
  const [professorId, setProfessorId] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const departments = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2","E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "K1", "L1", "M1", "N1", "N2", "O1"];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  useEffect(() => {
    getProfessorInfo();
  }, []);

  useEffect(() => {
    if (professorId && selectedDepartment && selectedSemester) {
      fetchNotifications();
    }
  }, [professorId, selectedDepartment, selectedSemester]);

  const getProfessorInfo = async () => {
    try {
      const id = await AsyncStorage.getItem('userEmail');
      const name = await AsyncStorage.getItem('userName');
      console.log('Retrieved professorId:', id);
      console.log('Retrieved professorName:', name);
      if (id && name) {
        setProfessorId(id);
        setProfessorName(name);
      } else {
        console.log('No userId or userName found in AsyncStorage');
        Alert.alert('Error', 'Unable to retrieve professor information. Please try logging out and logging in again.');
      }
    } catch (error) {
      console.error('Error retrieving professor information:', error);
      Alert.alert('Error', 'Error retrieving professor information. Please try again.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`https://mnnitproff.as.r.appspot.com/pushNotification/${professorId}/${selectedDepartment}/${selectedSemester}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to fetch notifications');
    }
  };

  const sendNotification = async () => {
    if (isSending) return;

    if (!professorId || !professorName) {
      Alert.alert('Error', 'Professor information is missing. Please try logging out and logging in again.');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    if (!selectedDepartment) {
      Alert.alert('Error', 'Please select a department');
      return;
    }

    if (!selectedSemester) {
      Alert.alert('Error', 'Please select a semester');
      return;
    }
    
    const currentDate = new Date();
    const notificationData = {
      professorId,
      title: professorName,
      message,
      Date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }),
      department: selectedDepartment,
      semester: selectedSemester
    };

    setIsSending(true);

    try {
      const response = await axios.post(`https://mnnitproff.as.r.appspot.com/pushNotification`, notificationData);
      console.log('Notification sent:', response.data);

      Alert.alert('Success', 'Notification sent successfully');
      setMessage('');
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'Failed to send notification');
    } finally {
      setIsSending(false);
    }
  };

  const updateNotification = async (id) => {
    if (isEditing) return;

    setIsEditing(true);
    try {
      const response = await axios.put(`https://mnnitproff.as.r.appspot.com/pushNotification/${selectedDepartment}/${selectedSemester}/${id}`, {
        message: editingNotification.message,
        title: editingNotification.title
      });
      setEditingNotification(null);
      fetchNotifications();
      Alert.alert('Success', 'Notification updated and push notification sent successfully');
    } catch (error) {
      console.error('Error updating notification:', error);
      Alert.alert('Error', 'Failed to update notification and send push notification');
    } finally {
      setIsEditing(false);
    }
  };

  const deleteNotification = async (id) => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      console.log('Deleting notification with id:', id);
      await axios.delete(`https://mnnitproff.as.r.appspot.com/pushNotification/${selectedDepartment}/${selectedSemester}/${id}`);
      fetchNotifications();
      Alert.alert('Success', 'Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification');
    } finally {
      setIsDeleting(false);
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>{item.Date} {item.time}</Text>
      <View style={styles.notificationActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setEditingNotification(item)}
          disabled={isEditing || isDeleting}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton, isDeleting && styles.disabledButton]} 
          onPress={() => deleteNotification(item._id)}
          disabled={isDeleting || isEditing}
        >
          <Text style={styles.actionButtonText}>{isDeleting ? 'Deleting...' : 'Delete'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

          <TouchableOpacity 
            style={[styles.button, isSending && styles.disabledButton]} 
            onPress={sendNotification}
            disabled={isSending}
          >
            <Text style={styles.buttonText}>{isSending ? 'Sending...' : 'Send Notification'}</Text>
          </TouchableOpacity>

          {editingNotification && (
            <View style={styles.editContainer}>
              <TextInput
                style={[styles.input, styles.editInput]}
                value={editingNotification.message}
                onChangeText={(text) => setEditingNotification({...editingNotification, message: text})}
                multiline
              />
              <TouchableOpacity 
                style={[styles.button, isEditing && styles.disabledButton]} 
                onPress={() => updateNotification(editingNotification._id)}
                disabled={isEditing}
              >
                <Text style={styles.buttonText}>{isEditing ? 'Updating...' : 'Update Notification'}</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.sectionTitle}>Previous Notifications</Text>
        </ScrollView>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  flatListContent: {
    padding: 20,
    paddingTop: 0,
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
  editContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  editInput: {
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#003366',
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  notificationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    borderRadius: 3,
    backgroundColor: '#003366',
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#CC0000',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default NotificationPage;