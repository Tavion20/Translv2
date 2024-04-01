import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
export default function App() {
  const [fileUri, setFileUri] = useState(null);
  const [output, setOutput] = useState(null);
  const [translate, setTranslate] = useState("");
  const [image, setImage] = useState(null);

  const texttranslate = async () => {
    try {
      console.log("Sending....");
      console.log(translate);
      const response = await fetch(
        "https://translv2-backend-fgkh.onrender.com/translate",
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

  const handleFilePick = async () => {
    const file = await DocumentPicker.getDocumentAsync({});
    console.log(file);
    setFileUri(file.assets[0]);
  };

  const translateFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri.uri,
        name: fileUri.name,
        type: fileUri.mimeType,
        source: "english",
        target: "hindi",
      });
      console.log(formData);
      const response = await fetch(
        "https://translv2-backend-fgkh.onrender.com/filetranslate",
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

  const handleAudioPick = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    console.log(file);
    setFileUri(file.assets[0]);
  };

  const translateAudio = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", {
        uri: fileUri.uri,
        name: fileUri.name,
        type: fileUri.mimeType,
        source: "english",
        target: "hindi",
      });
      console.log(formData);
      const response = await fetch(
        "https://translv2-backend-fgkh.onrender.com/fileaudio",
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
      <Link href="/">
        <Text>Go back to Home Page</Text>
      </Link>
      <Text>Translate Text</Text>
      <TextInput
        style={{
          width: 350,
          height: 50,
          padding: 5,
          backgroundColor: "#f1f1f1",
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
          paddingLeft: 35,
        }}
        onChangeText={setTranslate}
        value={translate}
      />
      <Button onPress={() => texttranslate()} title="Transl" color="#000555" />
      <Text>{output}</Text>
      <Button title="Pick File" onPress={handleFilePick} />
      <Button title="Translate File" onPress={translateFile} />
      <View style={{ marginTop: 20 }}>
        <Button
          style={{ marginTop: 10 }}
          title="Pick img"
          onPress={pickImage}
          color="#ae465e"
        />
        <Button
          style={{ marginTop: 10 }}
          title="Translate File"
          onPress={translateImage}
          color="#ae465e"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          style={{ marginTop: 10 }}
          title="Pick audio"
          onPress={handleAudioPick}
          color="#ef6576"
        />
        <Button
          style={{ marginTop: 10 }}
          title="Translate File"
          onPress={translateAudio}
          color="#ef6576"
        />
      </View>
      <StatusBar style="auto" />
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
