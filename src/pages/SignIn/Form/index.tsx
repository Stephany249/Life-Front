import React, { useEffect } from 'react';
import { View } from 'react-native';
import TextField from '../../../components/Input';
import { Controller, useForm } from 'react-hook-form';

import Button from '../../../components/Button';
import { useAuth } from   '../../../hooks/auth';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';

type FormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

const Form: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    register('email')
    register('password')
  },[register])

  const { signIn } = useAuth();

  const onSubmit = async (data: { email: string; password: string; }) => {
    try{
       await signIn({
        email: data.email,
        password: data.password,
      });
    }catch(err){
      console.log(err);
    }
  }

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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'Senha'}
            onBlur={onBlur}
            error={errors?.password}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        onPress={
          handleSubmit(onSubmit)
        }
      >
        Entrar
      </Button>
    </View>
  )
}

export default Form;
