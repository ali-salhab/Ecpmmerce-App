import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};
export default SafeScreen;
