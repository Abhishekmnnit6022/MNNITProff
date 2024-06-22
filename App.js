import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import AttendancePage from './screens/attendancePage'; 
import NotificationPage from './screens/notificationPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AttendancePage" component={AttendancePage} /> 
        <Stack.Screen name="NotificationPage" component={NotificationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
