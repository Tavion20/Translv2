import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {

  const [fileUri, setFileUri] = useState(null);
  const [output, setOutput] = useState(null);
  const [translate,setTranslate] = useState("");
  const [image,setImage] = useState(null);

  const texttranslate = async () => {
    try {
      const response = await fetch("http://192.168.0.107:10000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: "english", target: "hindi", data: translate }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const translatedText = await response.json();
  
      if (!translatedText.hasOwnProperty('result')) {
        throw new Error(`Invalid response format: missing 'result' property`);
      }
  
      setOutput(translatedText.result);
    } catch (error) {
      console.error('Error:', error.message);
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
      formData.append('file', {
        uri: fileUri.uri,
        name: fileUri.name,
        type: fileUri.mimeType,
        source: "english", 
        target: "hindi"
      });
      console.log(formData)
      const response = await fetch("http://192.168.0.107:10000/filetranslate", {
        method: "POST",
        headers: {
          "Content-Type": 'multipart/form-data',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const translatedFileBlob = await response.text();

      setOutput(translatedFileBlob);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Translation failed.');
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const translateImage = async () => {

    try {
      console.log(formData);
      const response = await fetch("http://192.168.0.107:10000/fileimg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: "english", target: "hindi", data: image })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const translatedFileBlob = await response.text();

      setOutput(translatedFileBlob);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Translation failed.');
    }
  };
  
  const handleAudioPick = async () => {
    const file = await DocumentPicker.getDocumentAsync({type: 'audio/*'});
    console.log(file);
    setFileUri(file.assets[0]);
};

const translateAudio = async () => {
  try {
    const response = await fetch("http://192.168.0.107:10000/fileaudio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source: "english", target: "hindi", data: fileUri })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const translatedFileBlob = await response.text();

    setOutput(translatedFileBlob);
  } catch (error) {
    console.error('Error:', error.message);
    Alert.alert('Error', 'Translation failed.');
  }
};

  return (
    <View style={styles.container}>
      <Text>Translate Text</Text>
      <TextInput
        style={{width:350,height:50,padding:5,backgroundColor:'#f1f1f1',borderRadius:10,marginTop:20,marginBottom:20,paddingLeft:35}}
        onChangeText={setTranslate}
        value={translate}
      />
      <Button onPress={() => texttranslate()} title='Transl' color='#000555' />
      <Text>{output}</Text>
      <Button title="Pick File" onPress={handleFilePick} />
      <Button title="Translate File" onPress={translateFile} />
      <View style={{marginTop:20}}>
        <Button style={{marginTop:10}} title="Pick img" onPress={pickImage} color='#ae465e'/>
        <Button style={{marginTop:10}} title="Translate File" onPress={translateImage} color='#ae465e'/>
      </View>
      <View style={{marginTop:20}}>
        <Button style={{marginTop:10}} title="Pick audio" onPress={handleAudioPick} color="#ef6576" />
        <Button style={{marginTop:10}} title="Translate File" onPress={translateAudio} color="#ef6576" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
