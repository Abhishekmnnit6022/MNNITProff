import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import AttendancePage from './screens/attendancePage';
import NotificationPage from './screens/notificationPage';
import ForgetScreen from './screens/Forget';
import SidePanelContent from './screens/sidepanel';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AttendancePage" component={AttendancePage} />
      <Stack.Screen name="NotificationPage" component={NotificationPage} />
      <Stack.Screen name="Forget Password" component={ForgetScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidePanelContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={MainStackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
