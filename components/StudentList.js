import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Switch, Button, Alert } from 'react-native';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';

const StudentList = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAbsentMode, setIsAbsentMode] = useState(false);

  const toggleMode = () => setIsAbsentMode(prevMode => !prevMode);

  const toggleCheckbox = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const submitAttendance = async () => {
    const attendanceData = data.map(student => ({
      studentRegNo: student.studentRegNo,
      studentName: student.studentName,
      date: new Date(),
      status: isAbsentMode 
        ? (checkedItems[student.studentRegNo] ? 'Absent' : 'Present')
        : (checkedItems[student.studentRegNo] ? 'Present' : 'Absent')
    }));

    try {
      const response = await axios.post('http://localhost:8000/submitAttendance', attendanceData);
      if (response.status === 200) {
        Alert.alert('Success', 'Attendance submitted successfully');
      } else {
        Alert.alert('Error', 'Failed to submit attendance');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit attendance');
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <View style={[styles.cell, styles.regNoCell]}>
        <Text>{item.studentRegNo}</Text>
      </View>
      <View style={[styles.cell, styles.nameCell]}>
        <Text>{item.studentName}</Text>
      </View>
      <View style={[styles.cell, styles.checkboxCell]}>
        <CheckBox
          checked={checkedItems[item.studentRegNo] || false}
          onPress={() => toggleCheckbox(item.studentRegNo)}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={isAbsentMode ? 'red' : 'green'}
          containerStyle={styles.checkbox}
        />
      </View>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.regNoCell]}>
          <Text style={styles.headerText}>Reg No</Text>
        </View>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={[styles.cell, styles.checkboxCell]}>
          <Text style={styles.headerText}>{isAbsentMode ? 'Absent' : 'Present'}</Text>
        </View>
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>{isAbsentMode ? 'Absent Mode' : 'Present Mode'}</Text>
        <Switch
          value={isAbsentMode}
          onValueChange={toggleMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isAbsentMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.studentRegNo}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
      />
      <Button title="Submit Attendance" onPress={submitAttendance} style={styles.submitButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  regNoCell: {
    flex: 2,
  },
  nameCell: {
    flex: 3,
  },
  checkboxCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  toggleLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  submitButton: {
    margin: 10,
  },
});

export default StudentList;
