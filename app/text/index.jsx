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
  TextInput,
} from "react-native";
import { router } from "expo-router";
import GradientText from "../../utilities/GradientText";
import GradientButton from "../../utilities/GradientButton";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Navbar from "../../utilities/Navbar";
import bg from "../../assets/bg.png";

export default function App() {
  const [output, setOutput] = useState(null);
  const [translate, setTranslate] = useState(""); //change this for new feature
  //   const [copiedText, setCopiedText] = useState("");
  const [firstLang, setFirstLang] = useState("English");
  const [secondLang, setSecondLang] = useState("Hindi");
  const [openLangDialog, setOpenLangDialog] = useState(false);
  const [openLangDialog2, setOpenLangDialog2] = useState(false);
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

  // Function to translate text only
  const texttranslate = async () => {
    try {
      console.log("Sending....");
      console.log(`Input string: ${translate}`);
      const response = await fetch(
        "https://transl-backend-0tra.onrender.com/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromLang: "en",
            toLang: "hi",
            inputText: translate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const translatedText = await response.json();
      console.log(translatedText);

      setOutput(translatedText.translatedText);
    } catch (error) {
      console.error("Error:", error.message);
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
                text="Text" //change this for a new feature
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
                    name={!openLangDialog ? "arrow-drop-down" : "arrow-drop-up"}
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

          <TextInput
            style={{
              backgroundColor: "#00000080",
              width: "90%",
              alignSelf: "center",
              padding: 20,
              height: !output ? 300 : 200,
              margin: 12,
              marginTop: 30,
              textAlignVertical: "top",
              color: "#FFEBCA",
              borderRadius: 10,
              fontSize: 18,
              display: "flex",
              flexWrap: "wrap",
              lineHeight: 24,
            }}
            onChangeText={setTranslate}
            value={translate}
            multiline={true}
          />

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
              onPress={texttranslate}
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
          {!output && <View style={{ height: 157 }}></View>}
          {/* Hidden Output Container */}
          {output && (
            <ScrollView
              style={{
                borderRadius: 10,
                marginTop: 30,
                backgroundColor: "#00000080",
                width: "90%",
                alignSelf: "center",
                padding: 20,
                height: 200,
                marginBottom: 27,
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
              <Text
                style={{
                  color: "#FFEBCA",
                  marginTop: 20,
                  fontSize: 18,
                  lineHeight: 30,
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
