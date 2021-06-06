/* eslint-disable no-nested-ternary */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import logoImg from '../../assets/Logo/group_2.png';

import {
  Container,
  Content,
  Header,
  LogoImage,
  MenuButton,
  Question,
  QuestionAndAnswer,
  Text,
  TextAnswers,
} from './styles';

const ReturnTriagePacient: React.FC = ({route}) => {
  const {role, medicalRecordsId} = route.params.scheduling.scheduling;
  const { user } = useAuth();
  const navigate = useNavigation();

  const [scheduling, setScheduling] = useState([
    [{
      question: '',
      answer: [{
        answer: ''
      }
      ],
    }]
  ]);

  const navigateBack = useCallback(() => {
    navigate.navigate('Dashboard');
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
             <Text>Segue abaixo a triagem realizada pelo  paciente:</Text>
          </Header>
          {scheduling.map((returnTriage, i) => {
            return (
              <QuestionAndAnswer>
                <Question>{i + 1}. {returnTriage[0].question}</Question>
                {returnTriage[0].answer && returnTriage[0].answer.length >= 1  ? returnTriage[0].answer.map(answer => (
                  <TextAnswers>Resposta: {answer.answer}</TextAnswers>
                )) : null}
              </QuestionAndAnswer>
              )
            })}
      </Container>
    </Content>
  );
};

export default ReturnTriagePacient;
