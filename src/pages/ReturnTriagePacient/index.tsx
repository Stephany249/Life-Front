/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import { RadioButton, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, Alert, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';

import logoImg from '../../assets/Logo/group_2.png';

import {
  Container,
  Content,
  Header,
  LogoImage,
  MenuButton,
  Question,
  Text,
  TextAnswers,
} from './styles';

interface QuestionAndAnswer {
  question: string;
  answers: [Answer];
}

interface Answer {
  id: number;
  answer: string;
}

const TriageClient: React.FC = ({route}) => {
  const {role, medicalRecordsId} = route.params.scheduling.scheduling;
  const { user } = useAuth();
  const navigate = useNavigation();

  const [scheduling, setScheduling] = useState<
    QuestionAndAnswer[]
  >([]);

  const navigateBack = useCallback(() => {
    navigate.navigate('FirstTriage');
  }, [navigate]);
  
  const order = useCallback(async () => {
    if(role === 'CLIENT'){
       api.get(`medical-record/client/${medicalRecordsId}`).then((response) => {
        setScheduling(response.data);
      })
    } else if(role === 'FRIEND'){
       api.get(`medical-record/friend/${medicalRecordsId}`).then((response) => {
        setScheduling(response.data);
      })
    }
  }, [medicalRecordsId, role]);

  const [loading, setLoading] = useState(true);

  const question6 = scheduling.answer6.split(',');
  const question9 = scheduling.answer9.split(',');

  useEffect(() => {
    order();
    if (!scheduling || scheduling.length < 10){
      setLoading(true);
    }else{
      setLoading(false);
    }
  }, [order, scheduling]);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator size="large" color="#fa7592" />
    </View>
  ) : (
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
          <Header>
             <Text>Segue abaixo a triagem realizada pelo paciente:</Text>
          </Header>
          <Question>
            Você tem se sentido desanimado, deprimido, ou desesperançado desde o mês passado?
          </Question>
          <TextAnswers>
            {scheduling[0].answers}
          </TextAnswers>
          <Question>
            Você está preocupado pela falta de interesse ou prazer em fazer as coisas?
          </Question>
          <TextAnswers>
            {scheduling[1].answers}
          </TextAnswers>
          <Question>
            Você tem ataques súbitos ou inesperados de ansiedade ou nervosismo?
          </Question>
          <TextAnswers>
            {scheduling[2].answers}
          </TextAnswers>
          <Question>
            Você se sente tenso, preocupado ou estressado com frequência?
          </Question>
          <TextAnswers>
            {scheduling[3].answers}
          </TextAnswers>
          <Question>
            Você tem atravessado algum período significativamente estressante nos últimos 6 meses?
          </Question>
          <TextAnswers>
            {scheduling[4].answers}
          </TextAnswers>
          <Question>
            Você enfrentou em sua história algum evento potencialmente ameaçador à sua vida tais como:
          </Question>
          <TextAnswers>
            {scheduling[5].answers}
          </TextAnswers>
          <Question>
            Com que frequência você consome bebidas alcoólicas?
          </Question>
          <TextAnswers>
            {scheduling[6].answers}
          </TextAnswers>
          <Question>
            Nos dias em que você bebe, quantos drinks você toma em média?
          </Question>
          <TextAnswers>
            {scheduling[7].answers}
          </TextAnswers>
          <Question>
            Você consome medicamentos/drogas em excesso para:
          </Question>
          <TextAnswers>
            {scheduling[8].answers}
          </TextAnswers>
          <Question>
            Nos dias em que você usa medicamentos ou drogas pelas razões anteriores, que quantidades você costuma usar?
          </Question>
          <TextAnswers>
            {scheduling[9].answers}
          </TextAnswers>

      </Container>
    </Content>
  );
};

export default TriageClient;
