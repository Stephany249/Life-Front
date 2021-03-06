/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, Image, Linking, Platform, StatusBar } from 'react-native';
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

interface SchedulingClientItem {
  Profissional: string;
  id: number;
  crmSpecialist: string;
  date: string;
  userId: string;
  medicalRecordsId: number;
  role: string;
  urlSchedule: string;
}

interface SchedulingSpecialistItem {
  scheduling: {
    id: number;
    crmSpecialist: string;
    date: string;
    userId: string;
    medicalRecordsId: number;
    role: string;
    urlSchedule: string;
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
  const specialistName: React.ReactNode[] = [];

  const handleScheduleClient = useCallback(async () => {
    await api.get(`/scheduling/client/${user.id}`).then((response) => {
      setSchedulingClient(response.data);
    });
  }, [user.id]);

  useEffect(() => {
    handleScheduleClient();
  }, [handleScheduleClient, navigation]);

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
  }, [handleScheduleSpecialist, navigation.navigate('Dashboard')]);

  if (schedulingClient.length > 0) {
    const date = parseISO(schedulingClient[0].date);
    const day = getDate(date);
    const month = getMonth(date) + 1;
    const year = getYear(date);
    const hours = getHours(date);
    const minutes = getMinutes(date);
    const parseMonth = String(month).padStart(2, '0');
    const parseDay = String(day).padStart(2, '0');
    const parseHour = String(hours).padStart(2, '0');
    const parseMinutes = String(minutes).padStart(2, '0');

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

    hourClient = `${parseHour}:${parseMinutes}`;


    const arrayName = schedulingClient[0].Profissional.split(' ');

    let name: any;

    if(arrayName.length > 1) {
      name = `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
    }else if(arrayName.length === 1) {
      name = `${arrayName[0]}`;
    }


    specialistName.push(name);
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

    let name: any;

    if(arrayName.length > 1) {
      name = `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
    }else if(arrayName.length === 1) {
      name = `${arrayName[0]}`;
    }


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

  const handleGoToSchedule = (urlSchedule: string): void => {
    Linking.openURL(urlSchedule);
  };

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
                        Voc?? n??o possui nenhum agendamento
                      </TitleNotScheduling>
                    ) : (
                      <>
                        <TopBoxScheduling>
                          <NameScheduling>
                            {specialistName[0]}
                          </NameScheduling>
                          {subHours(parseISO(schedulingClient[0].date), 2) <=
                          compareDate ? (
                            parseInt(hourClient) === getHours(compareDate) && schedulingClient[0].urlSchedule ? (
                              <ButtonStartNow onPress={() => {handleGoToSchedule(schedulingClient[0].urlSchedule)}}>
                                <TextStartNow>Come??ar agora</TextStartNow>
                              </ButtonStartNow>
                            ) : null
                          ) : (
                            <Edit onPress={() => {navigation.navigate('EditSchedule', {scheduling: schedulingClient[0], screen: 'Dashboard'})}}>
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
                <TextMoreSchedulingButton onPress={() => {navigation.navigate('ViewMore', {scheduling: schedulingClient})}}>
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
                        Voc?? n??o possui nenhum atendimento ;)
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
                          ) === getHours(compareDate) ? (schedulingSpecialist[0].scheduling.urlSchedule === null ?
                                <ButtonStartNow onPress={() => {navigation.navigate('StartScheduling', {scheduling: schedulingSpecialist[0].scheduling, screen: 'Dashboard'})}}>
                                  <TextStartNow>Come??ar agora</TextStartNow>
                                </ButtonStartNow>
                              :
                                <ButtonStartNow onPress={() => {handleGoToSchedule(schedulingSpecialist[0].scheduling.urlSchedule)}}>
                                  <TextStartNow>Come??ar agora</TextStartNow>
                                </ButtonStartNow>
                            ) : (null)
                        ) : (
                          <Edit onPress={() => {navigation.navigate('EditSchedule', {scheduling: schedulingSpecialist[0].scheduling, screen: 'Dashboard'})}}>
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
                  <TextMoreSchedulingButton onPress={() => {navigation.navigate('ViewMore', {scheduling: schedulingSpecialist})}}>
                    <TextMoreScheduling>ver mais</TextMoreScheduling>
                  </TextMoreSchedulingButton>
                ) : getYear(selectedDate) <= getYear(compareDate) &&
                  getMonth(compareDate) < getMonth(selectedDate) &&
                  getDate(compareDate) > getDate(selectedDate) ? (
                  <TextMoreSchedulingButton onPress={() => {navigation.navigate('ViewMore', {scheduling: schedulingSpecialist})}}>
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
