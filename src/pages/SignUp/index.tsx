/* eslint-disable no-use-before-define */
import React, { useCallback } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Image, StatusBar } from 'react-native';
import {
  Content,
  Container,
  Title,
  SubTitle,
  HeaderTable,
  BackButton,
  Header,
  LogoImage,
} from './styles';

import Form from './Form';
import logoImg from '../../assets/Logo/group_2.png';

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Content>
        <Container>
          <Header>
            <BackButton onPress={navigateBack}>
              <Icon name="chevron-left" size={24} color="#fa7592" />
            </BackButton>
            <LogoImage>
              <Image source={logoImg} />
            </LogoImage>
          </Header>
          <HeaderTable>
            <Title>Que bom ter você por aqui! {'\n'}</Title>
            <SubTitle>Cadastre-se e inicie essa jornada conosco ;)</SubTitle>
            <Form />
          </HeaderTable>
        </Container>
      </Content>
    </>
  );
};

export default SignUp;
