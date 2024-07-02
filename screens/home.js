import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import ClassCard from "../components/ClassCard";

export default function HomeScreen(){
  const navigation = useNavigation();
  const [classSchedule, setClassSchedule] = useState([]);

  useEffect(() => {
    const fetchClassSchedule = async () => {
      try {
        const response = await axios.get("http://192.168.29.178:8000/classSchedule");
        console.log(response.data); // Log the fetched data
        setClassSchedule(response.data);
      } catch (error) {
        console.log(`Error in fetching classSchedule ${error}`);
      }
    };
    fetchClassSchedule();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Today's Classes</Text>
          <Pressable onPress={() => Alert.alert("Working on this")}>
            <Icon name="bell" size={24} color="grey" />
          </Pressable>
        </View>

        <View style={styles.classListContainer}>
          <FlatList
            data={classSchedule}
            renderItem={({ item }) => (
              <ClassCard
                subjectName={item.subjectName}
                venue={item.venue}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.subjectName.toString()}
            horizontal
          />
        </View>

        <View className="flex-col p-3">
          <TouchableOpacity
            style={{
              shadowColor: "#111111",
              shadowOffset: { height: "5px", width: "0px" },
              shadowRadius: 3.14,
              shadowOpacity: 0.5,
              elevation: 3,
              zIndex: 4,
            }}
            onPress={() => navigation.navigate("Select Class for Attendance")}
            className="w-full h-[15vh] mb-3 bg-[#4643cd] rounded-3xl justify-center items-center"
          >
            <View className="flex-row items-center">
              <View className="rounded-full h-10 w-10 items-center justify-center bg-[#5756cd] mr-3">
                <Icon name="pencil" size={16} color="#ffffff" />
              </View>
              <Text className="text-white font-plight text-xl">Attendance</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#111111",
              shadowOffset: { height: "5px", width: "0px" },
              shadowRadius: 3.14,
              shadowOpacity: 0.5,
              elevation: 3,
              zIndex: 4,
            }}
            onPress={() => alert("Record Clicked")}
            className="w-full h-[15vh]  bg-[#4643cd] mb-3 rounded-3xl justify-center items-center"
          >
            <View className="flex-row items-center">
              <View className="rounded-full h-10 w-10 items-center justify-center bg-[#5756cd] mr-3">
                <Icon name="list-ol" size={16} color="#ffffff" />
              </View>
              <Text className="text-white font-plight text-xl">Records</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#111111",
              shadowOffset: { height: "5px", width: "0px" },
              shadowRadius: 3.14,
              shadowOpacity: 0.5,
              elevation: 3,
              zIndex: 4,
            }}
            onPress={() => alert("Working on it sir!")}
            className="w-full h-[15vh] mb-3 bg-[#4643cd] rounded-3xl justify-center items-center"
          >
            <View className="flex-row items-center">
              <View className="rounded-full h-10 w-10 items-center justify-center bg-[#5756cd] mr-3">
                <Icon name="paperclip" size={16} color="#ffffff" />
              </View>
              <Text className="text-white font-plight text-xl">My Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#111111",
              shadowOffset: { height: "5px", width: "0px" },
              shadowRadius: 3.14,
              shadowOpacity: 0.5,
              elevation: 3,
              zIndex: 4,
            }}
            onPress={() => navigation.navigate("NotificationPage")}
            className="w-full h-[15vh] mb-3  bg-[#4643cd] rounded-3xl justify-center items-center"
          >
            <View className="flex-row items-center">
              <View className="rounded-full h-10 w-10 items-center justify-center bg-[#5756cd] mr-3">
                <Icon name="bell-o" size={16} color="#ffffff" />
              </View>
              <Text className="text-white font-plight text-xl">Make Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  classListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
});
