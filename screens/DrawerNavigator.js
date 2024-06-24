import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './home'; 
import AttendancePage from './attendancePage';
import NotificationPage from './notificationPage'; 
import ForgetScreen from './Forget'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="AttendancePage" component={AttendancePage} />
      <Drawer.Screen name="NotificationPage" component={NotificationPage} />
      <Drawer.Screen name="Forget Password" component={ForgetScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
