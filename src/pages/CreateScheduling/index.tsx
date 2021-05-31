/* eslint-disable no-use-before-define */

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, Image, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import api from '../../services/api';

import logoImg from '../../assets/Logo/group_2.png';

import {
  Content,
  Container,
  Header,
  BackButton,
  LogoImage,
  SpecialistListContainer,
  SpecialistList,
  SpecialistContainer,
  SpecialistAvatar,
  SpecialistName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Hour,
  HourText,
  CreateSchedulingButton,
} from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

export interface Specialists {
  crm: string;
  name: string;
  avatar: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateScheduling: React.FC = ({ route }) => {
  const { medicalRecordId, medicalRecordRole } = route.params;
  const { user } = useAuth();
  const navigation = useNavigation();

  const [specialists, setSpecialists] = useState<Specialists[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => {
    api.get('/users/specialits').then((response) => {
      setSpecialists(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/scheduling/${selectedSpecialist}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedSpecialist]);

  const navigateBack = useCallback(() => {
    navigation.navigate('ScreeningStatus');
  }, [navigation]);

  const handleSelecteSpecialist = useCallback((specialistCrm: string) => {
    setSelectedSpecialist(specialistCrm);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectHour = useCallback(
    (hour: number) => {
      setSelectedHour(hour);
    },
    [setSelectedHour],
  );

  const handleCreateScheduling = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      if (medicalRecordRole === 'CLIENT') {
        await api.post(`scheduling/${selectedSpecialist}/client`, {
          userId: user.id,
          date,
          medicalRecordsId: medicalRecordId,
        });
      } else if (medicalRecordRole === 'FRIEND') {
        await api.post(`scheduling/${selectedSpecialist}/friend`, {
          userId: user.id,
          date,
          medicalRecordsId: medicalRecordId,
        });
      }

      navigation.navigate('SchedulingCreated', { date: date.getTime() });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [
    selectedDate,
    selectedHour,
    medicalRecordRole,
    navigation,
    selectedSpecialist,
    user.id,
    medicalRecordId,
  ]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12 && hour < 18)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const nightAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 18)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Container
        height={Dimensions.get('window').height}
        width={Dimensions.get('window').width}
      >
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#fa7592" />
          </BackButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>

        <Content>
          <SpecialistListContainer>
            <SpecialistList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={specialists}
              keyExtractor={(specialist) => specialist.crm}
              renderItem={({ item: specialist }) => (
                <SpecialistContainer
                  onPress={() => handleSelecteSpecialist(specialist.crm)}
                  selected={specialist.crm === selectedSpecialist}
                >
                  <SpecialistAvatar
                    source={{
                      uri:
                        specialist.avatar ||
                        `https://ui-avatars.com/api/?name=${specialist.name.replace(
                          ' ',
                          '%20',
                        )}&background=fa7592&color=fff&size=128`,
                    }}
                  />
                  <SpecialistName
                    selected={specialist.crm === selectedSpecialist}
                  >
                    {specialist.name}
                  </SpecialistName>
                </SpecialistContainer>
              )}
            />
          </SpecialistListContainer>

          <Calendar>
            <Title>Escolha a data</Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                Selecionar outra data
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                onChange={handleDateChanged}
                value={selectedDate}
              />
            )}
          </Calendar>

          <Schedule>
            <Title>Escolha o horário</Title>

            <Section>
              {morningAvailability.length > 0 ? (
                <>
                  <SectionTitle>Manhã</SectionTitle>

                  <SectionContent>
                    {morningAvailability.map(
                      ({ hourFormatted, hour, available }) => (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ),
                    )}
                  </SectionContent>
                </>
              ) : null}
            </Section>

            <Section>
              {afternoonAvailability.length > 0 ? (
                <>
                  <SectionTitle>Tarde</SectionTitle>

                  <SectionContent>
                    {afternoonAvailability.map(
                      ({ hourFormatted, hour, available }) => (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ),
                    )}
                  </SectionContent>
                </>
              ) : null}
            </Section>

            <Section>
              {nightAvailability.length > 0 ? (
                <>
                  <SectionTitle>Noite</SectionTitle>

                  <SectionContent>
                    {nightAvailability.map(
                      ({ hourFormatted, hour, available }) => (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ),
                    )}
                  </SectionContent>
                </>
              ) : null}
            </Section>
          </Schedule>
          <CreateSchedulingButton>
            <Button onPress={handleCreateScheduling}>Agendar</Button>
          </CreateSchedulingButton>
        </Content>
      </Container>
    </>
  );
};

export default CreateScheduling;
