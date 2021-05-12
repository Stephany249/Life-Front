import React, { useCallback } from 'react';
import { Image} from 'react-native';

import collaborateImg from '../../assets/SignIn/collaborate.png';

import { Content, Container, ContainerText, Register, ContainerImage, Table, HeaderTable, Title, SubTitle, FormTable, ContainerTextForgot } from './styles';
import { useNavigation } from '@react-navigation/native';

import {LinearGradient} from 'expo-linear-gradient';

import Form from './Form';

import theme from '../../assets/styles/theme';

const SignIn: React.FC = () => {
  const navigate = useNavigation();

  return (
    <LinearGradient
      colors={[theme.duck_egg_blue, theme.cloudy_blue]}
      locations={[0, 0.5]}
      style={{flex:1}}
    >
      <Content>
      <Container>
        <ContainerText onPress={() => {
          navigate.navigate('SignUp')
        }}>
          <Register>Cadastrar-se</Register>
        </ContainerText>
        <ContainerImage>
          <Image source={collaborateImg} />
        </ContainerImage>
        <Table>
          <HeaderTable>
            <Title>Bem-vindo,{'\n'}</Title>
            <SubTitle>Faça o login para continuar!</SubTitle>
          </HeaderTable>
          <FormTable>
            <Form />
          </FormTable>
          <ContainerTextForgot onPress={() => {
              navigate.navigate('ForgoutPassword')
            }}>
              <Register>Esqueci minha senha</Register>
            </ContainerTextForgot>
        </Table>
      </Container>
      </Content>
    </LinearGradient>
  );
}

export default SignIn;
