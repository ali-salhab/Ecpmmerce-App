import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        //  this is the name of file contin the screen code
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => <Ionicons />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
