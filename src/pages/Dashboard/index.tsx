import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { Image, Text, StatusBar } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import FriendImg from '../../assets/Dashboard/Friend/7.png';
import ClientImg from '../../assets/Dashboard/Client/13.png';

import {LinearGradient} from 'expo-linear-gradient';
import theme from '../../assets/styles/theme';
import logoImg from '../../assets/Logo/group_2.png';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import { DrawerActions, useNavigation } from '@react-navigation/native';
        
import { AlignScheduling, AlingButton, BoxScheduling, ButtonHelpFriend, ButtonHelpMe, Calendar, Clock, ContainerImage, Content, DateScheduling, Edit, HeaderTable, Table, TextHelp, TextMoreScheduling, Title, TitleNotScheduling, Header, LogoImage, MenuButton  } from './styles';

interface AvailabilityItem {
  specialist: {
    crm: string;
    
  };
  available: boolean;
}

const Dashboard: React.FC = () => {
const { user } = useAuth();
const navigation = useNavigation();
const navigateMenu = useCallback(() => {
  navigation.dispatch(DrawerActions.openDrawer())
}, []);
const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
const day = getDate(newDate);
const month = getMonth(newDate);
const year = getYear(newDate);
const parseMonth = String(month).padStart(2, '0');
const parseDay = String(day).padStart(2, '0');
const dateEua = year + '-' + parseMonth + '-' +  parseDay;

useEffect(() => {
  api
    .get(`/scheduling/client/${user.id}`)
    .then((response) => {
      setAvailability(response.data);
    });
}, []);

console.log(availability)
console.log('user', user);

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor='#fff' translucent />

    <LinearGradient
      colors={[theme.duck_egg_blue, theme.cloudy_blue]}
      locations={[0, 0.5]}
      style={{flex:1}}
    >
      <Header>
        <MenuButton onPress={navigateMenu}>
          <Icon name="menu" size={24} color="#fa7592" />
        </MenuButton>
        <LogoImage>
          <Image source={logoImg} />
        </LogoImage>
      </Header>
      <Content>
        { user.role === 'CLIENT' ? 
          <Table>
            <HeaderTable>
              <Title>Meus agendamentos</Title>
            </HeaderTable>
            <AlignScheduling>
              <BoxScheduling>
                {availability.length === 0 ? 
                  <TitleNotScheduling>Você não possui nenhum agendamento ;)</TitleNotScheduling> 
                :
                <>
                <Title>{availability[0].Profissional}</Title>
                <Calendar>
                  <Icon name="calendar" size={16} color="#fa7592" />
                </Calendar>
                <DateScheduling>{availability.dateEua}</DateScheduling>
                <Clock>
                  <Icon name="clock" size={16} color="#fa7592" />
                </Clock>
                <Edit>
                  <Icon name="edit" size={16} color="#fa7592" />
                </Edit>
                </>
                }
              </BoxScheduling>
            </AlignScheduling>
            <TextMoreScheduling>ver mais</TextMoreScheduling>
            <AlingButton>
              <ButtonHelpFriend>
               <ContainerImage>
                 <Image source={FriendImg} />
               </ContainerImage>
               <TextHelp>Quero ajudar {'\n'}um amigo</TextHelp>
             </ButtonHelpFriend>
              <ButtonHelpMe>
                <ContainerImage>
                 <Image source={ClientImg} />
                </ContainerImage>
                <TextHelp>Quero uma {'\n'}ajuda</TextHelp>
              </ButtonHelpMe>
            </AlingButton>
          </Table>
         : (null)}
     </Content>
    </LinearGradient>
    </>
  );
}

export default Dashboard;
function getDate(newDate: any) {
  throw new Error('Function not implemented.');
}

function newDate(newDate: any) {
  throw new Error('Function not implemented.');
}

function getMonth(newDate: (newDate: any) => void) {
  throw new Error('Function not implemented.');
}

function getYear(newDate: (newDate: any) => void) {
  throw new Error('Function not implemented.');
}

