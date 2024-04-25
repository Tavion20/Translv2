import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaskedImage from "../../utilities/MaskedImage";

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* The title */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => router.push("test/")}>
            <MaskedImage
              text="Transl"
              styles={{
                fontSize: 42,
                fontWeight: "bold",
                paddingVertical: 20,
              }}
            />
          </Pressable>
        </View>
        {/* ends */}
      </ScrollView>

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    padding: 10,
  },
  content: {
    padding: 30,
  },
  mid_section_subtitle: {
    color: "#FFEBCA",
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  h1: {
    height: 140,
    marginBottom: 20,
  },
  h2: {
    height: 300,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
    borderRadius: 20,
    resizeMode: "cover",
  },
});
