import { Redirect, Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Network from "expo-network";
import { useState, useEffect } from "react";
const TabsLayout = () => {
  console.log("user now in layout tabs");
  const { isSignedIn, isLoaded } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      console.log(state);
      setIsConnected(state.isConnected!);
    });
  }, []);
  if (isConnected) {
    if (!isLoaded) {
      return null;
    }
    if (!isSignedIn) {
      return <Redirect href={"/(auth)"} />;
    }
  }

  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1db954",
        tabBarInactiveTintColor: "#b3b3b3",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,

          height: 32 + insets.bottom,
          paddingTop: 7,
          marginHorizontal: insets.bottom + 44,
          marginBottom: insets.bottom,
          borderRadius: 24,
          overflow: "hidden",
        },
        tabBarBackground: function TabBarBackground() {
          return (
            <BlurView
              intensity={100}
              tint="dark"
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        //  this is the name of file contin the screen code
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
