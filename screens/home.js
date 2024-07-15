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
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import ClassCard from "../components/ClassCard";
import { Ionicons } from '@expo/vector-icons';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu" size={24} color="#003366" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Today's Classes</Text>
          <TouchableOpacity onPress={() => Alert.alert("Working on this")}>
            <Ionicons name="notifications" size={24} color="#003366" />
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
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
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
        )}

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("Select Class")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Icon name="pencil" size={16} color="#ffffff" />
              </View>
              <Text style={styles.optionText}>Attendance</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => alert("Record Clicked")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Icon name="list-ol" size={16} color="#ffffff" />
              </View>
              <Text style={styles.optionText}>Records</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => alert("Working on it sir!")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Icon name="paperclip" size={16} color="#ffffff" />
              </View>
              <Text style={styles.optionText}>My Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("Notification Page")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Icon name="bell-o" size={16} color="#ffffff" />
              </View>
              <Text style={styles.optionText}>Make Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  classListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
    padding: 12,
  },
  optionButton: {
    backgroundColor: "#4643cd",
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#111111",
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 3.14,
    shadowOpacity: 0.5,
    elevation: 3,
    zIndex: 4,
    height: 120, 
    justifyContent: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginLeft: 20, 
  },
  optionIconContainer: {
    backgroundColor: "#5756cd",
    borderRadius: 20,
    height: 50, 
    width: 50, 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  optionText: {
    color: "#ffffff",
    fontSize: 22, 
    fontWeight: "500",
  },
});
