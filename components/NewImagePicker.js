import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityComponent,
  TouchableNativeFeedback
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export const NewImagePicker = ({ image, setImage, ...props }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <TouchableNativeFeedback onPress={pickImage}>
          <View style={styles.touchable}>
            {!image ? (
              <Text style={styles.placeholderText}>Appuie, souris!</Text>
            ) : (
              <Image source={{ uri: image.uri }} style={styles.image} />
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.textStyle}>Prendre une photo</Text>
        </Pressable>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.third,
    borderWidth: 7,
    borderRadius: 50,
    overflow: 'hidden'
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 8
  },
  textStyle: {
    color: Colors.second,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  placeholderText: {
    color: 'white',
    fontSize: 22
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});

export default NewImagePicker;
