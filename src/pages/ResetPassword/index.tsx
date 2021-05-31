/* eslint-disable no-use-before-define */
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Platform, StatusBar } from 'react-native';

import theme from '../../assets/styles/theme';
import collaborateImg from '../../assets/SignIn/collaborate.png';
import logoImg from '../../assets/Logo/group_2.png';

import Form from './Form';

import {
  Keyboard,
  Content,
  Container,
  ContainerImage,
  Table,
  HeaderTable,
  Title,
  SubTitle,
  FormTable,
  BackButton,
  Header,
  LogoImage,
} from './styles';

const ResetPassword: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.duck_egg_blue}
        translucent
      />

      <LinearGradient
        colors={[theme.duck_egg_blue, theme.cloudy_blue]}
        locations={[0, 0.5]}
        style={{ flex: 1 }}
      >
        <Keyboard
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <Content keyboardShouldPersistTaps="handled">
            <Container>
              <Header>
                <BackButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Icon name="chevron-left" size={24} color="#fa7592" />
                </BackButton>
                <LogoImage>
                  <Image source={logoImg} />
                </LogoImage>
              </Header>
              <ContainerImage>
                <Image source={collaborateImg} />
              </ContainerImage>
              <Table height={Dimensions.get('window').height}>
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
};

export default ResetPassword;
