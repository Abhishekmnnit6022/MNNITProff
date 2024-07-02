import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './login';


const SidePanelContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
    
      <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <View style={styles.logout}>
          <Text>
          Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout:{
    marginTop:600,
    backgroundColor:"#4643cd",
    padding:15,
    borderRadius:20,
    
    

  }


});
export default SidePanelContent;