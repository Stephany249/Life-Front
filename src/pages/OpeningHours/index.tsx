/* eslint-disable no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';

import logoImg from '../../assets/Logo/group_2.png';

import {
  Container,
  Header,
  BackButton,
  LogoImage,
  Title,
  DaysOfWeek,
  Day,
  DayText,
  ContainerButton,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface DaysOfWeekWork {
  weekdayId: number;
  from: string;
  to: string;
  Weekday: {
    name: string;
  };
}

const OpeningHours: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigation();

  const [daysWorking, setDaysWorking] = useState<DaysOfWeekWork[]>([]);

  const navigateBack = useCallback(() => {
    navigate.navigate('Dashboard');
  }, [navigate]);

  useEffect(() => {
    api.get(`working/${user.crm}`).then((response) => {
      setDaysWorking(response.data);
    });
  }, [user.crm, daysWorking]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#fa7592" />
          </BackButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>
        <Title>Dias/horários de atendimento</Title>
        <DaysOfWeek>
          {daysWorking.map((dayWorking) => (
            <Day key={dayWorking.weekdayId}>
              <DayText>
                {dayWorking.Weekday.name} ({dayWorking.from} - {dayWorking.to})
              </DayText>
            </Day>
          ))}
        </DaysOfWeek>

        <ContainerButton>
          <Button
            onPress={() => {
              navigate.navigate('EditOpeningHours');
            }}
          >
            Editar
          </Button>
        </ContainerButton>
      </Container>
    </>
  );
};

export default OpeningHours;
