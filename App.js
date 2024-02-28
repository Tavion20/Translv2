import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const texttranslate = async () => {
    try {
      const response = await fetch("http://localhost:10000/translate", {
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

  
  

  const [translate,setTranslate] = useState("");
  const [output,setOutput] = useState("");
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
