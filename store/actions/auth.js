import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

const secret = 'ZUbpODZ90l^M;dg*V=$ctnXdspaRz#,iDJwou<Adql';
let timer;
let dayinms = 24 * 60 * 60 * 1000;

export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (token, email, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      email: email,
      token: token
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    console.log('-----    CONNEXION    -----');
    const response = await fetch('https://picnshare.fr/api/v1/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        secret: secret
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }
    const resData = await response.json();
    if (resData.status === 'FAILED') {
      throw new Error(resData.message);
    }

    if (resData.status !== 'SUCCESS') {
      throw new Error('Erreur inconnue : ', resData);
    }

    if (resData.status === 'SUCCESS') {
      console.log(resData.User);
      const expirationDate = new Date(new Date().getTime() + dayinms);
      saveDataToStorage(resData.User.Token, resData.User.Email, expirationDate);
      dispatch(authenticate(resData.User.Token, resData.User.Email, dayinms));
    }
  };
};

export const signup = (
  email,
  password,
  surname,
  firstname,
  username,
  phone
) => {
  return async dispatch => {
    console.log('-----    INSCRIPTION    -----');
    const response = await fetch('https://picnshare.fr/api/v1/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        secret: secret
      },
      body: JSON.stringify({
        email: email,
        password: password,
        nom: surname,
        prenom: firstname,
        pseudo: username,
        tel: phone
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }

    const resData = await response.json();
    if (resData.status === 'FAILED') {
      throw new Error(resData.message);
    }

    if (resData.status !== 'SUCCESS') {
      throw new Error('Erreur inconnue : ', resData);
    }

    if (resData.status === 'SUCCESS') {
      console.log(resData.User);
      const expirationDate = new Date(new Date().getTime() + dayinms);
      console.log(expirationDate);
      saveDataToStorage(resData.User.Token, resData.User.Email, expirationDate);
      dispatch(authenticate(resData.User.Token, resData.User.Email, dayinms));
    }
  };
};


export const logout = () => {
  clearLogoutTimer();
  return async dispatch => {
    await AsyncStorage.removeItem('userData');
    console.log(AsyncStorage.item)
    dispatch({
      type: 'LOGOUT',
    })
  }
  
   /* return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    })
  }*/
};

export const mysignup = () => {
  return async dispatch => {
    console.log('-----    INSCRIPTION    -----');

    if (resData.status === 'SUCCESS') {
      console.log(resData.User);
      const expirationDate = new Date(new Date().getTime() + dayinms);
      console.log(expirationDate);
      saveDataToStorage(resData.User.Token, resData.User.Email, expirationDate);
      dispatch(authenticate(resData.User.Token, resData.User.Email, dayinms));
    }
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, email, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      email: email,
      expiryDate: expirationDate.toISOString()
    })
  );
};
