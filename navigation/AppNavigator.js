import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, PicNavigator } from './PicShareNavigator';

import * as authActions from '../store/actions/auth';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      {isAuth && <PicNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
/*  
      <PicNavigator />
 *  {!isAuth && didTryAutoLogin && <AuthNavigator />}
 *  {!isAuth && !didTryAutoLogin && <StartupScreen />}
*  {isAuth &&
*/
