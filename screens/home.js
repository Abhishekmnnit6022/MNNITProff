import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}><Text style={styles.title}>Attendance</Text></TouchableOpacity>
      <TouchableOpacity style={styles.box}><Text style={styles.title}>Attendance</Text></TouchableOpacity>
      <TouchableOpacity style={styles.box}><Text style={styles.title}>Attendance</Text></TouchableOpacity>
      <TouchableOpacity style={styles.box}><Text style={styles.title}>Attendance</Text></TouchableOpacity>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "#f4779f",
    borderRadius: 20,
    margin: 10,
  },

  title:{
    textAlign:'center',
    marginVertical:'auto',
    fontSize:20,
    color:' #3308f3 '
    

  }
});
