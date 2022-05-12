import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CodeInput from '../components/CodeInput';
import Colors from '../constants/Colors';

const CodeInputScreen = props => {
  const [code, setCode] = useState('');
  const privateEvents = props.route.params.privateEvents;
  const token = props.route.params.token;

  const onSubmit = () => {
    console.log(+code);
    const validateCode = privateEvents.filter(event => +event.id === +code);
    console.log('RESULT IS : ', validateCode);
    if (validateCode.length === 0) {
      console.log('GO BACK YOU CHUMP');
      props.navigation.goBack();
    } else {
      props.navigation.navigate('PictureMain', {
        eventId: validateCode[0].id,
        eventName: validateCode[0].name,
        token
      });
    }
  };
  return (
    <LinearGradient
      colors={[Colors.first, Colors.second]}
      end={{ x: 0, y: 0.5 }}
      style={styles.centeredView}
    >
      <CodeInput
        quantity={6}
        code={code}
        setCode={setCode}
        onSubmit={onSubmit}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const screenOptions = navData => {
  return {
    title: 'Événement Privé'
  };
};

export default CodeInputScreen;
