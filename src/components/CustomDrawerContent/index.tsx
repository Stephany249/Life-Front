import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  NameUser,
  Body,
  Footer,
  HeaderBody,
  UserAvatar,
  User
} from './styles';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const {navigation} = props;
  const { signOut, user } = useAuth();
  const nameArray = user.name.split(' ');

  console.log(user.name);
  return (
    <Container>
      <Body>
        <HeaderBody>
          <User>
            <UserAvatar
              source={{
                uri:
                user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.name.replace(' ', '%20')}&background=fa7592&color=fff&size=128`,
                width: 72,
                height: 72
                }}
            />
            <NameUser>{nameArray[0]} {'\n'} {nameArray[nameArray.length - 1]}</NameUser>
          </User>
        </HeaderBody>
          <DrawerItem
          icon={() => (
            <IconFontAwesome
              name="user"
              color="#fa7592"
              size={24}
            />
          )}
          label="Perfil"
          onPress={() => {navigation.navigate('Profile')}}
        />
        {user.role == 'SPECIALIST' ?
          <DrawerItem
          icon={() => (
            <IconFontAwesome
              name="clock-o"
              color="#fa7592"
              size={24}
            />
          )}
          label="Horários de atendimento"
          onPress={() => {console.log('Colocar o redirect para a página de horarios')}}
        />
        :null}
      </Body>
      <Footer>
        <DrawerItem
          icon={() => (
            <Icon
              name="log-out"
              color="#fa7592"
              size={24}
            />
          )}
          label="Sair"
          onPress={() => signOut()}
        />
      </Footer>
    </Container>
  );
};

export default DrawerContent;
