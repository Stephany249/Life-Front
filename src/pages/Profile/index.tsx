/* eslint-disable no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Form from './Form';

import logoImg from '../../assets/Logo/group_2.png';

import {
  Content,
  Container,
  Header,
  BackButton,
  LogoImage,
  HeaderTable,
  Title,
} from './styles';

const Profile: React.FC = () => {
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
            <Title>Perfil</Title>
            <Form />
          </HeaderTable>
        </Container>
      </Content>
    </>
  );
};

export default Profile;
