import { useSSO } from "@clerk/clerk-expo";
import { use, useState } from "react";
import { Alert } from "react-native";

function useSocialAuth() {
  const [loadingStrategy, setIsLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        `${provider} Authentication`,
        `${provider} authentication failed`
      );

      console.log("error", error);
    } finally {
      setIsLoadingStrategy(null);
    }
  };

  return { loadingStrategy, handleSocialAuth };
}

export default useSocialAuth;
