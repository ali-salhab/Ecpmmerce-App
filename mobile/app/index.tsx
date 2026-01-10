import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as Network from "expo-network";
import { ActivityIndicator } from "react-native";

export default function Index() {
  console.log("-------------> app entry point ");
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      console.log(state);
      setIsConnected(state.isConnected!);
    });
  }, []);
  console.log(isConnected, "is connecting");
  // splash while checking
  if (isConnected === null) {
    console.log("activity indeicator");
    return (
      <ActivityIndicator
        className="flex items-center justify-normal bg-red-400"
        size={"large"}
      />
    );
  }

  // 🚫 Offline → go directly to tabs/home
  if (!isConnected) {
    console.log("redirect user to home tab page");
    return <Redirect href="/(tabs)" />;
  }

  // 🌐 Online → go to auth flow
  return <Redirect href="/(auth)" />;
}
