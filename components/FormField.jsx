import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeHolder, handleChangeText, secureTextEntry, keyboardType, rightIcon, onIconPress }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#003366',
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    padding: 4,
  },
});

export default FormField;