import SafeScreen from "@/components/safescreen";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
const Cat = [
  {
    name: "ele",
    desc: "de dsf sa g gh ",
  },
  {
    name: "tele",
    desc: "de dsf sa g gh ",
  },
  {
    name: "sele",
    desc: "de dsf sa g gh ",
  },
  {
    name: "bele",
    desc: "de dsf sa g gh ",
  },
  {
    name: "mele",
    desc: "de dsf sa g gh ",
  },
];
const CartScreen = () => {
  const [cat, setCat] = useState("");
  return (
    <SafeScreen>
      <View className=" bg-background-light">
        <Text className="text-white text-3xl text-center">Cart Page</Text>
        <TextInput
          className="bg-background-lighter m-3 pl-3"
          placeholderTextColor={"white"}
          placeholder="Enter your name"
        ></TextInput>
        <TextInput
          className="bg-background-lighter m-3 pl-3"
          placeholderTextColor={"white"}
          placeholder="Enter your name"
        ></TextInput>
        <View className="flex justify-center items-center mt-4">
          <TouchableOpacity
            className="bg-primary w-2/5 rounded-lg px-3 py-3"
            onPress={() => {
              Alert.alert(
                "Error",
                "Cant check out ",
                [
                  {
                    text: "ok",
                    onPress: () => {
                      console.log("object");
                    },
                  },
                  {
                    text: "cancel",
                    onPress: () => {
                      console.log("2");
                    },
                  },
                ],
                {
                  cancelable: true,

                  onDismiss: () => {
                    console.log("dissmis");
                  },
                }
              );
            }}
          >
            <Text className="text-center font-extrabold text-white">
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" mt-5  pl-7">
          <Text className="text-white font-extrabold">Products</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            // backgroundColor: "red",
            height: 100,
          }}
          horizontal
          onScroll={(e) => {
            console.log(e);
          }}
        >
          {Cat.map((e) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCat(e.name);
                  console.log(cat);
                }}
              >
                <View className="bg-red-400 h-24 m-2 rounded-md">
                  <Text className="text-center p-2">{e.name}</Text>
                  <Text className="text-start">{e.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View className="w-12 h-12 bg-red-600">
        <Text className="text-white font-extrabold text-3xl">
          Selected Category
        </Text>
        <Text className="text-white text-center bg-inherit">
          {cat === "" ? "No Cat selected" : cat}
        </Text>
      </View>
    </SafeScreen>
  );
};

export default CartScreen;
