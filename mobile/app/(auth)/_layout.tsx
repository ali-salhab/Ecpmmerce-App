import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, userId } = useAuth();
  console.log(userId);
  // if (isSignedIn) {
  //   // If the user is signed in, redirect to the main app
  //   return <Redirect href={"/"} />;
  // }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
