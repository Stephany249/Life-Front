import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import TextField from '../../../components/Input';
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native';

import Button from '../../../components/Button';
import { useAuth } from   '../../../hooks/auth';

const Form: React.FC = () => {
  const { register, setValue, handleSubmit } = useForm();

  const { signIn } = useAuth();

  const onSubmit = async (data: { email: string; password: string; }) => {
    try{
      console.log(data.email, data.password)
      await signIn({
        email: data.email,
        password: data.password,
      });
    }catch(err){
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }

  useEffect(() =>{
    register('email')
    register('password')
  }, [register])

  return (
    <View >
      <TextField
        label={'E-mail'}
        placeholder={'Digite seu email'}
        onChangeText={(text: any) => setValue('email', text)}
      />
      <TextField
        label={'Senha'}
        placeholder={'Digite sua senha'}
        onChangeText={(text: any) => setValue('password', text)}
        secureTextEntry={true}
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
