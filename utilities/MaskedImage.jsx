import { Text, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";

const MaskedImage = ({ text, styles }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <Image
        source={require("../assets/HomePage/vid.png")}
        contentFit="cover"
        style={[styles.image, { opacity: 1 }]}
      />
    </MaskedView>
  );
};

export default MaskedImage;

// note: use skia for animation and effects https://shopify.github.io/react-native-skia/
