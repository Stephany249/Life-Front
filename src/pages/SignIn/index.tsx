import React from 'react';
import { Image, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import collaborateImg from '../../assets/SignIn/collaborate.png';
import logoImg from '../../assets/Logo/group_2.png';

import {
  Content, Container, Header, LogoImage, ContainerText, Register, ContainerImage, Table, HeaderTable, Title, SubTitle, FormTable, ContainerTextForgot,
} from './styles';

import Form from './Form';

import theme from '../../assets/styles/theme';

const SignIn: React.FC = () => {
  const navigate = useNavigation();

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={theme.duck_egg_blue} translucent />

    <LinearGradient
      colors={[theme.duck_egg_blue, theme.cloudy_blue]}
      locations={[0, 0.5]}
      style={{ flex: 1 }}
    >
      <Content>
        <Container>
          <Header>
            <LogoImage>
              <Image source={logoImg} />
            </LogoImage>
            <ContainerText onPress={() => {
              navigate.navigate('SignUp');
            }}
            >
              <Register>Cadastrar-se</Register>
            </ContainerText>
          </Header>
          <ContainerImage>
            <Image source={collaborateImg} />
          </ContainerImage>
          <Table>
            <HeaderTable>
              <Title>
                Bem-vindo,
                {'\n'}
              </Title>
              <SubTitle>Faça o login para continuar!</SubTitle>
            </HeaderTable>
            <FormTable>
              <Form />
            </FormTable>
            <ContainerTextForgot onPress={() => {
              navigate.navigate('ForgoutPassword');
            }}
            >
              <Register>Esqueci minha senha</Register>
            </ContainerTextForgot>
          </Table>
        </Container>
      </Content>
    </LinearGradient>
    </>
  );
};

export default SignIn;
