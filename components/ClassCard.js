import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClassCard = ({ subjectName, venue, time }) => {
  const isCancelled = time.toLowerCase() === 'cancelled';

  return (
    <View style={[styles.card, isCancelled && styles.cancelledCard]}>
      <Text style={styles.subjectName}>{subjectName}</Text>
      <Text style={styles.venue}>{venue}</Text>
      <Text style={[styles.time, isCancelled && styles.cancelledTime]}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelledCard: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FFCDD2',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  venue: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  cancelledTime: {
    color: '#F44336',
  },
});

export default ClassCard;
