import {
  Pressable,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Home page</Text>
      <Pressable onPress={() => router.push("test/")}>
        <Text>Go to Test page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
