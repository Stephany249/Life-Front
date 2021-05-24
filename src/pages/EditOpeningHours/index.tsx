/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Image, StatusBar } from 'react-native';
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
  SubTitle,
  HourOfDay,
  Hour,
  HourText,
  ContainerButton,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface DaysOfWeekWork {
  working: [Working];
  day: number;
  from: string;
  to: string;
}

interface Working {
  day: number;
  from: string;
  to: string;
}

const EditOpeningHours: React.FC = () => {
  const { user } = useAuth();

  const [daysWork, setDaysWork] = useState<DaysOfWeekWork>({
    working: [],
    day: 0,
    from: '',
    to: '',
  });

  const navigate = useNavigation();

  const navigateBack = useCallback(() => {
    navigate.navigate('OpeningHours');
  }, [navigate]);

  const days = [
    { id: 1, name: 'Domingo' },
    { id: 2, name: 'Segunda' },
    { id: 3, name: 'Terça' },
    { id: 4, name: 'Quarta' },
    { id: 5, name: 'Quinta' },
    { id: 6, name: 'Sexta' },
    { id: 7, name: 'Sábado' },
  ];

  const hours = [
    { id: 7, name: '07:00' },
    { id: 8, name: '08:00' },
    { id: 9, name: '09:00' },
    { id: 10, name: '10:00' },
    { id: 11, name: '11:00' },
    { id: 12, name: '12:00' },
    { id: 13, name: '13:00' },
    { id: 14, name: '14:00' },
    { id: 15, name: '15:00' },
    { id: 16, name: '16:00' },
    { id: 17, name: '17:00' },
    { id: 18, name: '18:00' },
    { id: 19, name: '19:00' },
    { id: 20, name: '20:00' },
    { id: 21, name: '21:00' },
    { id: 22, name: '22:00' },
    { id: 23, name: '23:00' },
    { id: 0, name: '00:00' },
    { id: 1, name: '01:00' },
    { id: 2, name: '02:00' },
    { id: 3, name: '03:00' },
    { id: 4, name: '04:00' },
    { id: 5, name: '05:00' },
    { id: 6, name: '06:00' },
  ];

  const onSelectValue = (value: string | number, type: string): string => {
    if (daysWork[type as 'day' | 'from' | 'to'] === value) {
      return 'active';
    }

    if (
      type === 'day' &&
      daysWork.working.find((working) => working.day === value)
    ) {
      return 'have-value';
    }

    return 'inactive';
  };

  const handleSelectValue = (
    value: string | number,
    type: string,
  ): boolean | undefined => {
    if (type === 'day') {
      // only dates with hour
      if ((daysWork.day && !daysWork.from) || !daysWork.to) {
        const index = daysWork.working.findIndex(
          (working) => working.day === daysWork.day,
        );
        const copyArray = daysWork.working;

        copyArray.splice(index, 1);

        // change state
        setDaysWork({
          ...daysWork,
          working: copyArray,
        });
      }

      const working = daysWork.working.find((working) => working.day === value);

      if (working) {
        setDaysWork({
          ...daysWork,
          day: working.day,
          from: working.from,
          to: working.to,
        });
      } else {
        setDaysWork({
          ...daysWork,
          working: [
            ...daysWork.working,
            {
              day: parseInt(value.toString(), 10),
              from: '',
              to: '',
            },
          ],
          day: parseInt(value.toString(), 10),
          from: '',
          to: '',
        });
      }
    } else {
      if (!daysWork.day) {
        Alert.alert('Erro', 'Você deve escolher uma data antes do horário!');
        return false;
      }
      if (type === 'to') {
        if (value <= daysWork.from) {
          Alert.alert('Erro', 'Horário de ínicio deve ser maior que de saída!');
          return false;
        }
      }

      const index = daysWork.working.findIndex(
        (working) => working.day === daysWork.day,
      );
      const copyArray = daysWork.working;

      copyArray.splice(index, 1, {
        ...daysWork.working[index],
        [type as 'day' | 'from' | 'to']: value,
      });

      // change state
      setDaysWork({
        ...daysWork,
        working: copyArray,
        [type as 'day' | 'from' | 'to']: value,
      });
    }
  };

  const onSubmit = async (): Promise<any> => {
    try {
      const { working } = daysWork;

      await api.put(`working/${user.crm}/list`, {
        working,
      });

      Alert.alert(
        'Atualização realizada com sucesso',
        `Sucesso na edição dos horários `,
      );

      setDaysWork({
        working: [],
        day: 0,
        from: '',
        to: '',
      });

      navigate.navigate('OpeningHours');
    } catch (err) {
      Alert.alert('Erro no cadastro', `${err.response.data.message}`);
    }
  };

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

        <Title>Escolha os dias da semana que você quer atender</Title>
        <DaysOfWeek horizontal>
          {days.map((day) => (
            <Day
              key={day.id}
              onPress={() => handleSelectValue(day.id, 'day')}
              selected={onSelectValue(day.id, 'day')}
            >
              <DayText selected={onSelectValue(day.id, 'day')}>
                {day.name}
              </DayText>
            </Day>
          ))}
        </DaysOfWeek>
        <Title>Escolha os horários</Title>
        <SubTitle>Começar</SubTitle>
        <HourOfDay horizontal>
          {hours.map((hour) => (
            <Hour
              key={hour.id}
              onPress={() => handleSelectValue(hour.name, 'from')}
              selected={onSelectValue(hour.name, 'from')}
            >
              <HourText selected={onSelectValue(hour.name, 'from')}>
                {hour.name}
              </HourText>
            </Hour>
          ))}
        </HourOfDay>
        <SubTitle>Parar</SubTitle>
        <HourOfDay horizontal>
          {hours.map((hour) => (
            <Hour
              key={hour.id}
              onPress={() => handleSelectValue(hour.name, 'to')}
              selected={onSelectValue(hour.name, 'to')}
            >
              <HourText selected={onSelectValue(hour.name, 'to')}>
                {hour.name}
              </HourText>
            </Hour>
          ))}
        </HourOfDay>
        <ContainerButton>
          <Button onPress={() => onSubmit()}>Salvar</Button>
        </ContainerButton>
      </Container>
    </>
  );
};

export default EditOpeningHours;
