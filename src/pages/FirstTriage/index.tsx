/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';

import api from '../../services/api';

import triageImg from '../../assets/FirstTriage/Triage.png';
import logoImg from '../../assets/Logo/group_2.png';

import {
  AlignButton,
  AlignText,
  Container,
  ContainerImage,
  Content,
  Header,
  LogoImage,
  MenuButton,
  SubTitle,
  Title,
} from './styles';

interface QuestionAndAnswer {
  question: string;
  answers: [Answer];
}

interface Answer {
  id: number;
  answer: string;
  score: number;
}

const FirstTriage: React.FC = ({route}) => {
  const {help} = route.params;
  const navigation = useNavigation();
  const navigateMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Content>
        <Header>
          <MenuButton onPress={navigateMenu}>
            <Icon name="menu" size={24} color="#fa7592" />
          </MenuButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>
        <Container>
          <ContainerImage>
            <Image source={triageImg} />
          </ContainerImage>
          {help === 'client' ? 
          <>
            <AlignText>
              <Title>Que ótimo que você está buscando uma ajuda!</Title>

              <SubTitle>
                Seu próximo passo será responder umas perguntinhas para que
                possamos lhe ajudar da melhor forma possível ;)
              </SubTitle>
            </AlignText>

            <AlignButton>
            <Button
              onPress={() => {
                navigation.navigate('TriageClient');
              }}
            >
              Próximo
            </Button>
            </AlignButton>
            </>
            :( <><AlignText>
            <Title>Que ótimo que você está buscando uma ajuda para o seu amigo!</Title>

            <SubTitle>
              Seu próximo passo será responder umas perguntinhas para que
              possamos lhe ajudar da melhor forma possível ;)
            </SubTitle>
          </AlignText>
          <AlignButton>
            <Button
              onPress={() => {
                navigation.navigate('TriageFriend');
              }}
            >
              Próximo
            </Button>
          </AlignButton>
          </>)}

        </Container>
      </Content>
    </>
  );
};

export default FirstTriage;
