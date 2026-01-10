import useSocialAuth from "@/hooks/useSocialAuth";
import { Redirect } from "expo-router";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const AuthScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Logo */}
      <View className="mb-8 items-start">
        <Text
          className="mt-2"
          style={{
            fontFamily: "Montserrat-Bold", // Use a custom font loaded in your project
            fontSize: 54,
            color: "#1e293b",
            letterSpacing: 4,
          }}
        >
          <Text className="font-extrabold text-4xl bg-primary rounded-lg border-separate text-white">
            Eva
          </Text>
          ShoW
        </Text>
      </View>
      <Image
        source={require("../../assets/images/auth-image.png")}
        resizeMode="cover"
        width={300}
        height={300}
        className="size-96"
      />
      <TouchableOpacity onPress={() => <Redirect href={"/(tabs)"} />}>
        <Text>press</Text>
      </TouchableOpacity>
      <View className="gap-2 mt-12">
        {/* Google button */}
        <TouchableOpacity
          onPress={() => {
            handleSocialAuth("oauth_google");
          }}
          disabled={loadingStrategy !== null}
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.25,
            elevation: 2, //this for android only
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            height: 50,
          }}
          className="flex-row py-2 items-center justify-center border border-gray-300 rounded-full px-6"
        >
          {loadingStrategy === "oauth_google" ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                className="w-7 h-7 mr-2"
                resizeMode="contain"
              />
              <Text>Continue with google </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Apple button */}
        <TouchableOpacity
          onPress={() => {
            handleSocialAuth("oauth_apple");
          }}
          disabled={loadingStrategy !== null}
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.25,
            elevation: 2, //this for android only
            shadowRadius: 3.84,
            backgroundColor: "#fff",
            height: 50,
          }}
          className="flex-row py-2 items-center justify-center border border-gray-300 rounded-full px-6"
        >
          {loadingStrategy === "oauth_apple" ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/apple.png")}
                className="w-6 h-6 mr-2"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">
                Continue with apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray-500 leading-4 mt-6 px-2">
        By Signup you agree to our
        <Text className="text-blue-500">
          Terms & Conditions and Privacy Policy
        </Text>
      </Text>
    </View>
  );
};

export default AuthScreen;
