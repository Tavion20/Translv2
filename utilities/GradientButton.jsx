import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ text, styles, width, height, borderRadius }) => {
  return (
    <LinearGradient
      colors={["#DF8DDC", "#E235DC"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0.33 }}
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          elevation: 5,
          color: "white",
        },
        { width, height, borderRadius },
      ]}
    >
      <Text style={[styles, { textAlign: "center", paddingHorizontal: 13 }]}>
        {text}
      </Text>
    </LinearGradient>
  );
};

export default GradientButton;

// note: use skia for animation and effects https://shopify.github.io/react-native-skia/
