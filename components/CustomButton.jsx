import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[styles.button, containerStyle, isLoading && styles.disabledButton]} 
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;