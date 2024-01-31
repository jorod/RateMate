import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from '../MainScreen';
import ProfileScreen from '../ProfileScreen';
import ProductInfoScreen from '../ProductInfoScreen';
import SignalRequestScreen from '../SignalRequestScreen';
import CategoryProductsScreen from '../CategoryProductsScreen';
import RatedProductsScreen from '../RatedProductsScreen';
import UserInfoScreen from '../UserInfoScreen';
import EULAScreen from '../EULAScreen';
import ShoppingListsScreen from '../ShoppingListsScreen';
import EditListScreen from '../EditListScreen';

import { navBarOptions, tabs } from './utils';
import AppStyles from '../../config/AppStyles';

const Stack = createNativeStackNavigator();

const MainScreenStack = () => (
  <Stack.Navigator initialRouteName="Main" screenOptions={navBarOptions()}>
    <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CategoryProductsScreen" component={CategoryProductsScreen} />
    <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} />
    <Stack.Screen name="SignalRequestScreen" component={SignalRequestScreen} />
  </Stack.Navigator>
);

const ShoppingListsScreenStack = () => (
  <Stack.Navigator initialRouteName="ShoppingLists" screenOptions={navBarOptions('СПИСЪЦИ С ПОКУПКИ')}>
    <Stack.Screen name="ShoppingLists" component={ShoppingListsScreen} />
    <Stack.Screen name="EditListScreen" component={EditListScreen} />
  </Stack.Navigator>
);

const ProfileScreenStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={navBarOptions('ПРОФИЛ')}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{ title: 'МОИТЕ ДАННИ' }} />
    <Stack.Screen name="RatedProductsScreen" component={RatedProductsScreen} options={{ title: 'ПРОФИЛ' }} />
    <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} />
    <Stack.Screen name="EULAScreen" component={EULAScreen} options={{ title: 'УСЛОВИЯ RM' }} />
    <Stack.Screen name="SignalRequestScreen" component={SignalRequestScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabsNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const imagePath = focused ? tabs[route.name].imageSelected : tabs[route.name].image;

          return <Image label="tab icon" source={imagePath} style={AppStyles.tabImage} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#eee' },
      })}
    >
      <Tab.Screen name="MainTab" component={MainScreenStack} options={{ headerShown: false }} />
      <Tab.Screen name="ShoppingListTab" component={ShoppingListsScreenStack} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreenStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabsNavigation;
