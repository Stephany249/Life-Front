/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, Image, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  getDate,
  getHours,
  getMonth,
  getYear,
  parseISO,
  subHours,
  getMinutes,
} from 'date-fns';
import { useAuth } from '../../hooks/auth';
import FriendImg from '../../assets/Dashboard/Friend/7.png';
import ClientImg from '../../assets/Dashboard/Client/13.png';

import theme from '../../assets/styles/theme';
import logoImg from '../../assets/Logo/group_2.png';
import api from '../../services/api';

import {
  Content,
  AlignScheduling,
  AlingButton,
  BoxScheduling,
  ButtonHelpFriend,
  ButtonHelpMe,
  Calendar,
  Clock,
  ContainerImage,
  Container,
  DateScheduling,
  Edit,
  HeaderTable,
  Table,
  TextHelp,
  TextMoreScheduling,
  Title,
  TitleNotScheduling,
  Header,
  LogoImage,
  MenuButton,
  TextMoreSchedulingButton,
  NameScheduling,
  TopBoxScheduling,
  BottomBoxScheduling,
  ButtonStartNow,
  TextStartNow,
  Clipboard,
  HourScheduling,
  ClipboardScheduling,
  CalendarView,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  TableClient,
} from './styles';
import ReturnTriagePacient from '../ReturnTriagePacient';

interface SchedulingClientItem {
  Profissional: string;
  id: number;
  crmSpecialist: string;
  date: string;
  userId: string;
  medicalRecordsId: number;
  role: string;
}

interface SchedulingSpecialistItem {
  scheduling: {
    id: number;
    crmSpecialist: string;
    date: string;
    userId: string;
    medicalRecordsId: number;
    role: string;
  };
  name: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const navigateMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);
  const [schedulingClient, setSchedulingClient] = useState<
    SchedulingClientItem[]
  >([]);
  const [schedulingSpecialist, setSchedulingSpecialist] = useState<
    SchedulingSpecialistItem[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  let dateFormatClient = 'Hoje';
  let hourClient = '';

  const dateFormatSpecialist: React.ReactNode[] = [];
  const hourSpecialist: React.ReactNode[] = [];

  const compareDate = new Date(Date.now());

  const usernName: React.ReactNode[] = [];

  const handleScheduleClient = useCallback(async () => {
    await api.get(`/scheduling/client/${user.id}`).then((response) => {
      setSchedulingClient(response.data);
    });
  }, [user.id]);

  useEffect(() => {
    handleScheduleClient();
  }, [handleScheduleClient]);

  const handleScheduleSpecialist = useCallback(async () => {
    await api
      .get(
        `/scheduling/specialist/${
          user.crm
        }?day=${selectedDate.getDate()}&month=${
          selectedDate.getMonth() + 1
        }&year=${selectedDate.getFullYear()}`,
      )
      .then((response) => {
        setSchedulingSpecialist(response.data);
      });
  }, [selectedDate, user.crm]);

  useEffect(() => {
    handleScheduleSpecialist();
  }, [handleScheduleSpecialist]);

  if (schedulingClient.length > 0) {
    const date = parseISO(schedulingClient[0].date);
    const day = getDate(date);
    const month = getMonth(date) + 1;
    const year = getYear(date);
    const hours = getHours(date);
    const parseMonth = String(month).padStart(2, '0');
    const parseDay = String(day).padStart(2, '0');
    const parseHour = String(hours).padStart(2, '0');

    const dayCompare = getDate(compareDate);
    const monthCompare = getMonth(compareDate) + 1;
    const yearCompare = getYear(compareDate);
    const parseMonthCompare = String(monthCompare).padStart(2, '0');
    const parseDayCompare = String(dayCompare).padStart(2, '0');

    if (
      year === yearCompare &&
      parseMonth === parseMonthCompare &&
      parseDay === parseDayCompare
    ) {
      dateFormatClient = 'Hoje';
    } else {
      dateFormatClient = `${parseDay}/${parseMonth}/${year}`;
    }

    hourClient = `${parseHour}:00`;
  }

  if (schedulingSpecialist.length > 0) {
    const date = parseISO(schedulingSpecialist[0].scheduling.date);
    const day = getDate(date);
    const month = getMonth(date) + 1;
    const year = date.getFullYear();
    const hours = getHours(date);
    const minutes = getMinutes(date);
    const parseMonth = String(month).padStart(2, '0');
    const parseDay = String(day).padStart(2, '0');
    const parseHour = String(hours).padStart(2, '0');
    const parseMinutes = String(minutes).padStart(2, '0');

    const dayCompare = getDate(compareDate);
    const monthCompare = getMonth(compareDate) + 1;
    const yearCompare = compareDate.getFullYear();
    const parseMonthCompare = String(monthCompare).padStart(2, '0');
    const parseDayCompare = String(dayCompare).padStart(2, '0');

    if (
      year === yearCompare &&
      parseMonth === parseMonthCompare &&
      parseDay === parseDayCompare
    ) {
      dateFormatSpecialist.push('Hoje');
    } else {
      dateFormatSpecialist.push(`${parseDay}/${parseMonth}/${year}`);
    }

    hourSpecialist.push(`${parseHour}:${parseMinutes}`);

    const arrayName = schedulingSpecialist[0].name.split(' ');

    const name = `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;

    usernName.push(name);
  }

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

  console.log(
    getYear(selectedDate) <= getYear(compareDate),
    getMonth(compareDate) <= getMonth(selectedDate),
  );
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <LinearGradient
        colors={[theme.duck_egg_blue, theme.cloudy_blue]}
        locations={[0, 0.5]}
        style={{ flex: 1 }}
      >
        <Header>
          <MenuButton onPress={navigateMenu}>
            <Icon name="menu" size={24} color="#fa7592" />
          </MenuButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>
        <Container>
          {user.role === 'CLIENT' ? (
            <Content>
              <TableClient
                height={Dimensions.get('window').height}
                width={Dimensions.get('window').width}
              >
                <HeaderTable>
                  <Title>Meus agendamentos</Title>
                </HeaderTable>
                <AlignScheduling>
                  <BoxScheduling>
                    {schedulingClient.length === 0 ? (
                      <TitleNotScheduling>
                        Você não possui nenhum agendamento
                      </TitleNotScheduling>
                    ) : (
                      <>
                        <TopBoxScheduling>
                          <NameScheduling>
                            {schedulingClient[0].Profissional}
                          </NameScheduling>
                          {subHours(parseISO(schedulingClient[0].date), 2) <=
                          compareDate ? (
                            parseInt(hourClient) === getHours(compareDate) ? (
                              <ButtonStartNow onPress={() => {}}>
                                <TextStartNow>Começar agora</TextStartNow>
                              </ButtonStartNow>
                            ) : null
                          ) : (
                            <Edit onPress={() => {}}>
                              <Icon name="edit" size={16} color="#fa7592" />
                            </Edit>
                          )}
                        </TopBoxScheduling>

                        <BottomBoxScheduling>
                          <Calendar>
                            <Icon name="calendar" size={16} color="#fa7592" />
                            <DateScheduling>{dateFormatClient}</DateScheduling>
                          </Calendar>
                          <Clock>
                            <Icon name="clock" size={16} color="#fa7592" />
                            <DateScheduling>{hourClient}</DateScheduling>
                          </Clock>
                        </BottomBoxScheduling>
                      </>
                    )}
                  </BoxScheduling>
                </AlignScheduling>
                <TextMoreSchedulingButton onPress={() => {}}>
                  <TextMoreScheduling>ver mais</TextMoreScheduling>
                </TextMoreSchedulingButton>
                <AlingButton>
                  <ButtonHelpFriend onPress={() => {
                      navigation.navigate('FirstTriage', {help:'friend'});

                  }}>
                    <ContainerImage>
                      <Image source={FriendImg} />
                    </ContainerImage>
                    <TextHelp>Quero ajudar {'\n'}um amigo</TextHelp>
                  </ButtonHelpFriend>

                  <ButtonHelpMe
                    onPress={() => {
                      navigation.navigate('FirstTriage', {help:'client'});
                    }}
                  >
                    <ContainerImage>
                      <Image source={ClientImg} />
                    </ContainerImage>
                    <TextHelp>Quero uma {'\n'}ajuda</TextHelp>
                  </ButtonHelpMe>
                </AlingButton>
              </TableClient>
            </Content>
          ) : (
            <>
              <CalendarView>
                <Title>
                  Data escolhida:{' '}
                  {`${String(getDate(selectedDate)).padStart(2, '0')}/${String(
                    getMonth(selectedDate) + 1,
                  ).padStart(2, '0')}/${getYear(selectedDate)}`}
                </Title>
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
              </CalendarView>
              <Table
                height={Dimensions.get('window').height}
                width={Dimensions.get('window').width}
              >
                <HeaderTable>
                  <Title>Agendamentos</Title>
                </HeaderTable>
                <AlignScheduling>
                  {schedulingSpecialist.length === 0 ? (
                    <BoxScheduling>
                      <TitleNotScheduling>
                        Você não possui nenhum atendimento ;)
                      </TitleNotScheduling>
                    </BoxScheduling>
                  ) : (
                    <BoxScheduling>
                      <TopBoxScheduling>
                        <NameScheduling>{usernName[0]}</NameScheduling>
                        {subHours(
                          parseISO(schedulingSpecialist[0].scheduling.date),
                          2,
                        ) <= compareDate ? (
                          getHours(
                            parseISO(schedulingSpecialist[0].scheduling.date),
                          ) === getHours(compareDate) ? (
                            <ButtonStartNow onPress={() => {}}>
                              <TextStartNow>Começar agora</TextStartNow>
                            </ButtonStartNow>
                          ) : null
                        ) : (
                          <Edit onPress={() => {}}>
                            <Icon name="edit" size={16} color="#fa7592" />
                          </Edit>
                        )}
                      </TopBoxScheduling>

                      <BottomBoxScheduling>
                        <Calendar>
                          <Icon name="calendar" size={16} color="#fa7592" />
                          <DateScheduling>
                            {dateFormatSpecialist[0]}
                          </DateScheduling>
                        </Calendar>
                        <Clock>
                          <Icon name="clock" size={16} color="#fa7592" />
                          <HourScheduling>{hourSpecialist[0]}</HourScheduling>
                        </Clock>
                        <Clipboard onPress={() => {navigation.navigate('ReturnTriagePacient', {scheduling: schedulingSpecialist[0]})}}>
                          <Icon name="clipboard" size={16} color="#fa7592" />
                          <ClipboardScheduling>Triagem</ClipboardScheduling>
                        </Clipboard>
                      </BottomBoxScheduling>
                    </BoxScheduling>
                  )}
                </AlignScheduling>
                {getDate(compareDate) <= getDate(selectedDate) ? (
                  <TextMoreSchedulingButton onPress={() => {}}>
                    <TextMoreScheduling>ver mais</TextMoreScheduling>
                  </TextMoreSchedulingButton>
                ) : getYear(selectedDate) <= getYear(compareDate) &&
                  getMonth(compareDate) < getMonth(selectedDate) &&
                  getDate(compareDate) > getDate(selectedDate) ? (
                  <TextMoreSchedulingButton onPress={() => {}}>
                    <TextMoreScheduling>ver mais</TextMoreScheduling>
                  </TextMoreSchedulingButton>
                ) : null}
              </Table>
            </>
          )}
        </Container>
      </LinearGradient>
    </>
  );
};

export default Dashboard;
