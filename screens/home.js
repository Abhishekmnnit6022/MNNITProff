import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import ClassCard from "../components/ClassCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [classSchedule, setClassSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassSchedule = async () => {
      try {
        const response = await axios.get(
          `https://emnnitproffserver.onrender.com/classSchedules/A1/3/Friday`
        );
        setClassSchedule(response.data);
      } catch (error) {
        console.error("Error fetching class schedule:", error);
        setError("Failed to fetch class schedule");
      }
    };

    fetchClassSchedule();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const renderOptionButton = (icon, text, onPress) => (
    <TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#FFFFFF" style={styles.optionIcon} />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MNNIT Allahabad</Text>
        <TouchableOpacity onPress={() => Alert.alert("Notifications")}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Today's Classes</Text>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={classSchedule}
            renderItem={({ item }) => (
              <ClassCard
                subjectName={item.subjectName}
                venue={item.venue}
                time={item.time}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.classListContainer}
          />
        )}

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.optionsContainer}>
          {renderOptionButton("create-outline", "Attendance", () => navigation.navigate("Select Class"))}
          {renderOptionButton("list-outline", "Records", () => Alert.alert("Records"))}
          {renderOptionButton("calendar-outline", "My Schedule", () => Alert.alert("My Schedule"))}
          {renderOptionButton("notifications-outline", "Make Notification", () => navigation.navigate("Notification Page"))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#003366',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 16,
    marginTop: 8,
  },
  classListContainer: {
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#003366',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  optionIcon: {
    marginBottom: 8,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});