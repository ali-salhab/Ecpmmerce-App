import SafeScreen from "@/components/safescreen";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const [direction, setdirection] = useState(false);
  const [loading, setloading] = useState(false);
  return (
    <SafeScreen>
      <View className="bg-white flex-row justify-center relative   border-red-700 p-3 border-8 mt-6 border-">
        <View className="w-12 h-12 rounded-full bg-green-500 text-center absolute top-2 left-2">
          <Text className="text-center absolute">A</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(direction);
            setTimeout(() => {
              console.log("time out");
              setloading(true);
              setdirection((pre) => !pre);
            }, 2000);
            setloading(false);
          }}
        >
          {loading ? (
            <View className={`${direction ? "flex-col" : "flex-row"} gap-4`}>
              (
              <View className="w-20 h-40 bg-black/40   shadow-slate-500 backdrop-blur-lg  rounded-lg  flex  ">
                <View className="rounded-full bg-white w-2 h-2 self-center mt-2"></View>
                <View className="rounded-full bg-white w-5 h-5  -mr-2 self-end mt-2"></View>
                <View className="rounded-full bg-white w-5 h-5  -mr-2 self-end mt-2"></View>
                <View className="rounded-full bg-white w-5 h-5  -mr-2 self-end mt-2"></View>

                <Text className="text-text-primary font-extrabold text-center">
                  ali
                </Text>
              </View>
              )<View className="w-20 h-40 bg-black"></View>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};
export default ProfileScreen;
