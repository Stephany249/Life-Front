import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import TextField from '../../../components/Input';
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SelectButton, TextAnswers, TextQuestion } from '../styles';

import Button from '../../../components/Button';
import { useAuth } from   '../../../hooks/auth';
import { Text } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import SignUp from '..';


const Form: React.FC = () => {
  const { register, setValue, handleSubmit } = useForm();

  const { signIn } = useAuth();
  //Fazer integração com a API
  const onSubmit = async (data: { name: string; cpf: string; email: string; birthday: string; password: string; passwordConfirmation: string; crm: string; }) => {
    try{
      console.log(data.name, data.cpf, data.email, data.birthday, data.password, data.passwordConfirmation, data.crm)
      await SignUp({
        name: data.name,
        password: data.password,
      });
    }catch(err){
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro, cheque os dados',
      );
    }
  }

  const [checked, setChecked] = React.useState('CLIENT');

  return (
    <View>
      <TextField
        label={'Nome'}
        placeholder={'Digite seu nome'}
        onChangeText={(text: any) => setValue('name', text)}
      />
      <TextField
        label={'CPF'}
        placeholder={'Digite seu CPF'}
        onChangeText={(text: any) => setValue('cpf', text)}
      />
      <TextField
        label={'E-mail'}
        placeholder={'Digite seu e-mail'}
        onChangeText={(text: any) => setValue('email', text)}
      />
       <TextField
        label={'Data de aniversário'}
        placeholder={'Digite sua data de aniversário'}
        onChangeText={(text: any) => setValue('birthday', text)}
      />
      <TextField
        label={'Senha'}
        placeholder={'Digite sua senha'}
        onChangeText={(text: any) => setValue('password', text)}
        secureTextEntry={true}
      />
      <TextField
        label={'Confirmar senha'}
        placeholder={'Confirme sua senha'}
        onChangeText={(text: any) => setValue('passwordConfirmation', text)}
        secureTextEntry={true}
      />
      <TextQuestion>
        Você é um profissional e quer ajudar voluntariamente?
      </TextQuestion>
      <SelectButton>
        <RadioButton
          value='CLIENT'
          color='pink'
          status={ checked === 'CLIENT' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('CLIENT')}
        />
        <TextAnswers>Não</TextAnswers>
        <RadioButton
          value='SPECIALIST'
          color='pink'
          status={ checked === 'SPECIALIST' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('SPECIALIST')}
        />
        <TextAnswers>Sim</TextAnswers>
      </SelectButton>
      {checked === 'SPECIALIST' ?
          <TextField
            label={'CRM'}
            placeholder={'Digite seu CRM'}
            onChangeText={(text: any) => setValue('crm', text)}
          />
      : null}
      <Button
        onPress={
          handleSubmit(onSubmit)
        }
      >
        Cadastrar-se
      </Button>
    </View>
  )
}

export default Form;
