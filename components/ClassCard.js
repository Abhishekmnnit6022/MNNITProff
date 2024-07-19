import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClassCard = ({ subjectCode, subjectName, venue, time, group, semester }) => {
  const isCancelled = time.toLowerCase() === 'cancelled';

  return (
    <View style={[styles.card, isCancelled && styles.cancelledCard]}>
      <View style={styles.header}>
        <Text style={styles.subjectCode}>{subjectCode}</Text>
        <Text style={styles.subjectName}>{subjectName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <InfoRow icon="location" label="Venue" value={venue} />
        <InfoRow 
          icon="time" 
          label="Time"
          value={time} 
          valueStyle={isCancelled ? styles.cancelledTime : styles.timeText}
        />
        <InfoRow icon="people" label="Group" value={group} />
        <InfoRow icon="school" label="Semester" value={semester} />
      </View>
      {isCancelled && (
        <View style={styles.cancelledBanner}>
          <Ionicons name="alert-circle" size={18} color="#FFFFFF" />
          <Text style={styles.cancelledText}>Class Cancelled</Text>
        </View>
      )}
    </View>
  );
};

const InfoRow = ({ icon, label, value, valueStyle }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabelContainer}>
      <Ionicons name={icon} size={18} color="#003366" style={styles.icon} />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelledCard: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFD0D0',
  },
  header: {
    padding: 16,
    backgroundColor: '#003366',
  },
  subjectCode: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#003366',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  timeText: {
    color: '#006600',
    fontWeight: '700',
  },
  cancelledTime: {
    color: '#CC0000',
    fontWeight: '700',
  },
  cancelledBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC0000',
    padding: 8,
  },
  cancelledText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ClassCard;