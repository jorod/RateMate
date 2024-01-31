import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfoScreen from '../UserInfoScreen';
import { navBarOptions } from './utils';

const Stack = createNativeStackNavigator();

const UserInfoNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="UserInfo" screenOptions={navBarOptions()}>
      <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ title: 'МОИТЕ ДАННИ' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default UserInfoNavigation;
