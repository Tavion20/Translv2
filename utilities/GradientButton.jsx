import { Text, View, ActivityIndicator } from "react-native";
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
      {text === "loading" ? (
        <View
          style={[
            styles,
            { textAlign: "center", paddingHorizontal: 13, width: 130 },
          ]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <Text style={[styles, { textAlign: "center", paddingHorizontal: 13 }]}>
          {text}
        </Text>
      )}
    </LinearGradient>
  );
};

export default GradientButton;

// note: use skia for animation and effects https://shopify.github.io/react-native-skia/
