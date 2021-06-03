/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StatusBar,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/Logo/group_2.png';
import triageImg from '../../assets/FirstTriage/Triage.png';

import {
  ButtonOptions,
  Buttons,
  Container,
  ContainerImage,
  Content,
  Header,
  HeaderTable,
  LogoImage,
  TextOptions,
  TextOptionsCVV,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

const ScreeningStatus: React.FC = ({ route }) => {
  const { user } = useAuth();
  const { medicalRecordId, medicalRecordRole, status } = route.params.details;

  const [availability, setAvailability] = useState(false);

  const navigate = useNavigation();

  const specialistAvailability = async (): Promise<void> => {
    const specialists = await api.get('scheduling/specialist-availability');
    if (specialists.data.message === 'Sem profissionais disponíveis') {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
  };

  const handleImmediateService = useCallback(async () => {
    try {
      const response = await api.post('scheduling/immediate', {
        userId: user.id,
        medicalRecordsId: medicalRecordId,
      });

      navigate.navigate('SchedulingCreated', {
        date: response.data.date.getTime(),
      });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [medicalRecordId, navigate, user.id]);

  const handleTurnOnCVV = (): void => {
    Linking.openURL('tel:188');
    navigate.navigate('Dashboard');
  };

  useEffect(() => {
    specialistAvailability();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <Content>
        <Container
          height={Dimensions.get('window').height}
          width={Dimensions.get('window').width}
        >
          <Header>
            <LogoImage>
              <Image source={logoImg} />
            </LogoImage>
          </Header>
          <HeaderTable
            height={Dimensions.get('window').height}
            width={Dimensions.get('window').width}
          >
            <ContainerImage>
              <Image source={triageImg} />
            </ContainerImage>
            <Buttons
              height={Dimensions.get('window').height}
              width={Dimensions.get('window').width}
            >
              {status.map((option: string) => {
                if (option === 'Atendimento imediato') {
                  if (availability === true) {
                    return (
                      <ButtonOptions disabled={availability}>
                        <TextOptions>{option}</TextOptions>
                      </ButtonOptions>
                    );
                  }
                  return (
                    <ButtonOptions
                      onPress={() => {
                        handleImmediateService();
                      }}
                      disabled={false}
                    >
                      <TextOptions>{option}</TextOptions>
                    </ButtonOptions>
                  );
                }
                if (option === 'CVV') {
                  return (
                    <ButtonOptions
                      onPress={() => handleTurnOnCVV()}
                      disabled={false}
                    >
                      <TextOptionsCVV>Ligar para o {option}</TextOptionsCVV>
                    </ButtonOptions>
                  );
                }
                if (option === 'Agendar um atendimento') {
                  return (
                    <ButtonOptions
                      disabled={false}
                      onPress={() => {
                        navigate.navigate('CreateScheduling', {
                          medicalRecordId,
                          medicalRecordRole,
                        });
                      }}
                    >
                      <TextOptions>{option}</TextOptions>
                    </ButtonOptions>
                  );
                }
              })}
            </Buttons>
          </HeaderTable>
        </Container>
      </Content>
    </>
  );
};

export default ScreeningStatus;
