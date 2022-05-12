import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, Platform } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { isNull } from 'util';
import { NewImagePicker } from '../components/NewImagePicker';
import Colors from '../constants/Colors';

const secret = 'ZUbpODZ90l^M;dg*V=$ctnXdspaRz#,iDJwou<Adql';

const PictureMainScreen = props => {
  const [image, setImage] = useState();
  const uploadForm = new FormData();

  const uploadPicture = async () => {
    const rdm = Math.floor(Math.random() * 10000 + 1);
    // uploadForm.append('image', {
    //   uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    //   name: `selfie_${props.route.params.eventId}_${rdm}.jpg`,
    //   type: image.type
    // });
    // console.log(uploadForm);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image.uri, true);
      xhr.send(null);
    });

    const reader = new FileReader();
    reader.onloadend = async function () {
      const imageAsDataUrl = reader.result;
      const dataToSend = JSON.stringify({
        eventid: props.route.params.eventId,
        type: 'jpg',
        name: `selfie_${props.route.params.eventId}_${rdm}.jpg`,
        uri: imageAsDataUrl
      });
      console.log('-----    SENDING PICTURE    -----');
      console.log(dataToSend);

      try {
        const response = await fetch('https://picnshare.fr/api/v1/photo/', {
          method: 'POST',
          headers: {
            secret: secret,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.route.params.token}`
          },
          body: dataToSend
        });
        console.log('-----    READING RESPONSE    -----');
        console.log(await response.json());
      } catch (error) {
        throw error;
      }
    };
    reader.readAsDataURL(blob);

    // console.log(blob);
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  console.log(props.route.params.eventId);
  return (
    <LinearGradient
      colors={[Colors.first, Colors.second]}
      end={{ x: 0, y: 0.5 }}
      style={styles.screen}
    >
      <Text style={styles.mainText}>Prends une photo et partage!</Text>
      <NewImagePicker setImage={setImage} image={image}>
        <Pressable
          style={!!image ? styles.button : styles.buttonDisabled}
          disabled={!image}
          onPress={() => {
            console.log('YEEHAW, picture sent');
            Alert.alert('Photo envoyée !', "Partages-en d'autres!", [
              { text: 'Ok' }
            ]);
            uploadPicture().then(setImage(null));
          }}
        >
          <Text style={styles.textStyle}>Envoyer la photo</Text>
        </Pressable>
      </NewImagePicker>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100
  },
  mainText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 8
  },
  buttonDisabled: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'grey',
    marginBottom: 10
  },
  textStyle: {
    color: Colors.second,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export const screenOptions = navData => {
  const title = navData.route.params.eventName;
  return {
    title: title
  };
};

export default PictureMainScreen;
