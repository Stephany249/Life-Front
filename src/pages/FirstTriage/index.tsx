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

const FirstTriage: React.FC = () => {
  const navigation = useNavigation();
  const navigateBack = useCallback(() => {
    navigation.navigate('Dashboard');
  }, [navigation]);

  const [triageClient, setTriageClient] = useState<QuestionAndAnswer[]>([
    {
      answers: [],
      question: '',
    },
  ]);

  const questionsAndAnswers = useCallback(async () => {
    api
      .get('questions/answers/client')
      .then((response) => setTriageClient(response.data));
  }, [navigation, triageClient]);

  useEffect(() => {
    questionsAndAnswers();
  }, [questionsAndAnswers]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Content>
        <Header>
          <MenuButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#fa7592" />
          </MenuButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>
        <Container>
          <ContainerImage>
            <Image source={triageImg} />
          </ContainerImage>

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
                navigation.navigate('TriageClient', {
                  triageClient,
                });
              }}
            >
              Próximo
            </Button>
          </AlignButton>
        </Container>
      </Content>
    </>
  );
};

export default FirstTriage;
