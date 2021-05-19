import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import TextField from '../../../components/Input';
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native';

import Button from '../../../components/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';

type FormData = {
  email: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório')
});

const Form: React.FC = () => {
  const navigation  = useNavigation();

  const handleForgoutPassword = async (data: {email: string}) => {
    try {
      await api.post('users/forgot', data);
      Alert.alert(
        'E-mail enviado',
        'Envio do e-mail ocorreu com sucesso',
      );
      navigation.goBack();
    }catch(err){
      Alert.alert(
        'Erro no envio do e-mail',
        'Ocorreu um erro ao enviar o e-mail, tente novamente',
      );
    }
  }

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    register('email')
  },[register])

  return (
    <View >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'E-mail'}
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
      <Button
        onPress={
          handleSubmit(handleForgoutPassword)
        }
      >
        Enviar e-mail
      </Button>
    </View>
  )
}

export default Form;
