import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts, Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

//import SignIn from './src/pages/SignIn';
import AppProvider from './src/hooks';
import Routes from './src/routes';

import theme from './src/assets/styles/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_400Regular, Lato_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={theme.duck_egg_blue} translucent />
          <AppProvider>
            <Routes />
          </AppProvider>
        </NavigationContainer>
    );
  }
}

