import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts, Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

import AppProvider from './src/hooks';
import Routes from './src/routes';

import theme from './src/assets/styles/theme';

import './src/config/ReactotronConfig';


export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_400Regular, Lato_700Bold
  });


  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    );
  }
}

