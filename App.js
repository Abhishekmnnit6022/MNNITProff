import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import AttendancePage from "./screens/attendancePage";
import NotificationPage from "./screens/notificationPage";
import ForgetScreen from "./screens/Forget";
import SidePanelContent from "./screens/sidepanel";
import Profile from "./screens/Profile";
import { AppProvider } from "./screens/appContext"; 

SplashScreen.preventAutoHideAsync();
import { useEffect } from "react";
import { SplashScreen } from "expo-router";

import { useFonts } from "expo-font";
import Classselect from "./screens/classselect";
import Schedule from "./screens/Schedule";
import ResetPasswordScreen from "./screens/ResetPasswordsceen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <AppProvider>

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false,
          headerShadowVisible: true,
         }}
      />
      <Stack.Screen
        name="Attendance Page"
        component={AttendancePage}
        options={{
          headerShadowVisible: true,
          headerTransparent: false,
          headerTintColor: "#ffffff",

          headerStyle: {
            backgroundColor: "#003366",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: "Attendance",
        }}
      />
      <Stack.Screen
        name="Notification Page"
        component={NotificationPage}
        options={{ headerShadowVisible: true, headerBlurEffect: true
          ,headerTitle: "Send Notification",headerTransparent: false,
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#003366",
            elevation: 0,
            shadowOpacity: 0,
          },
         }}
      />
      <Stack.Screen name ="Profile" component={Profile} options={{headerTitle:"Profile" ,headerTransparent:false, headerShown:true, headerStyle
      :{backgroundColor:"#003366",elevation:0,shadowOpacity:0},headerTintColor:"#ffffff"  
      }} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Forget Password" component={ForgetScreen}  options={{headerTitle:"Forget Password" ,headerTransparent:true, headerStyle:
      {backgroundColor:"#003366",elevation:0,shadowOpacity:0},headerTintColor:"#ffffff" 
      }}/>
      <Stack.Screen name ="Reset Password"  component={ResetPasswordScreen} options={{headerTitle:"Reset Password" ,headerTransparent:false,
      headerTintColor: "#ffffff",
      headerStyle: {
        backgroundColor: "#003366",
        elevation: 0,
        shadowOpacity: 0,
      },headerShown:true
      }}/>
      <Stack.Screen
        name="Select Class"
        component={Classselect}
        options={{
          headerShown:true,
          headerShadowVisible: true,
          // headerTransparent: true,
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#003366",
            elevation: 0,
            shadowOpacity: 0,
          },
          // headerBackground: "#003366",
          headerShadowVisible: false,
          headerTitle: "Select Class",
        }}
      />
    </Stack.Navigator>
    </AppProvider>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidePanelContent {...props} />}
    >
      <Drawer.Screen
        name="HomeStack"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
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
