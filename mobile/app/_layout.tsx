import { Stack } from "expo-router";
import "../global.css";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { ActivityIndicator } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ClerkExpo from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

console.log("ClerkExpo exports:", ClerkExpo);
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": Montserrat_700Bold,
  });

  const queryClient = new QueryClient();
  const ClerkProvider = ClerkExpo.ClerkProvider;

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
