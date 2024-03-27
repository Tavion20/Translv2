import {
  Pressable,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
} from "react-native";
import { Link, router } from "expo-router";
import bg from "../assets/bg.png";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
        <Text style={styles.title}>Transl</Text>
        <Pressable onPress={() => router.push("test/")}>
          <Text
            style={{ display: "flex", width: "fit", backgroundColor: "pink" }}
          >
            Go to Test pagen
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "3vw",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginRight: "36px",
    backgroundColor: "red",
  },
});
