import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import GradientText from "../../utilities/GradientText";
import GradientButton from "../../utilities/GradientButton";
import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import { FontAwesome5 } from "@expo/vector-icons";
import Navbar from "../../utilities/Navbar";
import bg from "../../assets/bg.png";

export default function App() {
  const [output, setOutput] = useState(null);
  const [image, setImage] = useState(null);
  // const [copiedText, setCopiedText] = useState("");
  const [loading, setLoading] = useState(false);

  //Function to use Clipboard
  // const copyToClipboard = async () => {
  //   await Clipboard.setStringAsync(output);
  // };

  // if you wanna put the copied text someplace
  /*
  
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  */

  // Function to handle file picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result.assets[0]);
    setOutput(null);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const translateBraille = async () => {
    console.log("Braille Translation started..");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", {
        uri: image.uri,
        name: "image.jpg",
        type: image.mimeType,
        source: "english",
        target: "hindi",
      });
      console.log(formData._parts);
      const response = await fetch(
        "https://transl-backend-0tra.onrender.com/braille",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const translatedFileBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(translatedFileBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setLoading(false);
        setOutput(base64data);
      };

      // setOutput(translatedFileBlob);

      // const imageBuffer = Buffer.from(translatedFileBlob.result, "binary");
      // const imageBase64 = imageBuffer.toString("base64");
      // setOutput("data:image/jpeg;base64," + Base64.encode(imageBuffer));
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Translation failed.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={bg} style={styles.image}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {/* Container that contains Title, Image area */}
            <View>
              {/* The title */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Pressable onPress={() => router.push("/")}>
                  <GradientText
                    text="Braille"
                    styles={{
                      fontSize: 42,
                      fontWeight: "bold",
                      padding: 20,
                    }}
                  />
                </Pressable>
              </View>
              {/* ends */}

              {/* The Image upload container */}
              <TouchableHighlight
                onPress={pickImage}
                style={{ display: "flex", alignItems: "center", marginTop: 20 }}
              >
                <View
                  style={{
                    backgroundColor: "#000000BF",
                    margin: 12,
                    width: "90%",
                    borderColor: "white",
                    height: 455,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  {!image && (
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <FontAwesome5 name="braille" size={65} color="white" />
                      <Text style={{ color: "white", marginTop: 10 }}>
                        Pick Braille Image
                      </Text>
                    </View>
                  )}
                  {image && output == null && (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 320, height: 240, borderRadius: 10 }}
                    />
                  )}
                  {output != null && (
                    <Image
                      source={{ uri: output }}
                      style={{ width: 320, height: 240, borderRadius: 10 }}
                    />
                  )}
                </View>
              </TouchableHighlight>

              {/* end */}
            </View>

            {/* Container that contains Button & Navbar */}
            <View>
              {/* Translate Button */}
              {!loading ? (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 64,
                  }}
                >
                  <TouchableOpacity
                    onPress={translateBraille}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 130,
                    }}
                  >
                    <GradientButton
                      text="Translate"
                      styles={{
                        fontSize: 23,
                        fontWeight: "bold",
                        color: "white",
                      }}
                      height={60}
                      borderRadius={10}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 64,
                  }}
                >
                  <Pressable
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 130,
                    }}
                  >
                    <GradientButton
                      text="loading"
                      height={60}
                      borderRadius={10}
                    />
                  </Pressable>
                </View>
              )}
              {/* end */}

              {/* {output != null && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image source={{ uri: output }} />
            </View>
          )} */}

              {/* end */}
              {/* Hidden Output Container */}
              {/* {output && (
            <ScrollView
              style={{
                backgroundColor: "#00000080",
                borderRadius: 10,
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                padding: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <GradientText
                  text="Output"
                  styles={{
                    fontSize: 23,
                    fontWeight: "bold",
                  }}
                />
                <TouchableOpacity onPress={copyToClipboard}>
                  <AntDesign
                    name="copy1"
                    size={22}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "white", marginTop: 20, fontSize: 16 }}>
                {output}
              </Text>
            </ScrollView>
          )} */}
              {/* end */}
              <View style={{ width: "85%", alignSelf: "center" }}>
                <Navbar />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
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
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
});
