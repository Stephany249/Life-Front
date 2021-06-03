/* eslint-disable no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, Image, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  format,
  getDate,
  getHours,
  getMonth,
  getYear,
  parseISO,
} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';

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
  SubTitle,
  CancelScheduling,
  CancelSchedulingText,
} from './styles';

export interface Specialists {
  crm: string;
  name: string;
  avatar: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const EditSchedule: React.FC = ({ route }) => {
  const { crmSpecialist, date, id } = route.params.scheduling;
  const { user } = useAuth();
  const navigation = useNavigation();

  const dateFormat = parseISO(date);

  const [specialists, setSpecialists] = useState<Specialists[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(crmSpecialist);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(dateFormat));
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(getHours(dateFormat));

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
    navigation.navigate('Dashboard');
  }, [navigation]);

  const handleSelecteSpecialist = useCallback((specialistCrm: string) => {
    setSelectedSpecialist(specialistCrm);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, data: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (data) {
        setSelectedDate(data);
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

  const handleEditScheduling = useCallback(async () => {
    try {
      const dateSelected = new Date(selectedDate);

      dateSelected.setHours(selectedHour);
      dateSelected.setMinutes(0);

      if (user.role === 'CLIENT') {
        await api.put(
          `scheduling/${id}/client/${user.id}/specialist/${selectedSpecialist}`,
          {
            date: dateSelected,
          },
        );
      } else if (user.role === 'SPECIALIST') {
        await api.put(`scheduling/${id}/specialist/${selectedSpecialist}/`, {
          date: dateSelected,
        });
      }

      navigation.navigate('SchedulingCreated', {
        date: dateSelected.getTime(),
        status: 'alterado',
      });
    } catch (err) {
      Alert.alert(
        'Erro ao editar o agendamento',
        'Ocorreu um erro ao tentar editar o agendamento, tente novamente',
      );
    }
  }, [
    id,
    navigation,
    selectedDate,
    selectedHour,
    selectedSpecialist,
    user.id,
    user.role,
  ]);

  const handleCancelScheduling = useCallback(async () => {
    let response: any;
    try {
      const dateSelected = new Date(selectedDate);

      dateSelected.setHours(selectedHour);
      dateSelected.setMinutes(0);

      if (user.role === 'CLIENT') {
        response = await api.delete(`scheduling/${id}/client/${user.id}`);
      } else if (user.role === 'SPECIALIST') {
        response = await api.delete(
          `scheduling/${id}/specialist/${selectedSpecialist}/`,
        );
      }

      navigation.navigate('SchedulingCreated', {
        date: dateSelected.getTime(),
        status: 'cancelado',
      });
    } catch (err) {
      if (!err.response.data.message) {
        Alert.alert(
          'Erro ao cancelar o agendamento',
          'Ocorreu um erro ao tentar cancelar o agendamento, tente novamente',
        );
      } else {
        Alert.alert(
          'Erro ao cancelar o agendamento',
          `${err.response.data.message}`,
        );
      }
    }
  }, [
    id,
    navigation,
    selectedDate,
    selectedHour,
    selectedSpecialist,
    user.id,
    user.role,
  ]);

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
          {user.role === 'CLIENT' ? (
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
          ) : null}
          <Calendar>
            <Title>Escolha a data</Title>
            <SubTitle>
              Data escolhida:{' '}
              {`${String(getDate(selectedDate)).padStart(2, '0')}/${String(
                getMonth(selectedDate) + 1,
              ).padStart(2, '0')}/${getYear(selectedDate)}`}
            </SubTitle>

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
          <CancelScheduling
            height={Dimensions.get('window').height}
            width={Dimensions.get('window').width}
            onPress={handleCancelScheduling}
          >
            <CancelSchedulingText>Cancelar agendamento</CancelSchedulingText>
          </CancelScheduling>
          <CreateSchedulingButton>
            <Button onPress={handleEditScheduling}>Agendar</Button>
          </CreateSchedulingButton>
        </Content>
      </Container>
    </>
  );
};

export default EditSchedule;
