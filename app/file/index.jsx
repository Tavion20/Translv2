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
} from "react-native";
import { router } from "expo-router";
import GradientText from "../../utilities/GradientText";
import GradientButton from "../../utilities/GradientButton";
import * as DocumentPicker from "expo-document-picker";
import * as Clipboard from "expo-clipboard";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Navbar from "../../utilities/Navbar";
import { AntDesign } from "@expo/vector-icons";

import bg from "../../assets/bg.png";

export default function App() {
  const [output, setOutput] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const [copiedText, setCopiedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLang, setFirstLang] = useState("en");
  const [secondLang, setSecondLang] = useState("hi");
  const [openLangDialog, setOpenLangDialog] = useState(false);
  const [openLangDialog2, setOpenLangDialog2] = useState(false);
  const lang = ["as", "bn", "gu", "hi", "kn", "ml", "mr", "or", "en"];

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
  const handleFilePick = async () => {
    const file = await DocumentPicker.getDocumentAsync({});
    console.log(file);
    setFileUri(file.assets[0]);
  };

  const translateFile = async () => {
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append("file", {
        uri: fileUri.uri,
        name: fileUri.name,
        type: fileUri.mimeType,
      });
      formData.append("source", firstLang);
      formData.append("target", secondLang);

      console.log(formData);
      const response = await fetch(
        "https://transl-backend-0tra.onrender.com/filetranslate",
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
      setLoading(false);
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
                text="File"
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
              <TouchableHighlight>
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
                  {/* <MaterialIcons
                    name={!openLangDialog ? "arrow-drop-down" : "arrow-drop-up"}
                    size={24}
                    color="#FFEBCA"
                    style={{ width: 25 }}
                  /> */}
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

            <View>
              <AntDesign name="arrowright" size={25} color="#FFEBCA" />
            </View>

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
            onPress={handleFilePick}
            style={{ display: "flex", alignItems: "center", marginTop: 20 }}
          >
            <View
              style={{
                backgroundColor: "#000000BF",
                margin: 12,
                width: "90%",
                borderColor: "white",
                height: !output ? 455 : 207,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              {!fileUri && (
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Fontisto name="file-1" size={60} color="white" />
                  <Text style={{ color: "white", marginTop: 10 }}>
                    Pick a File
                  </Text>
                </View>
              )}
              {fileUri && (
                <View style={{ display: "flex", alignItems: "center" }}>
                  <MaterialIcons
                    name="file-download-done"
                    size={75}
                    color="grey"
                  />
                  <Text style={{ color: "grey", marginTop: 10 }}>
                    File Selected..
                  </Text>
                </View>
              )}
            </View>
          </TouchableHighlight>
          {/* end */}
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
                onPress={translateFile}
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
                <GradientButton text="loading" height={60} borderRadius={10} />
              </Pressable>
            </View>
          )}

          {/* end */}
          {/* Hidden Output Container */}
          {output && (
            <ScrollView
              style={{
                borderRadius: 10,
                marginTop: 25,
                backgroundColor: "#00000080",
                width: "90%",
                alignSelf: "center",
                padding: 20,
                height: 200,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
              <Text
                style={{
                  color: "#FFEBCA",
                  marginTop: 20,
                  fontSize: 16,
                  lineHeight: 30,
                  paddingBottom: 40,
                }}
              >
                {output}
              </Text>
            </ScrollView>
          )}
          {/* end */}
          <View style={{ width: "85%", alignSelf: "center" }}>
            <Navbar />
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
