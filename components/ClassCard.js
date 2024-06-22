import { View, Text } from 'react-native'
import React from 'react'

const ClassCard = ({subjectName, venue,time}) => {
  return (
    <View
      className="bg-[#329F5B] rounded-3xl p-3 h-[130px] w-[150px] m-3 justify-between items-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >



        <Text className="text-white text-[18px] text-center font-pbold">{subjectName}</Text>
        <Text className="text-[#1f1f1f] text-[18px] font-psemibold">{venue}</Text>
        <Text className="text-white text-[17px] font-psemibold">{time}</Text>
        





    </View>
  );
}
export default ClassCard