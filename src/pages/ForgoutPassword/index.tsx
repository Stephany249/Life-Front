import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, Platform, ScrollView, StatusBar, View } from 'react-native';

import theme from '../../assets/styles/theme';
import collaborateImg from '../../assets/SignIn/collaborate.png';

import Form from './Form';

import { Keyboard, Content, Container, ContainerImage, Table, HeaderTable, Title, SubTitle, FormTable, BackButton, Header } from './styles';

const ForgoutPassword: React.FC = () => {
  const navigation  = useNavigation();

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={theme.duck_egg_blue} translucent />

    <LinearGradient
      colors={[theme.duck_egg_blue, theme.cloudy_blue]}
      locations={[0, 0.5]}
      style={{flex:1}}
    >
      <Keyboard
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Content keyboardShouldPersistTaps="handled">
          <Container>
          <Header>
            <BackButton onPress={() => {navigation.goBack()}}>
              <Icon name="chevron-left" size={24} color="#fa7592" />
            </BackButton>
            <ContainerImage>
              <Image source={collaborateImg} />
            </ContainerImage>
          </Header>
          <Table>
            <HeaderTable>
              <Title>Esqueceu sua senha?{'\n'}</Title>
              <SubTitle>Não esquenta vamos dar um jeito nisso.</SubTitle>
            </HeaderTable>
            <FormTable>
              <Form />
            </FormTable>
          </Table>
        </Container>
        </Content>
      </Keyboard>
    </LinearGradient>
    </>
  );
}

export default ForgoutPassword;
