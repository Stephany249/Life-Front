/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { getDate, getMonth, getYear } from 'date-fns';
import { Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import TextField from '../../../components/Input';
import TextInputMaskComponent from '../../../components/InputMask';

import { SelectButton, TextAnswers, TextQuestion } from './styles';
import api from '../../../services/api';

type FormData = {
  name: string;
  cpf: string;
  email: string;
  birthday: string;
  password: string;
  passwordConfirmation: string;
  crm: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().min(11, 'No mínimo 11 dígitos').required(),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  birthday: Yup.string().required('Data de nascimento é obrigatória'),
  password: Yup.string().required('Senha obrigatória'),
  passwordConfirmation: Yup.string()
    .when('password', {
      is: (val: string | any[]) => !!val.length,
      then: Yup.string().required('Confirmação de senha obrigatória'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password'), null], 'Senha não confere'),
});

const Form: React.FC = () => {
  const navigation = useNavigation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [checked, setChecked] = React.useState('CLIENT');

  const onSubmit = async (data: {
    name: string;
    cpf: string;
    email: string;
    birthday: string;
    password: string;
    passwordConfirmation: string;
    crm: string;
  }): Promise<any> => {
    try {
      let response: any;

      const splitData = data.birthday.split('/');
      const newDate = new Date(
        parseInt(splitData[2], 10),
        parseInt(splitData[1], 10) - 1,
        parseInt(splitData[0], 10),
      );

      const day = getDate(newDate);
      const month = getMonth(newDate);
      const year = getYear(newDate);

      const parseMonth = String(month).padStart(2, '0');
      const parseDay = String(day).padStart(2, '0');

      const dateEua = `${year}-${parseMonth}-${parseDay}`;

      if (checked === 'CLIENT') {
        response = await api.post('users/client', {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          birthday: dateEua.toString(),
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        });
      } else if (data.crm) {
        response = await api.post('users/specialist', {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          birthday: dateEua.toString(),
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          crm: data.crm,
        });
      } else {
        Alert.alert('Campo em branco', `CRM é obrigatório`);
      }

      Alert.alert(`${response.data.message}`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro no cadastro', `${err.response.data.message}`);
    }
  };

  useEffect(() => {
    register('name');
    register('cpf');
    register('email');
    register('birthday');
    register('password');
    register('passwordConfirmation');
    register('crm');
  }, [register]);

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Nome"
            onBlur={onBlur}
            error={errors?.name}
            onChangeText={(value: any) => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMaskComponent
            label="CPF"
            type="cpf"
            onBlur={onBlur}
            error={errors?.cpf}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="cpf"
        rules={{ required: true }}
        defaultValue=""
      />
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMaskComponent
            label="Data de aniversário"
            type="datetime"
            onBlur={onBlur}
            error={errors?.birthday}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="birthday"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Senha"
            onBlur={onBlur}
            error={errors?.password}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon="eye-off"
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Confirmar senha"
            onBlur={onBlur}
            error={errors?.passwordConfirmation}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon="eye-off"
          />
        )}
        name="passwordConfirmation"
        rules={{ required: true }}
        defaultValue=""
      />
      <TextQuestion>
        Você é um profissional e quer ajudar voluntariamente?
      </TextQuestion>
      <SelectButton>
        <RadioButton
          value="CLIENT"
          color="pink"
          status={checked === 'CLIENT' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('CLIENT')}
        />
        <TextAnswers>Não</TextAnswers>
        <RadioButton
          value="SPECIALIST"
          color="pink"
          status={checked === 'SPECIALIST' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('SPECIALIST')}
        />
        <TextAnswers>Sim</TextAnswers>
      </SelectButton>
      {checked === 'SPECIALIST' ? (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="CRM"
              onBlur={onBlur}
              error={errors?.crm}
              onChangeText={(value: any) => onChange(value)}
              value={value}
            />
          )}
          name="crm"
          rules={{ required: true }}
          defaultValue=""
        />
      ) : null}
      <Button onPress={handleSubmit(onSubmit)}>Cadastrar-se</Button>
    </View>
  );
};

export default Form;
