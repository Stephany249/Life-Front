/* eslint-disable no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, Image, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';

import triageImg from '../../assets/FirstTriage/Triage.png';
import logoImg from '../../assets/Logo/group_2.png';

import { useAuth } from '../../hooks/auth';
import TextField from '../../components/Input';
import Button from '../../components/Button';

import {
  Content,
  Header,
  MenuButton,
  LogoImage,
  Container,
  ContainerImage,
  AlignText,
  Title,
  SubTitle,
  AlignButton,
  AlignInput,
} from './styles';

type FormData = {
  url: string;
};

const schema = Yup.object().shape({
  url: Yup.string().required('Url é obrigatório'),
});

const StartScheduling: React.FC = ({ route }) => {
  const { id } = route.params.scheduling;
  const { user } = useAuth();

  const navigation = useNavigation();
  const navigateBack = useCallback(() => {
    navigation.navigate(route.params.screen);
  }, [navigation, route.params.screen]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleInsertUrlSchedule = async (data: {
    url: string;
  }): Promise<any> => {
    let response: any;
    try {
      response = await api.patch(
        `/scheduling/specialist/${user.crm}/schedule/${id}/url/`,
        {
          url: data.url,
        },
      );
      navigation.navigate(route.params.screen);
    } catch (err) {
      Alert.alert('Erro no cadastro', `${err.response.data.message}`);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <Content>
        <Header>
          <MenuButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#fa7592" />
          </MenuButton>
          <LogoImage>
            <Image source={logoImg} />
          </LogoImage>
        </Header>
        <Container>
          <ContainerImage>
            <Image source={triageImg} />
          </ContainerImage>
          <AlignText>
            <Title>Iniciar agendamento</Title>

            <SubTitle>
              Seu próximo passo será informar a url para que possa acontecer a
              consulta ;)
            </SubTitle>
          </AlignText>

          <AlignInput>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="URL do agendamento"
                  onBlur={onBlur}
                  error={errors?.url}
                  onChangeText={(value: any) => onChange(value)}
                  value={value}
                  autoCapitalize="none"
                />
              )}
              name="url"
              rules={{ required: true }}
              defaultValue=""
            />
          </AlignInput>

          <AlignButton>
            <Button onPress={handleSubmit(handleInsertUrlSchedule)}>
              Enviar
            </Button>
          </AlignButton>
        </Container>
      </Content>
    </>
  );
};

export default StartScheduling;
