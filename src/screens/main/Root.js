import React from 'react';

import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import TabsNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';
import UserInfoNavigation from './UserInfoNavigation';

import { isLoggedIn } from '../../redux/auth/selectors';
import { customFonts } from './utils';
import { getUserDetails } from '../../redux/userDetails/selectors';

// import * as Analytics from 'expo-firebase-analytics';

// Get the current screen from the navigation state
// function getActiveRouteName(navigationState) {
//   if (!navigationState) return null;
//   const route = navigationState.routes[navigationState.index];
//   // Parse the nested navigators
//   if (route.routes) return getActiveRouteName(route);
//   return route.routeName;

// export default () => (
//     {/* <App
//       onNavigationStateChange={(prevState, currentState) => {
//         const currentScreen = getActiveRouteName(currentState);
//         const prevScreen = getActiveRouteName(prevState);
//         if (prevScreen !== currentScreen) {
//           // Update Firebase with the name of your screen
//           Analytics.setCurrentScreen(currentScreen, currentScreen);
//         }
//       }}
//     /> */}
// );

const Root = () => {
  const [fontsLoaded] = useFonts(customFonts);
  const loggedIn = useSelector((state) => isLoggedIn(state));
  const userDetails = useSelector((state) => getUserDetails(state));

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (loggedIn) {
    if (userDetails && Object.entries(userDetails).length === 0) {
      return <UserInfoNavigation/>
    }
    return <TabsNavigation />
  } else {
    return <AuthNavigation />
  }
};

export default Root;
