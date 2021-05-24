/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import Button from '../../../components/Button';
import TextField from '../../../components/Input';

type FormData = {
  email: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
});

const Form: React.FC = () => {
  const navigation = useNavigation();

  const handleForgoutPassword = async (data: {
    email: string;
  }): Promise<any> => {
    try {
      await api.post('users/forgot', data);
      Alert.alert('E-mail enviado', 'Envio do e-mail ocorreu com sucesso');
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro no envio do e-mail',
        'Ocorreu um erro ao enviar o e-mail, tente novamente',
      );
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('email');
  }, [register]);

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="E-mail"
            onBlur={onBlur}
            error={errors?.email}
            onChangeText={(value: any) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button onPress={handleSubmit(handleForgoutPassword)}>
        Enviar e-mail
      </Button>
    </View>
  );
};

export default Form;
