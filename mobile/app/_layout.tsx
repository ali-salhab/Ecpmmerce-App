import { Stack } from "expo-router";
import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ClerkExpo from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

console.log("ClerkExpo exports:", ClerkExpo);
export default function RootLayout() {
  const queryClient = new QueryClient();
  const ClerkProvider = ClerkExpo.ClerkProvider;
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
