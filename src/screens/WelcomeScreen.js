import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import AppStyles from '../config/AppStyles';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const LoginScreen = ({ navigation }) => (
  <View style={styles.containerView}>
    <View style={styles.header} />
    <Image
      style={styles.welcomeImage}
      label="rate mate logo"
      source={require('../assets/images/RATE_MATE_LOGO-01.png')}
    />
    <TouchableOpacity
      style={[AppStyles.loginButton, styles.loginButton]}
      name="Facebook"
      underlayColor={AppStyles.loginButton.backgroundColor}
      onPress={() => {
        navigation.navigate('EULAScreen', { showAccept: true, type: 'facebook' });
      }}
    >
      <Image source={require('../assets/images/f.png')} style={styles.loginButtonIcon} />
      <Text style={styles.loginButtonText}>Вход с Facebook</Text>
    </TouchableOpacity>
    <TouchableOpacity
      underlayColor={AppStyles.loginButton.backgroundColor}
      style={[AppStyles.loginButton, styles.loginButton]}
      onPress={() => {
        navigation.navigate('LoginWithRmUserScreen');
      }}
    >
      <Image source={require('../assets/images/email.png')} style={styles.loginButtonIcon} />
      <Text style={styles.loginButtonText}>Вход с Rate Mate</Text>
    </TouchableOpacity>
    {Platform.OS === 'ios' && (
      <TouchableOpacity
        style={[AppStyles.loginButton, styles.loginButton, { backgroundColor: 'black' }]}
        onPress={() => {
          navigation.navigate('EULAScreen', { showAccept: true, type: 'appleID' });
        }}
      >
        <Image source={require('../assets/images/apple.png')} style={styles.loginButtonIcon} />
        <Text style={styles.loginButtonText}>Вход с Apple</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      underlayColor={styles.registerButton.backgroundColor}
      style={styles.registerButton}
      onPress={() => {
        navigation.navigate('RegisterScreen', { name: 'РЕГИСТРАЦИЯ' });
      }}
    >
      <Text style={styles.registerButtonText}>РЕГИСТРАЦИЯ</Text>
    </TouchableOpacity>
    <View style={styles.footer} />
  </View>
);

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Yellow,
  },
  header: {
    flex: 5,
  },
  welcomeImage: {
    width: '65%',
    height: '50%',
    resizeMode: 'contain',
  },
  loginButton: {
    flexDirection: 'row',
    height: '5%',
    justifyContent: 'flex-start',
    ...Platform.select({
      android: {
        height: '8%',
      },
    }),
  },
  loginButtonText: {
    flex: 0.9,
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    ...Platform.select({
      android: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        fontFamily: Fonts.FontFamily,
      },
    }),
  },
  loginButtonIcon: {
    width: 20,
    height: 20,
    left: 10,
  },
  registerButton: {
    backgroundColor: Colors.Yellow,
    borderColor: Colors.Blue,
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 40,
    width: Fonts.Width,
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  registerButtonText: {
    color: Colors.Blue,
    fontSize: 20,
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: Fonts.FontFamilyBold,
      },
    }),
  },
  footer: {
    flex: 13,
  },
});

export default LoginScreen;
