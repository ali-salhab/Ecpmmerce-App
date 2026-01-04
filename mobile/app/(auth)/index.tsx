import useSocialAuth from "@/hooks/useSocialAuth";
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
      <View className="mb-8 items-center">
        <Text
          className="mt-4"
          style={{
            fontFamily: "Montserrat-Bold", // Use a custom font loaded in your project
            fontSize: 32,
            color: "#1e293b",
            letterSpacing: 2,
          }}
        >
          eva Shop
        </Text>
      </View>
      <Image
        source={require("../../assets/images/auth-image.png")}
        resizeMode="contain"
        className="size-96"
      />
      <View className="gap-2 mt-4">
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
                className="w-7 h-7 mr-2"
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
