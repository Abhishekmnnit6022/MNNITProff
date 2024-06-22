import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ClassCard from '../components/ClassCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const fetchClassSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:8000/classSchedule');
        setClassSchedule(response.data);
      } catch (error) {
        console.log(`Error in fetching classSchedule ${error}`);
      }
    };
    fetchClassSchedule();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Today's Classes</Text>
          <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
            <Icon name="bell" size={24} color="grey" />
          </Pressable>
        </View>

        <View style={styles.classListContainer}>
          <FlatList
            data={classSchedule}
            renderItem={({ item }) => (
              <ClassCard
                subjectName={item.subjectName}
                venue={item.venue}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.subjectName}
            horizontal
          />
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AttendancePage')} style={styles.box}>
            <Text style={styles.title}>Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.title}>Records</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.title}>My Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.title}>Students</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0, // Adjust for Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  classListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
  },
  box: {
    marginVertical:20,
    height: 150,
    width: 150,
    backgroundColor: '#f4779f',
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#3308f3',
    textAlign: 'center',
  },
});
