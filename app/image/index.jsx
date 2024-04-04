import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { router } from "expo-router";
import GradientText from "../../utilities/GradientText";
import GradientButton from "../../utilities/GradientButton";
import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import bg from "../../assets/bg.png";

export default function App() {
  const [output, setOutput] = useState(null);
  const [image, setImage] = useState(null);
  const [copiedText, setCopiedText] = useState("");

  //Function to use Clipboard
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(output);
  };

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

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const translateImage = async () => {
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
        "https://translv2-backend-fgkh.onrender.com/fileimg",
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

      const translatedFileBlob = await response.json();

      setOutput(translatedFileBlob.translatedText);
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
          {/* The title */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable onPress={() => router.push("/")}>
              <GradientText
                text="Transl"
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
          <TouchableOpacity
            onPress={pickImage}
            style={{ display: "flex", alignItems: "center", marginTop: 40 }}
          >
            <View
              style={{
                backgroundColor: "#000000BF",
                margin: 12,
                width: "90%",
                borderColor: "white",
                height: !output ? 500 : 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              {!image && (
                <View style={{ display: "flex", alignItems: "center" }}>
                  <MaterialIcons name="camera-alt" size={75} color="white" />
                  <Text style={{ color: "white" }}>Pick an Image</Text>
                </View>
              )}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 320, height: 240, borderRadius: 10 }}
                />
              )}
            </View>
          </TouchableOpacity>
          {/* end */}
          {/* Translate Button */}
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable
              onPress={translateImage}
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
            </Pressable>
          </View>
          {/* end */}
          {/* Hidden Output Container */}
          {output && (
            <View
              style={{
                backgroundColor: "#00000080",
                borderRadius: 10,
                width: "90%",
                alignSelf: "center",
                marginTop: 50,
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
            </View>
          )}
          {/* end */}
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
