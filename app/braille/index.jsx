import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Buffer } from "buffer";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
  Pressable,
  TouchableHighlight,
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
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Navbar from "../../utilities/Navbar";
import bg from "../../assets/bg.png";

export default function App() {
  const [output, setOutput] = useState(null);
  const [image, setImage] = useState(null);
  const [copiedText, setCopiedText] = useState("");
  const [firstLang, setFirstLang] = useState("English");
  const [secondLang, setSecondLang] = useState("Hindi");
  const [openLangDialog, setOpenLangDialog] = useState(false);
  const [openLangDialog2, setOpenLangDialog2] = useState(false);
  const [loading, setLoading] = useState(false);
  const lang = ["English", "Hindi", "Marathi", "Gujrati"];

  const handleSelect1 = (item) => {
    setFirstLang(item);
    setOpenLangDialog(false);
  };

  const handleSelect2 = (item) => {
    setSecondLang(item);
    setOpenLangDialog2(false);
  };

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
        <ScrollView
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
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
                marginTop: 20,
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

            {/* The Change the Language button group */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              {/* First Lang Box */}
              <View>
                <TouchableHighlight
                  onPress={() => setOpenLangDialog(!openLangDialog)}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#111111",
                      padding: 10,
                      justifyContent: "space-between",
                      borderRadius: 8,
                      width: 125,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FEB584",
                        fontSize: 18,
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}
                    >
                      {firstLang}
                    </Text>
                    <MaterialIcons
                      name={
                        !openLangDialog ? "arrow-drop-down" : "arrow-drop-up"
                      }
                      size={24}
                      color="#FFEBCA"
                      style={{ width: 25 }}
                    />
                  </View>
                </TouchableHighlight>
                {openLangDialog && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#111111",
                      borderRadius: 8,
                      padding: 10,
                      marginTop: 50,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      zIndex: 10,
                    }}
                  >
                    {lang.map((item) => {
                      if (item != secondLang) {
                        return (
                          <TouchableHighlight
                            key={item}
                            underlayColor={"#FFEBCA"}
                            onPress={() => handleSelect1(item)}
                          >
                            <View style={{ paddingVertical: 5 }}>
                              <Text
                                style={{
                                  color: "#FEB584",
                                  fontSize: 18,
                                  width: 105,
                                }}
                              >
                                {item}
                              </Text>
                            </View>
                          </TouchableHighlight>
                        );
                      }
                    })}
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setFirstLang(secondLang);
                  setSecondLang(firstLang);
                }}
              >
                <View>
                  <MaterialCommunityIcons
                    name="swap-horizontal"
                    size={35}
                    color="#FFEBCA"
                  />
                </View>
              </TouchableOpacity>

              {/* Second Lang Box */}
              <View>
                <TouchableHighlight
                  onPress={() => setOpenLangDialog2(!openLangDialog2)}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#111111",
                      padding: 10,
                      justifyContent: "space-between",
                      borderRadius: 8,
                      width: 125,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FEB584",
                        fontSize: 18,
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}
                    >
                      {secondLang}
                    </Text>
                    <MaterialIcons
                      name={
                        !openLangDialog2 ? "arrow-drop-down" : "arrow-drop-up"
                      }
                      size={24}
                      color="#FFEBCA"
                      style={{ width: 25 }}
                    />
                  </View>
                </TouchableHighlight>
                {openLangDialog2 && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#111111",
                      borderRadius: 8,
                      padding: 10,
                      marginTop: 50,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      zIndex: 10,
                    }}
                  >
                    {lang.map((item) => {
                      if (item != firstLang) {
                        return (
                          <TouchableHighlight
                            key={item}
                            underlayColor={"#FFEBCA"}
                            onPress={() => handleSelect2(item)}
                          >
                            <View style={{ paddingVertical: 5 }}>
                              <Text
                                style={{
                                  color: "#FEB584",
                                  fontSize: 18,
                                  width: 105,
                                }}
                              >
                                {item}
                              </Text>
                            </View>
                          </TouchableHighlight>
                        );
                      }
                    })}
                  </View>
                )}
              </View>
            </View>
            {/* end */}

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
            {output && <View style={{ height: 77 }}></View>}
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
                  marginTop: 20,
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
                  marginTop: 20,
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
