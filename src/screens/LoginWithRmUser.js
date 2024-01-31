import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import AppStyles from '../config/AppStyles';
import Fonts from '../constants/Fonts';
import KeyboardShift from '../components/KeyboardShift';
import { login } from '../redux/auth/actions';
import { isValidEmail } from '../helpers/utils';

const LoginWithRmUserScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const validateEmail = () => {
    if (email === undefined || email.trim() === '') {
      setEmailError('*Моля въведете  имейл адрес');
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError('*Въвели сте невалиден имейл адрес');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const onLoginPressed = async () => {
    if (validateEmail()) {
      dispatch(login(email, password));
      // try {
      // } catch (error) {
      //   if (error == "Error: Wrong username or password!"){
      //     setEmailError('*Грешен имейл или парола');
      //   }
      // }
    }
  };

  return (
    <KeyboardShift>
      {() => (
        <View style={AppStyles.main}>
          <ScrollView contentContainerStyle={AppStyles.containerScrollViewLogin}>
            <Image
              style={styles.welcomeImage}
              label="rate mate logo"
              source={require('../assets/images/RATEMATE_LOGO-01_WHITEBG.png')}
            />
            <Text style={styles.label}>Имейл</Text>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/letter.png')} label="mail" style={AppStyles.ImageStyleMail} />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="grey"
                onChangeText={(val) => setEmail(val)}
                onBlur={() => {
                  validateEmail();
                }}
              />
            </View>
            <Text style={AppStyles.errorInput}>{emailError}</Text>
            <Text style={styles.label}>Парола</Text>
            <View style={AppStyles.SectionStyle}>
              <Image source={require('../assets/images/key.png')} label="mail" style={AppStyles.ImageStyleKey} />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="grey"
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}
              />
            </View>
            <TouchableOpacity
              underlayColor={AppStyles.loginButton.backgroundColor}
              style={styles.loginButton}
              onPress={onLoginPressed}
            >
              <Text style={styles.loginButtonText}>ВЛЕЗ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor={styles.forgottenButton.backgroundColor}
              style={styles.forgottenButton}
              onPress={() => {
                Linking.openURL('mailto:team@ratemate.eu?subject=Забравена парола');
              }}
            >
              <Text style={styles.forgottenButtonText}>ЗАБРАВЕНА ПАРОЛА</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  welcomeImage: {
    width: '33%',
    height: '21%',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    color: 'black',
    borderRadius: 2,
    fontSize: 22,
    fontFamily: Fonts.FontFamily,
  },
  label: {
    width: '75%',
    margin: 10,
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: Fonts.FontFamily,
  },
  loginButton: {
    backgroundColor: '#0970B2',
    borderRadius: 2,
    marginTop: 30,
    width: Fonts.Width,
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.FontFamily,
  },
  forgottenButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderColor: '#0970B2',
    borderWidth: 2,
    borderRadius: 2,
    width: Fonts.Width,
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgottenButtonText: {
    color: '#0970B2',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: Fonts.FontFamily,
  },
});

export default LoginWithRmUserScreen;
