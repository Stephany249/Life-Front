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
  password: string;
};

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
});

const Form: React.FC = () => {
  const navigation  = useNavigation();

  const handleResetPassword = async (data: {password: string}) => {
    try {
      await api.post('users/reset', data);
      Alert.alert(
        'Senha recuperada com sucesso',
        'Senha recuperada com sucesso',
      );
      navigation.goBack();
    }catch(err){
      Alert.alert(
        'Erro ao recuperar a senha',
        'Ocorreu um erro ao recuperar a senha, tente novamente',
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
            label={'Nova senha'}
            onBlur={onBlur}
            error={errors?.password}
            onChangeText={(value: any) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        onPress={
          handleSubmit(handleResetPassword)
        }
      >
        Enviar e-mail
      </Button>
    </View>
  )
}

export default Form;
