import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

import {LinearGradient} from 'expo-linear-gradient';

import theme from '../../assets/styles/theme';

const SignUp: React.FC = () => {
  return (
    <LinearGradient
    colors={[theme.duck_egg_blue, theme.cloudy_blue]}
    locations={[0, 0.5]}
    style={{flex:1}}
  >
      <Container>
        <Text>Olá SingUp</Text>
      </Container>
    </LinearGradient>
  );
}

export default SignUp;
