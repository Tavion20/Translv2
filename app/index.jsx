import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import GradientText from "./utilities/GradientText";
import bg from "../assets/bg.png";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
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
              <GradientText
                text="Transl"
                styles={{ fontSize: 42, fontWeight: "bold", padding: 20 }}
              />
            </Pressable>
          </View>
          {/* ends */}

          {/* The mid section text */}
          <View
            style={{
              marginTop: 15,
              marginBottom: 60,
              display: "flex",
              gap: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.mid_section_subtitle}>What can I</Text>
            <Text style={[styles.mid_section_subtitle, { fontWeight: "bold" }]}>
              Help you with?
            </Text>
          </View>
          {/* ends */}

          <View
            style={{ width: "full", height: 500, backgroundColor: "pink" }}
          ></View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
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
});
