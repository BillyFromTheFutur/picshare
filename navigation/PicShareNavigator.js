import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import EventsOverviewScreen, {
  screenOptions as eventsOverviewOptions
} from '../screens/EventsOverviewScreen';
import PictureMainScreen, {
  screenOptions as pictureMainOptions
} from '../screens/PictureMainScreen';
import AuthScreen, {
  screenOptions as authOptions
} from '../screens/AuthScreen';
import CodeInputScreen, {
  screenOptions as codeInputOptions
} from '../screens/CodeInputScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: Colors.second,
  headerTitleAlign: 'center'
};

const PicStackNavigator = createNativeStackNavigator();

export const PicNavigator = () => {
  return (
    <PicStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <PicStackNavigator.Screen
        name='EventsOverview'
        component={EventsOverviewScreen}
        options={eventsOverviewOptions}
      />
      <PicStackNavigator.Screen
        name='CodeInput'
        component={CodeInputScreen}
        options={codeInputOptions}
      />
      <PicStackNavigator.Screen
        name='PictureMain'
        component={PictureMainScreen}
        options={pictureMainOptions}
      />
    </PicStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
