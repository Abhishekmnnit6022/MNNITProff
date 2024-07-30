import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const response = await axios.get(`https://mnnitproff.as.r.appspot.com/api/profile/${userEmail}`);
        console.log('Profile data:', response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Text style={styles.message}>Loading...</Text>;
  if (error) return <Text style={styles.message}>{error}</Text>;
  if (!profile) return <Text style={styles.message}>No profile data found</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Professor Profile</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profile.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        {/* <View style={styles.infoContainer}>
          <Text style={styles.label}>Group:</Text>
          <Text style={styles.value}>{profile.group}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Semester:</Text>
          <Text style={styles.value}>{profile.semester}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#003366',
    fontWeight: '500',
  },
  message: {
    fontSize: 18,
    color: '#003366',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfilePage;