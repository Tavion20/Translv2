import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import GradientText from "../utilities/GradientText";
import Navbar from "../utilities/Navbar";
import bg from "../assets/bg.png";

const Col = ({ children }) => <View style={styles.col}>{children}</View>;
const Row = ({ numCols, children }) => {
  return (
    <View
      style={[
        styles[`h${numCols}`],
        {
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {children}
    </View>
  );
};

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
            {/* <Pressable onPress={() => router.push("test/")}>
              <GradientText
                text="Transl"
                styles={{
                  fontSize: 42,
                  fontWeight: "bold",
                  paddingVertical: 20,
                }}
              />
            </Pressable> */}
            <GradientText
              text="Transl"
              styles={{
                fontSize: 42,
                fontWeight: "bold",
                paddingVertical: 20,
              }}
            />
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

          {/* The Input container */}
          <View style={[styles.inputContainer, { height: 480 }]}>
            <Col>
              <Pressable onPress={() => router.push("/text/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/text1.png")}
                    contentFit="cover"
                    style={[
                      styles.image,
                      {
                        opacity: 0.2,
                        borderColor: "white",
                      },
                    ]}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: "900",
                      marginTop: 50,
                      color: "#fff7ea",
                    }}
                  >
                    Text
                  </Text>
                </Row>
              </Pressable>
              <Pressable onPress={() => router.push("/image/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/img.png")}
                    contentFit="cover"
                    style={[styles.image, { opacity: 0.2 }]}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: "900",
                      marginTop: 45,
                      color: "#fff7ea",
                    }}
                  >
                    Image
                  </Text>
                </Row>
              </Pressable>
              <Pressable onPress={() => router.push("/file/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/file.png")}
                    contentFit="cover"
                    style={[styles.image, { opacity: 0.2 }]}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: "900",
                      marginTop: 50,
                      color: "#fff7ea",
                    }}
                  >
                    File
                  </Text>
                </Row>
              </Pressable>
            </Col>
            <View style={{ width: 15 }}></View>
            <Col>
              <Pressable onPress={() => router.push("/braille/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/braille1.png")}
                    contentFit="cover"
                    style={[styles.image, { opacity: 0.2 }]}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: "900",
                      marginTop: 50,
                      color: "#fff7ea",
                    }}
                  >
                    Braille
                  </Text>
                </Row>
              </Pressable>
              <Pressable onPress={() => router.push("/audio/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/audio1.png")}
                    contentFit="cover"
                    style={[styles.image, { opacity: 0.2 }]}
                  />
                </Row>
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 36,
                    fontWeight: "900",
                    marginTop: 45,
                    color: "#fff7ea",
                    marginLeft: 36,
                  }}
                >
                  Audio
                </Text>
              </Pressable>
              {/* this is the gesture */}
              {/* <Pressable onPress={() => router.push("/gesture/")}>
                <Row numCols={1}>
                  <Image
                    source={require("../assets/HomePage/gesture.png")}
                    contentFit="cover"
                   style={[styles.image, { opacity: 0.3 }]}
                  />
                </Row>
                <Text
                    style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: "900",
                      marginTop: 50,
                      color: "#fff7ea",
                    }}
                  >
                    TEXT
                  </Text>
              </Pressable> */}
            </Col>
          </View>
          {/* end */}

          <Navbar />
        </ScrollView>
      </ImageBackground>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#fff",
    borderRadius: 20,
    resizeMode: "cover",
  },
});
