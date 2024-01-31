import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import * as AppleAuthentication from 'expo-apple-authentication';
import { Settings, Profile, LoginManager, AccessToken } from 'react-native-fbsdk-next';

import { getRMUser, fbLogin, getAppleUsername } from '../managers/UserService';
import { userLogin, loginWithApple, login } from '../redux/auth/actions';

import AppStyles from '../config/AppStyles';

const CustomLoginButton = ({ type }) => {
  const dispatch = useDispatch();

  Settings.initializeSDK();

  const loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled === false) {
        const fbProfile = await Profile.getCurrentProfile();
        console.log('fbProfile: ', fbProfile);

        let rmUser = getRMUser(fbProfile);
        console.log('RMUser: ', rmUser);

        const fbToken = await AccessToken.getCurrentAccessToken();
        console.log('fbToken: ', fbToken.accessToken);

        const loginResponse = await fbLogin(rmUser.email, fbToken.accessToken);
        rmUser.token = loginResponse.token;
        console.log('userUpdated: ', rmUser);

        dispatch(userLogin(rmUser));

        // dispatch(login("gph15034@boofx.com", "windows"));

        console.log('Done!');
      } else {
        console.log('Cancelled!');
      }
    } catch ({ message }) {
      alert(`Facebook Login error: ${message}`);
    }
  };

  const loginWithAppleID = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      dispatch(loginWithApple(getAppleUsername(credentials), credentials.email, credentials.identityToken));
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        alert('Cancelled!');
      } else {
        alert(e);
      }
    }
  };

  const handleLogin = async () => {
    if (type === 'facebook') {
      loginWithFacebook();
    }

    if (type === 'appleID') {
      loginWithAppleID();
    }
  };

  return (
    <TouchableOpacity
      style={[AppStyles.loginButton, { height: '80%', marginTop: 0 }]}
      name="Facebook"
      underlayColor={AppStyles.loginButton.backgroundColor}
      onPress={() => handleLogin()}
    >
      <Text style={AppStyles.whiteText}>ПРИЕМАМ</Text>
    </TouchableOpacity>
  );
};

export default CustomLoginButton;
