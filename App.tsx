import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts, Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import * as Linking from 'expo-linking';

import AppProvider from './src/hooks';
import Routes from './src/routes';

import theme from './src/assets/styles/theme';

import './src/config/ReactotronConfig';

const prefix = Linking.makeUrl("/");

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_400Regular, Lato_700Bold
  });

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ResetPassword: "ResetPassword",
      },
    },
  };

  const url = Linking.useURL();
  console.log(url);

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <NavigationContainer linking={linking}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    );
  }
}

