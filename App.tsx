import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts, Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

import {LinearGradient} from 'expo-linear-gradient';

import SignIn from './src/pages/SignIn';
import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_400Regular, Lato_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#d6f4f6" translucent />
            <LinearGradient
              colors={['#d6f4f6', '#b9b9d9']}
              locations={[0, 0.5]}
              style={{flex:1}}
            >
              <SignIn />
            </LinearGradient>
        </>
    );
  }
}

