/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useCallback } from 'react';
import { Dimensions, Image, Linking, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  parseISO,
  subHours,
} from 'date-fns';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/Logo/group_2.png';

import {
  AlignScheduling,
  BackButton,
  BottomBoxScheduling,
  BoxScheduling,
  ButtonStartNow,
  Calendar,
  Clipboard,
  ClipboardScheduling,
  Clock,
  Container,
  Content,
  DateScheduling,
  Edit,
  Header,
  HourScheduling,
  LogoImage,
  NameScheduling,
  TextStartNow,
  Title,
  TopBoxScheduling,
} from './styles';

const ViewMore: React.FC = ({ route }) => {
  const { scheduling } = route.params;
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.navigate('Dashboard');
  }, [navigation]);

  const compareDate = new Date(Date.now());

  const nameFormat = useCallback((schedule) => {
    let arrayName: any;
    let name: any;
    if (user.role === 'CLIENT') {
      arrayName = schedule.Profissional.split(' ');
    } else {
      arrayName = schedule.name.split(' ');
    }

    if (arrayName.length > 1) {
      name = `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
    } else if (arrayName.length === 1) {
      name = `${arrayName[0]}`;
    }

    return name;
  }, []);

  const dateFormat = useCallback(
    (schedule) => {
      const date = parseISO(schedule.date);
      const day = getDate(date);
      const month = getMonth(date) + 1;
      const year = getYear(date);
      const parseMonth = String(month).padStart(2, '0');
      const parseDay = String(day).padStart(2, '0');

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
        return 'Hoje';
      }
      return `${parseDay}/${parseMonth}/${year}`;
    },
    [compareDate],
  );

  const hourFormat = useCallback((schedule) => {
    const date = parseISO(schedule.date);
    const hours = getHours(date);
    const minutes = getMinutes(date);
    const parseHour = String(hours).padStart(2, '0');
    const parseMinutes = String(minutes).padStart(2, '0');

    return `${parseHour}:${parseMinutes}`;
  }, []);

  const handleGoToSchedule = (urlSchedule: string): void => {
    Linking.openURL(urlSchedule);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <Content>
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

          <Title>Meus agendamentos</Title>
          <AlignScheduling>
            {user.role === 'CLIENT'
              ? scheduling.map((scheduleClient) => (
                  <BoxScheduling>
                    <TopBoxScheduling>
                      <NameScheduling>
                        {nameFormat(scheduleClient)}
                      </NameScheduling>
                      {subHours(parseISO(scheduleClient.date), 2) <=
                      compareDate ? (
                        parseInt(hourFormat(scheduleClient), 10) ===
                          getHours(compareDate) &&
                        scheduleClient.urlSchedule ? (
                          <ButtonStartNow
                            onPress={() => {
                              handleGoToSchedule(scheduleClient.urlSchedule);
                            }}
                          >
                            <TextStartNow>Começar agora</TextStartNow>
                          </ButtonStartNow>
                        ) : null
                      ) : (
                        <Edit
                          onPress={() => {
                            navigation.navigate('EditSchedule', {
                              scheduling: scheduleClient,
                              screen: 'ViewMore',
                            });
                          }}
                        >
                          <Icon name="edit" size={16} color="#fa7592" />
                        </Edit>
                      )}
                    </TopBoxScheduling>

                    <BottomBoxScheduling>
                      <Calendar>
                        <Icon name="calendar" size={16} color="#fa7592" />
                        <DateScheduling>
                          {dateFormat(scheduleClient)}
                        </DateScheduling>
                      </Calendar>
                      <Clock>
                        <Icon name="clock" size={16} color="#fa7592" />
                        <DateScheduling>
                          {hourFormat(scheduleClient)}
                        </DateScheduling>
                      </Clock>
                    </BottomBoxScheduling>
                  </BoxScheduling>
                ))
              : scheduling.map((scheduleSpecialist) => (
                  <BoxScheduling>
                    <TopBoxScheduling>
                      <NameScheduling>
                        {nameFormat(scheduleSpecialist)}
                      </NameScheduling>
                      {subHours(
                        parseISO(scheduleSpecialist.scheduling.date),
                        2,
                      ) <= compareDate ? (
                        getHours(
                          parseISO(scheduleSpecialist.scheduling.date),
                        ) === getHours(compareDate) &&
                        !scheduleSpecialist.scheduling.urlSchedule ? (
                          <ButtonStartNow
                            onPress={() => {
                              navigation.navigate('StartScheduling', {
                                scheduling: scheduleSpecialist.scheduling,
                                screen: 'ViewMore',
                              });
                            }}
                          >
                            <TextStartNow>Começar agora</TextStartNow>
                          </ButtonStartNow>
                        ) : (
                          <ButtonStartNow
                            onPress={() => {
                              handleGoToSchedule(
                                scheduleSpecialist.scheduling.urlSchedule,
                              );
                            }}
                          >
                            <TextStartNow>Começar agora</TextStartNow>
                          </ButtonStartNow>
                        )
                      ) : (
                        <Edit
                          onPress={() => {
                            navigation.navigate('EditSchedule', {
                              scheduling: scheduleSpecialist.scheduling,
                              screen: 'ViewMore',
                            });
                          }}
                        >
                          <Icon name="edit" size={16} color="#fa7592" />
                        </Edit>
                      )}
                    </TopBoxScheduling>

                    <BottomBoxScheduling>
                      <Calendar>
                        <Icon name="calendar" size={16} color="#fa7592" />
                        <DateScheduling>
                          {dateFormat(scheduleSpecialist.scheduling)}
                        </DateScheduling>
                      </Calendar>
                      <Clock>
                        <Icon name="clock" size={16} color="#fa7592" />
                        <HourScheduling>
                          {hourFormat(scheduleSpecialist.scheduling)}
                        </HourScheduling>
                      </Clock>
                      <Clipboard onPress={() => {}}>
                        <Icon name="clipboard" size={16} color="#fa7592" />
                        <ClipboardScheduling>Triagem</ClipboardScheduling>
                      </Clipboard>
                    </BottomBoxScheduling>
                  </BoxScheduling>
                ))}
          </AlignScheduling>
        </Container>
      </Content>
    </>
  );
};

export default ViewMore;
