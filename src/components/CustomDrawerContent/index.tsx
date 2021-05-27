/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';

import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Body,
  Footer,
  HeaderBody,
  UserAvatar,
  User,
} from './styles';

const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const { navigation } = props;
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Body>
        <HeaderBody>
          <User>
            {user.avatar ? (
              <UserAvatar
                source={{
                  uri: user.avatar,
                  width: 72,
                  height: 72,
                }}
              />
            ) : (
              <IconFontAwesome name="user-circle-o" color="#fa7592" size={72} />
            )}
          </User>
        </HeaderBody>
        <DrawerItem
          icon={() => <IconFontAwesome name="home" color="#fa7592" size={24} />}
          label="Home"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <DrawerItem
          icon={() => <IconFontAwesome name="user" color="#fa7592" size={24} />}
          label="Perfil"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        {user.role === 'SPECIALIST' ? (
          <DrawerItem
            icon={() => (
              <IconFontAwesome name="clock-o" color="#fa7592" size={24} />
            )}
            label="Horários de atendimento"
            onPress={() => {
              navigation.navigate('OpeningHours');
            }}
          />
        ) : null}
      </Body>
      <Footer>
        <DrawerItem
          icon={() => <Icon name="log-out" color="#fa7592" size={24} />}
          label="Sair"
          onPress={() => signOut()}
        />
      </Footer>
    </Container>
  );
};

export default DrawerContent;
