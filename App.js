import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import eventsReducer from './store/reducers/events';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  LogBox.ignoreLogs(['Setting a timer'], ['There was a problem sending log']);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
