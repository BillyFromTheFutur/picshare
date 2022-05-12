import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import Colors from '../constants/Colors';

const CodeInput = ({ quantity, style, code, setCode, onSubmit }) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const ref = useRef();
  // Necessary to ensure I can focus again on the hidden textinput
  const uselessRef = useRef();

  const handleOnPress = () => {
    setContainerIsFocused(true);
    uselessRef.current.focus && uselessRef.current.focus();
    ref.current.focus && ref.current.focus();
  };

  const handleOnSubmitEditing = () => {
    setContainerIsFocused(false);
    onSubmit();
  };

  const renderInputs = index => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === quantity - 1;
    const isCodeFull = code.length === quantity;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer;

    return (
      <View key={index} style={containerStyle}>
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={style}>
        <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
          {Array(quantity)
            .fill(0)
            .map((item, index) => renderInputs(index))}
        </Pressable>
      </View>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnSubmitEditing}
        blurOnSubmit={false}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        returnKeyType='done'
        maxLength={quantity}
        style={styles.hiddenCodeInput}
      />
      <TextInput
        ref={uselessRef}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        returnKeyType='done'
        style={styles.hiddenCodeInput}
      />
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 10,
    width: 10,
    opacity: 0
  },
  inputsContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
    margin: 5,
    flex: 1
  },
  inputContainerFocused: {
    borderColor: Colors.third
  },
  inputText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left'
  }
});
export default CodeInput;
