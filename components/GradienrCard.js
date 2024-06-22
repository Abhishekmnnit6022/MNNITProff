import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const GradientCard = ({ title, icon, stylesContainer }) => {
  return (
    <View style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    
    }}>
    <LinearGradient
      colors={["#fb8c00", "#ffa726"]}
      className={`rounded-3xl p-3 m-2 justify-center items-start ${stylesContainer}"`}
    >
      <View style={{ flexDirection: "row" }}>
        <View className="pl-2">
          <Icon name={icon} size={24} color="white" />
        </View>
        <Text className="text-xl font-pregular pl-2 pr-2">{title}</Text>
      </View>
    </LinearGradient>
    </View>
  );
};

export default GradientCard;
