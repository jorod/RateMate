import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import AppStyles from '../config/AppStyles';
import KeyboardShift from '../components/KeyboardShift';
import { isValidPassword, isValidEmail, isValidUsername } from '../helpers/utils';
import { registerRN } from '../redux/auth/actions';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [registerButtonEnabled, setRegisterButtonEnabled] = useState(false);
  const [isUserCorrect, setIsUserCorrect] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isPasswordRepeatCorrect, setIsPasswordRepeatCorrect] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = () => {
    if (email === undefined || email.trim() === '') {
      setEmailError('*Имейл адресът е задължителен');
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError('*Въвели сте невалиден имейл адрес');
      return false;
    } else {
      setEmailError('');
      setIsEmailCorrect(true);
      return true;
    }
  };

  const validateUserName = () => {
    if (!isValidUsername(username)) {
      setUsernameError('*Моля въведете поне 4 символа');
      return false;
    } else {
      setUsernameError('');
      setIsUserCorrect(true);
      return true;
    }
  };

  const validatePassword = () => {
    if (!isValidPassword(password)) {
      setPasswordError('*Моля въведете поне 6 символа');
      return false;
    }

    setPasswordError('');
    setIsPasswordCorrect(true);
    return true;
  };

  const validatePasswordRepeat = () => {
    if (!isValidPassword(passwordRepeat)) {
      setPasswordRepeatError('*Моля въведете поне 6 символа');
      setIsPasswordRepeatCorrect(false);
      return false;
    } else {
      setPasswordRepeatError('');
      setIsPasswordRepeatCorrect(true);
      return true;
    }
  };

  const validatePasswordMatch = () => {
    if (!validatePasswordRepeat()) {
      return;
    }

    if (!password || password != passwordRepeat) {
      setPasswordError('*Паролите не съответстват');
      setIsPasswordCorrect(false);
      setIsPasswordRepeatCorrect(false);

      return false;
    }

    setPasswordError('');
    setIsPasswordRepeatCorrect(true);

    return true;
  };

  const toggle = () => {
    setRegisterButtonEnabled(!registerButtonEnabled);
  };

  const handleRegister = async () => {
    if (validateUserName() && validateEmail() && validatePassword() && validatePasswordMatch()) {
      try {
        dispatch(registerRN(email, password, username));
      } catch (error) {
        if (error == 'The provided user mail is not valid') {
          setEmailError('*Въвели сте невалиден имейл адрес');
        }
        if (error == 'Error: Registration failed.  User with provided details already exists.') {
          setEmailError('*Въвели сте съществуващ имейл адрес');
        }
        if (error == 'The provided passowrd is too short. Should be more than 4 characters') {
          setPasswordError('*Моля въведете поне 6 символа');
        }
      }
    }
  };

  return (
    <KeyboardShift>
      {() => (
        <View style={AppStyles.main}>
          <ScrollView contentContainerStyle={AppStyles.containerScrollView}>
            <View style={AppStyles.LabelContainer}>
              <Text style={AppStyles.label}>Потребителско име</Text>
              {isUserCorrect && (
                <Image source={require('../assets/images/regcheck.png')} label="check" style={AppStyles.noErrorCheck} />
              )}
            </View>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/user_reg.png')} label="user" style={AppStyles.ImageStyleUser} />
              <TextInput
                style={AppStyles.input}
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(val) => setUsername(val)}
                onBlur={validateUserName}
              >
                <Text style={usernameError ? AppStyles.redInput : AppStyles.input}>{username}</Text>
              </TextInput>
            </View>
            <Text style={AppStyles.errorInput}>{usernameError}</Text>
            <View style={AppStyles.LabelContainer}>
              <Text style={AppStyles.label}>Имейл адрес</Text>
              {isEmailCorrect && (
                <Image source={require('../assets/images/regcheck.png')} label="check" style={AppStyles.noErrorCheck} />
              )}
            </View>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/letter.png')} label="mail" style={AppStyles.ImageStyleMail} />
              <TextInput
                style={AppStyles.input}
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(val) => setEmail(val)}
                onBlur={validateEmail}
              >
                <Text style={emailError ? AppStyles.redInput : AppStyles.input}>{email}</Text>
              </TextInput>
            </View>
            <Text style={AppStyles.errorInput}>{emailError}</Text>
            <View style={AppStyles.LabelContainer}>
              <Text style={AppStyles.label}>Парола</Text>
              {isPasswordCorrect && (
                <Image source={require('../assets/images/regcheck.png')} label="check" style={AppStyles.noErrorCheck} />
              )}
            </View>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/key.png')} label="key" style={AppStyles.ImageStyleKey} />
              <TextInput
                style={AppStyles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(val) => setPassword(val)}
                onBlur={validatePassword}
              />
            </View>
            <Text style={AppStyles.errorInput}>{passwordError}</Text>
            <View style={AppStyles.LabelContainer}>
              <Text style={AppStyles.label}>Повтори парола</Text>
              {isPasswordRepeatCorrect && (
                <Image source={require('../assets/images/regcheck.png')} label="check" style={AppStyles.noErrorCheck} />
              )}
            </View>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/key.png')} label="key" style={AppStyles.ImageStyleKey} />
              <TextInput
                style={AppStyles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(val) => setPasswordRepeat(val)}
                onBlur={validatePasswordMatch}
              />
            </View>
            <Text style={AppStyles.errorInput}>{passwordRepeatError}</Text>
            <View style={styles.container}>
              <TouchableOpacity onPress={toggle} style={styles.checkbox}>
                <Image
                  style={styles.checkboxImage}
                  source={
                    registerButtonEnabled
                      ? require('../assets/images/checked.png')
                      : require('../assets/images/unchecked.png')
                  }
                />
              </TouchableOpacity>
              <View style={{ margin: 5, width: '70%' }}>
                <Text style={{ fontSize: 17 }}>
                  {'Съгласен/съгласна съм с '}
                  <Text
                    style={{ textDecorationLine: 'underline' }}
                    onPress={() => {
                      navigation.navigate('EULAScreen', { showAccept: false });
                    }}
                  >
                    Общите Условия
                  </Text>
                  {' и '}
                  <Text
                    style={{ textDecorationLine: 'underline' }}
                    onPress={() => {
                      navigation.navigate('EULAScreen', { showAccept: false, privacy: true });
                    }}
                  >
                    Условията за обработка на лични данни
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[AppStyles.loginButton, { marginBottom: 120 }, !registerButtonEnabled && { opacity: 0.5 }]}
              disabled={!registerButtonEnabled}
              onPress={handleRegister}
            >
              <Text style={AppStyles.whiteText}>РЕГИСТРАЦИЯ</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default RegisterScreen;
