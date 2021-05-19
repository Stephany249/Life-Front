import React, { useCallback } from 'react';
import { Image, StatusBar } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';


import {LinearGradient} from 'expo-linear-gradient';
import theme from '../../assets/styles/theme';
import logoImg from '../../assets/Logo/group_2.png';
import Icon from 'react-native-vector-icons/Feather';

import { Content, HeaderTable, Table, Title, Header, LogoImage, MenuButton } from './styles';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const navigateMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, []);

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
        { user.role === 'SPECIALIST' ?
          <Table>
            <HeaderTable>
              <Title>Meus agendamentos{'\n'}</Title>
            </HeaderTable>
          </Table>

         : (null)}


     </Content>
    </LinearGradient>
    </>
  );
}

export default Dashboard;
