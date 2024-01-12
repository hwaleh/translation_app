import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import * as Speech from 'expo-speech';
//import { Audio } from 'expo-av';
import translate from 'translate-google-api';

const langs = {
  Automatic: "auto",
  Afrikaans: "af",
  Albanian: "sq",
  Amharic: "am",
  Arabic: "ar",
  Armenian: "hy",
  Azerbaijani: "az",
  Basque: "eu",
  Belarusian: "be",
  Bengali: "bn",
  Bosnian: "bs",
  Bulgarian: "bg",
  Catalan: "ca",
  Cebuano: "ceb",
  Chichewa: "ny",
  "Chinese Simplified": "zh-cn",
  "Chinese Traditional": "zh-tw",
  Corsican: "co",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dutch: "nl",
  English: "en",
  Esperanto: "eo",
  Estonian: "et",
  Filipino: "tl",
  Finnish: "fi",
  French: "fr",
  Frisian: "fy",
  Galician: "gl",
  Georgian: "ka",
  German: "de",
  Greek: "el",
  Gujarati: "gu",
  "Haitian Creole": "ht",
  Hausa: "ha",
  Hawaiian: "haw",
  Hebrew: "iw",
  Hindi: "hi",
  Hmong: "hmn",
  Hungarian: "hu",
  Icelandic: "is",
  Igbo: "ig",
  Indonesian: "id",
  Irish: "ga",
  Italian: "it",
  Japanese: "ja",
  Javanese: "jw",
  Kannada: "kn",
  Kazakh: "kk",
  Khmer: "km",
  Korean: "ko",
  "Kurdish (Kurmanji)": "ku",
  Kyrgyz: "ky",
  Lao: "lo",
  Latin: "la",
  Latvian: "lv",
  Lithuanian: "lt",
  Luxembourgish: "lb",
  Macedonian: "mk",
  Malagasy: "mg",
  Malay: "ms",
  Malayalam: "ml",
  Maltese: "mt",
  Maori: "mi",
  Marathi: "mr",
  Mongolian: "mn",
  "Myanmar (Burmese)": "my",
  Nepali: "ne",
  Norwegian: "no",
  Pashto: "ps",
  Persian: "fa",
  Polish: "pl",
  Portuguese: "pt",
  Punjabi: "ma",
  Romanian: "ro",
  Russian: "ru",
  Samoan: "sm",
  "Scots Gaelic": "gd",
  Serbian: "sr",
  Sesotho: "st",
  Shona: "sn",
  Sindhi: "sd",
  Sinhala: "si",
  Slovak: "sk",
  Slovenian: "sl",
  Somali: "so",
  Spanish: "es",
  Sundanese: "su",
  Swahili: "sw",
  Swedish: "sv",
  Tajik: "tg",
  Tamil: "ta",
  Telugu: "te",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Urdu: "ur",
  Uyghur: "ug",
  Uzbek: "uz",
  Vietnamese: "vi",
  Welsh: "cy",
  Xhosa: "xh",
  Yiddish: "yi",
  Yoruba: "yo",
  Zulu: "zu"
};

export default function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(langs['en']);   //default lang=English


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert('No Internet Connection', 'Please connect to the internet to use translation.');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    toggleModal();
  };

  const LanguageDisplay = ({ selectedLanguage }) => (
    <View style={{justifyContent: 'center', padding: 8, backgroundColor: '#4285F4' }}>
      <Text style={{ color: 'white' }}>Translate to: {Object.keys(langs).filter(key => langs[key] === selectedLanguage)}
      </Text>
    </View>
  );

  /*const TranslatedTextDisplay = ({ translatedText }) => (
    <View style={{ marginTop: 10 }}>
      <Text>Translated Text: {translatedText}</Text>
    </View>
  );*/

  const translateText = async () => {
    try {
      const response = await translate(text, { to: selectedLanguage });
      //console.log(response.text);
      if (response) {
        //console.log(translatedText[0]);
        setTranslatedText(response);
        //console.log(translatedText[0]);
      } else {
        console.error('Unexpected translation response:', response);
      }
    } catch (error) {
      console.error('Error translating text', error);
    }
  };
  

  const speakTranslatedText = async () => {
    /*try {
      const ttsUrl ='https://translate.google.com/?sl=auto&tl=auto&text='+translatedText[0];
      console.log(ttsUrl);
      //const ttsUrl = `http://translate.google.com/translate_tts?tl=${selectedLanguage}&q=${encodeURIComponent(translatedText[0])}`;
      const { sound } = await Audio.Sound.createAsync({ uri: ttsUrl }, { shouldPlay: true });
      await sound.playAsync();
      setIsSpeaking(true);
      console.log('speek');
    } catch (error) {
      console.error('Error speaking text', error);
    }*/
    const thingToSay = translatedText[0];
    Speech.speak(thingToSay, {language: selectedLanguage});
  };

  /*const styles = StyleSheet.create({
    inputBox: {
      marginBottom: 10,
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
    },
  });*/
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: Platform.OS === 'android' ? '#f0f0f0' : 'white' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Enter text to translate"
        onChangeText={(inputText) => setText(inputText)}
        value={text}
      />

      <TextInput title='translated'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Translated text"
        onChangeText={(translatedText) => setText(translatedText)}
        value={translatedText[0]}
      />
      
      {/*{translatedText ? (
        <View style={styles.inputBox}>
          <Text style={{ marginTop: 10, alignContent:'center' }}>Translated: {translatedText}</Text>
        </View>
      ) : null} 
      */}

      <Button title="Translate" onPress={translateText} disabled={!text} />
      
      <Button
        title={isSpeaking ? 'Speaking...' : 'Speak Translated Text'}
        onPress={speakTranslatedText}
        disabled={!translatedText || isSpeaking}
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {/*<LanguageDisplay selectedLanguage={selectedLanguage} />*/}
        
        <TouchableOpacity onPress={toggleModal}>
          <LanguageDisplay selectedLanguage={selectedLanguage} /> 
        </TouchableOpacity>
      </View>
      
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <FlatList
          data={Object.keys(langs)}
          keyExtractor={(item) => langs[item]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectLanguage(langs[item])}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
        
  );
}
