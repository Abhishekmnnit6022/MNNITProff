import React, { useState ,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Switch, Button, Alert, Platform, ActivityIndicator } from 'react-native';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';
const os = Platform.OS;
let count = 0;


const StudentList = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAbsentMode, setIsAbsentMode] = useState(false);



  const [isloading, setIsLoading] = useState(true);


  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }},[data]); 
  const toggleMode = () => setIsAbsentMode(prevMode => !prevMode);
  const toggleCheckbox = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const submitAttendance = async () => {
    const attendanceData = data.map(student => ({
      regNo: student.regNo,
      name: student.name,
      date: new Date(),
      status: isAbsentMode 
        ? (checkedItems[student.regNo] ? 'Absent' : 'Present')
        : (checkedItems[student.name] ? 'Present' : 'Absent')
    }));

    try {
      const response = await axios.post('hhttp://192.168.29.178:8081/submitAttendance', attendanceData);
      Alert.alert('Success', 'Attendance submitted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit attendance');
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>

      <View style={[styles.cell, styles.regNoCell]}>
        <Text>{item.regNo}</Text>
      </View>
      <View style={[styles.cell, styles.nameCell]}>
        <Text>{item.name}</Text>
      </View>
      <View style={[styles.cell, styles.checkboxCell]}>
        <CheckBox
          checked={checkedItems[item.regNo] || false}
          onPress={() => toggleCheckbox(item.regNo)}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={isAbsentMode ? 'red' : '#329F5B'}
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
          trackColor={{ false: "#767577", true: "#DDDDDE" }}
          thumbColor={isAbsentMode ? "#FF000D" : "#329F5B"}
        />
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      {isloading ? <ActivityIndicator size="large" color="grey" /> : 
      <FlatList
        data={data}x
        renderItem={renderItem}
        keyExtractor={(item) => item.regNo}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={<ActivityIndicator size="large" color="grey" />}
        stickyHeaderIndices={[0]}
      />}
      <Button title="Submit Attendance" onPress={submitAttendance} style={styles.submitButton} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: os == "android" ? 50: 0
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
    backgroundColor: '#4643cd',
    margin: 10,
  },
});

export default StudentList;