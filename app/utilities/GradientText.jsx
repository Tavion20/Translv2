import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const GradientText = ({ text, styles }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <LinearGradient
        colors={["#FFBFB2", "#FF876E"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.33 }}
        style={{ flex: 1 }}
      >
        <Text style={[styles, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

// note: use skia for animation and effects https://shopify.github.io/react-native-skia/
