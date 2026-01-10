import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  console.log("---------------------> auth layout ");
  const { isSignedIn, userId } = useAuth();
  console.log(userId, "<--------------------- user id r");
  if (isSignedIn) {
    // If the user is signed in, redirect to the main app
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
