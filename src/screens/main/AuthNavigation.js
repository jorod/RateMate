import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../WelcomeScreen';
import LoginWithRmUserScreen from '../LoginWithRmUser';
import EULAScreen from '../EULAScreen';
import RegisterScreen from '../Register';
import { navBarOptions } from './utils';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={navBarOptions()}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginWithRmUserScreen" component={LoginWithRmUserScreen} options={{ title: 'ВХОД' }} />
      <Stack.Screen name="EULAScreen" component={EULAScreen} options={{ title: 'УСЛОВИЯ RM' }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'РЕГИСТРАЦИЯ' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigation;
