import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import 'react-native-get-random-values';

const ClassCard = ({ subjectName, venue, time }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.subjectName}>{subjectName}</Text>
      <Text style={styles.venue}>{venue}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#329F5B',
    borderRadius: 30,
    padding: 10,
    height: 130,
    width: 150,
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subjectName: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  venue: {
    color: '#1f1f1f',
    fontSize: 18,
    fontWeight: '600',
  },
  time: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ClassCard;
