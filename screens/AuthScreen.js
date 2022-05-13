import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

import Input from '../components/Input';
import titleImage from '../assets/titleImage.png';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_SWITCH_TO_LOGIN = 'FORM_SWITCH_TO_LOGIN';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  if (action.type === FORM_SWITCH_TO_LOGIN) {
    const updatedValidities = {
      email: state.inputValidities.email,
      password: state.inputValidities.password,
      surname: true,
      firstname: true,
      phone: true,
      username: true
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      surname: '',
      firstname: '',
      phone: '',
      username: ''
    },
    inputValidities: {
      email: false,
      password: false,
      surname: true,
      firstname: true,
      phone: true,
      username: true
    },
    formIsValid: false
  });
  useEffect(() => {
    if (error) {
      Alert.alert('Malheureusement l\'application rencontre une erreur', error, [{ text: 'D\'accord' }]);
    }
  }, [error]);

  const authHandler = async () => {
    console.log(formState.formIsValid);
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.surname,
        formState.inputValues.firstname,
        formState.inputValues.phone,
        formState.inputValues.username
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(null)
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const switchLoginSignup = () => {
    if (isSignup) {
      dispatchFormState({
        type: FORM_SWITCH_TO_LOGIN
      });
    }

    setIsSignup(prevState => !prevState);
  };

  const signUpInputs = (
    <>
      <Input
        id='username'
        label="Nom d'utilisateur"
        keyboardType='default'
        required
        minLength={5}
        autoCapitalize='none'
        errorText="Veuillez entrer un nom d'utilisateur"
        onInputChange={inputChangeHandler}
        initialValue=''
        labelStyle={styles.labelStyle}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
      />
      
    </>
  );

  return (
    <KeyboardAvoidingView style={styles.screen}>
      {/*<LinearGradient
        colors={[Colors.first, Colors.second]}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradient}
      >*/}
        <View style={styles.titleContainer}>
          <Image source={titleImage} style={styles.image} />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleHeader}>Se connecter</Text>
          <Text style={styles.subtitleMain}>
            Connectez-vous pour partager des photos !
          </Text>
        </View>
        <View style={styles.globalInputsContainer}>
          <Input
            id='email'
            label='Adresse e-mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorText='Veuillez entrer une adresse mail valide'
            onInputChange={inputChangeHandler}
            initialValue=''
            labelStyle={styles.labelStyle}
            inputStyle={styles.textInput}
            containerStyle={styles.inputContainer}
            accessibilityLabel='email'
          />
          <Input
            id='password'
            label='Mot de passe'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            errorText='5 caractères minimum'
            onInputChange={inputChangeHandler}
            initialValue=''
            labelStyle={styles.labelStyle}
            inputStyle={styles.textInput}
            containerStyle={styles.inputContainer}
            accessibilityLabel='password'
            onSubmitEditing={() => {
              formState.formIsValid ? authHandler() : null;
            }}
          />
          {isSignup ? signUpInputs : null}
        </View>
        <Pressable
          style={{
            ...styles.button,backgroundColor:'red'
           // ...(!formState.formIsValid ? styles.disabledButton : null)
          }}
          
          onPress={authHandler}
          android_ripple={{ radius: 10 }}
          disabled={!formState.formIsValid}
        >
          <Text style={styles.textStyle}>
            {isSignup ? 'INSCRIPTION' : 'CONNEXION'}
          </Text>
        </Pressable>
      <Button 
        onPress={()=>{console.log("pressed")}}
        title="se connecter"
        style={{
          minHeight:30,maxWidth: 10
           // ...(!formState.formIsValid ? styles.disabledButton : null)
          }}
          
        />
        <View
          style={
            isSignup
              ? {
                  ...styles.switchButtonContainer,
                  ...styles.switchButtonContainerSignup
                }
              : {
                  ...styles.switchButtonContainer,
                  ...styles.switchButtonContainerLogin
                }
          }
        >
          <Pressable
            style={styles.switchButton}
            onPress={() => {
              switchLoginSignup();
            }}
          >
            {!isSignup ? (
              <>
                <Text style={styles.switchTextStyle}>
                  Pas encore de compte ?
                </Text>
                <Text style={styles.switchTextStyleBig}> JE M'INSCRIS</Text>
              </>
            ) : (
              <>
                <Text style={styles.switchTextStyle}>Déjà un compte ?</Text>
                <Text style={styles.switchTextStyleBig}> JE ME CONNECTE</Text>
              </>
            )}
          </Pressable>
        </View>
      {/*</LinearGradient>*/}
    </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
  return {
    title: 'Login',
    headerShown: false
  };
};

export default AuthScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  globalInputsContainer: {
    width: '80%',
    marginBottom: 25
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    marginBottom: 30,
    marginTop: 50,
    backgroundColor:'black'
  },
  image: {
    height: 135,
    width: 270
  },
  subtitleContainer: {
    flexDirection: 'column',
    width: '80%'
  },
  subtitleHeader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25
  },
  subtitleMain: {
    //color: '#FFFFFF88',
    fontSize: 14,
    color:'black'
  },
  switchButtonContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '9%',
    width: '100%'
  },
  switchButtonContainerSignup: {
    marginTop: 10
  },
  switchButtonContainerLogin: {
    marginTop: 75
  },
  textInput: {
    color: 'white',
    width: '100%',
    borderColor: '#DDDDDD99',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    paddingHorizontal: 15
  },
  labelStyle: {
    fontSize: 14,
    alignSelf: 'baseline',
    color: 'black'
    //   color: '#FFFFFF88'
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 5,
    width: '80%',
    height: 45,
    justifyContent: 'center',
    marginBottom: 15
  },
 /* disabledButton: {
    backgroundColor: 'grey'
  },*/
  switchButton: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  switchTextStyle: {
    color: Colors.fourth,
    textAlign: 'center'
  },
  switchTextStyleBig: {
    color: Colors.second,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});


{/* <Input
        id='firstname'
        label='Prénom'
        keyboardType='default'
        required
        minLength={2}
        autoCapitalize='none'
        errorText='Veuillez entrer un prénom'
        onInputChange={inputChangeHandler}
        initialValue=''
        labelStyle={styles.labelStyle}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
      />
      <Input
        id='surname'
        label='Nom de famille'
        keyboardType='default'
        required
        minLength={2}
        autoCapitalize='none'
        errorText='Veuillez entrer un nom'
        onInputChange={inputChangeHandler}
        initialValue=''
        labelStyle={styles.labelStyle}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
      />
      <Input
        id='phone'
        label='Numéro de téléphone'
        keyboardType='default'
        required
        minLength={10}
        max={9999999999}
        autoCapitalize='none'
        errorText='Veuillez entrer un numéro de téléphone'
        onInputChange={inputChangeHandler}
        initialValue=''
        labelStyle={styles.labelStyle}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
      /> */}
