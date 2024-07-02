import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './home'; 
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
