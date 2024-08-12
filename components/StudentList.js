import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Checkbox component
const CustomCheckbox = ({ checked, onPress, isAbsentMode }) => (
  <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
    <View style={[
      styles.checkbox,
      checked && (isAbsentMode ? styles.checkedAbsent : styles.checkedPresent)
    ]}>
      {checked && (
        <Text style={styles.checkboxText}>
          {isAbsentMode ? 'A' : 'P'}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const StudentList = ({ data, group, semester, subject }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAbsentMode, setIsAbsentMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(data.length === 0);
  }, [data]);

  const toggleMode = useCallback(() => setIsAbsentMode((prevMode) => !prevMode), []);
  
  const toggleCheckbox = useCallback((id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const confirmSubmit = useCallback(() => {
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit the attendance?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Submit", onPress: submitAttendance }
      ],
      { cancelable: false }
    );
  }, [submitAttendance]);

 
  const submitAttendance = useCallback(async () => {
    setIsSubmitting(true);
    const attendanceData = data.map((student) => ({
      regNo: student.regNo,
      name: student.name,
      date: new Date(),
      status: isAbsentMode
        ? (checkedItems[student.regNo] ? "Absent" : "Present")
        : (checkedItems[student.regNo] ? "Present" : "Absent"),
      group,
      semester,
      subject,
    }));
  
    try {
      await axios.post(`http://localhost:8000/submitAttendance`, attendanceData);
      Alert.alert("Success", "Attendance submitted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to submit attendance");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [data, isAbsentMode, checkedItems, group, semester, subject]);



  const renderItem = useCallback(({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <View style={[styles.cell, styles.regNoCell]}>
        <Text style={styles.cellText}>{item.regNo}</Text>
      </View>
      <View style={[styles.cell, styles.nameCell]}>
        <Text style={styles.cellText}>{item.name}</Text>
      </View>
      <View style={[styles.cell, styles.checkboxCell]}>
        <CustomCheckbox
          checked={checkedItems[item.regNo] || false}
          onPress={() => toggleCheckbox(item.regNo)}
          isAbsentMode={isAbsentMode}
        />
      </View>
    </View>
  ), [checkedItems, isAbsentMode, toggleCheckbox]);

  const ListHeader = useCallback(() => (
    <View style={styles.headerContainer}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.regNoCell]}>
          <Text style={styles.headerText}>Reg No</Text>
        </View>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={[styles.cell, styles.checkboxCell]}>
          <Text style={styles.headerText}>
            {isAbsentMode ? "Absent" : "Present"}
          </Text>
        </View>
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {isAbsentMode ? "Absent Mode" : "Present Mode"}
        </Text>
        <Switch
          value={isAbsentMode}
          onValueChange={toggleMode}
          trackColor={{ false: "#767577", true: "#DDDDDE" }}
          thumbColor={isAbsentMode ? "#FF000D" : "#329F5B"}
        />
      </View>
    </View>
  ), [isAbsentMode, toggleMode]);

  const keyExtractor = useCallback((item) => item.regNo, []);

  const getItemLayout = useCallback((data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  }), []);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4643cd" />
      ) : (
        <>
          <FlatList
            data={memoizedData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={<Text style={styles.emptyText}>No students found</Text>}
            stickyHeaderIndices={[0]}
            getItemLayout={getItemLayout}
          />
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={confirmSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Attendance</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerContainer: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#f9f9f9",
  },
  cell: {
    flex: 1,
    padding: wp('2.5%'),
    justifyContent: "center",
  },
  regNoCell: {
    flex: 2,
  },
  nameCell: {
    flex: 3,
  },
  checkboxCell: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: wp('3.5%'),
  },
  cellText: {
    fontSize: wp('3.6%'),
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: wp('2.5%'),
  },
  toggleLabel: {
    marginRight: wp('2.5%'),
    fontWeight: "bold",
    fontSize: wp('3.5%'),
  },
  submitButton: {
    backgroundColor: "#003366",
    margin: wp('5%'),
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('6%'),
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hp('5%'),
    fontSize: wp('4%'),
    color: '#888888',
  },
  // Custom Checkbox styles
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: wp('8%'),
    height: wp('8%'),
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedPresent: {
    backgroundColor: '#329F5B',
    borderColor: '#329F5B',
  },
  checkedAbsent: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default React.memo(StudentList);