import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
  console.log('-----    STARTUP    -----');
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      console.log('-----    AUTOLOGIN TRY    -----');
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if (!userData) {
        dispatch(authActions.setDidTryAl());
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, email, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !email) {
        dispatch(authActions.setDidTryAl());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(token, email, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.first} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
