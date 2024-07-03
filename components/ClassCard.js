import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    padding: 10,
    height: 130,
    margin: 13,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  venue: {
    fontSize: 17,
    color: '#666',
  },
  time: {
    fontSize: 15,
    color: '#aaa',
    fontWeight:'500'
  },
});

export default ClassCard;
