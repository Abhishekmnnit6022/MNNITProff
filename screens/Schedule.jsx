import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AppContext } from "./appContext";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const ProfessorSchedule = () => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width, height } = useWindowDimensions();
  const { userEmail } = useContext(AppContext);

  const isLandscape = width > height;

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      if (!userEmail) {
        throw new Error("userEmail not found");
      }
      console.log("From schedule page", userEmail);

      const response = await axios.get(
        `http://172.29.49.198:8008/api/professorSchedule/${userEmail}`
      );
      const scheduleData = response.data.reduce((acc, item) => {
        if (!acc[item.day]) {
          acc[item.day] = [];
        }
        acc[item.day].push(item);
        return acc;
      }, {});

      setSchedule(scheduleData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError("Failed to fetch schedule. Please try again.");
      setLoading(false);
    }
  };

  const getClassForTimeSlot = (day, time) => {
    const classItem = schedule[day]?.find((item) => item.time === time);
    if (classItem) {
      return `${classItem.subjectName}\n${classItem.group} - ${classItem.semester}\n${classItem.venue}`;
    }
    return "";
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderPortraitMode = () => (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}>
        {days.map((day) => (
          <View key={day} style={styles.daySection}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
            {timeSlots.map((time) => (
              <View key={`${day}-${time}`} style={styles.timeSlot}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
                <View style={styles.classCell}>
                  <Text style={styles.classText}>
                    {getClassForTimeSlot(day, time)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  const renderLandscapeMode = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} horizontal={true}>
        <View>
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>Time</Text>
            </View>
            {days.map((day) => (
              <View key={day} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
            ))}
          </View>
          {timeSlots.map((time) => (
            <View key={time} style={styles.row}>
              <View style={[styles.cell, styles.timeCell]}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
              {days.map((day) => (
                <View key={`${day}-${time}`} style={styles.cell}>
                  <Text style={styles.classText}>
                    {getClassForTimeSlot(day, time)}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return isLandscape ? renderLandscapeMode() : renderPortraitMode();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    backgroundColor: "#003366",
    padding: 10,
  },
  dayHeaderText: {
    color: "#fff",
    fontSize: wp("4.8%"),
    fontWeight: "bold",
  },
  timeSlot: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  timeCell: {
    width: "30%",
    padding: 10,
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
  },
  classCell: {
    width: "70%",
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 180,
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
  },
  headerCell: {
    backgroundColor: "#003366",
    height: 50,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: wp("4.8%"),
  },
  timeText: {
    fontWeight: "bold",
    color: "#003366",
  },
  classText: {
    color: "#333",
    textAlign: "center",
    fontSize: wp("3.5%"),
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfessorSchedule;