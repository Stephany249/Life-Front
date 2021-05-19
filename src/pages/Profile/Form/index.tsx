import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import {getDate, getMonth, getYear, parseISO} from 'date-fns';
import { Alert } from 'react-native';
import * as Yup from 'yup';

import Button from '../../../components/Button';
import TextField from '../../../components/Input';
import TextInputMaskComponent from '../../../components/InputMask';

import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';

import * as ImagePicker from 'expo-image-picker';

import {User, UserAvatar, ChangePhoto, ChangePhotoText} from './styles';


type FormData = {
  name: string;
  cpf:string;
  email: string;
  birthday: string;
  oldPassword: string;
  newPassword: string;
  crm: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().min(11, 'No mínimo 11 dígitos').required(),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  birthday: Yup.string().required('Data de nascimento é obrigatória'),
  oldPassword: Yup.string(),
  newPassword: Yup.string().when('oldPassword', {
    is: (val: string | any[]) => !!val.length,
    then: Yup.string().required('Nova senha é obrigatória'),
    otherwise: Yup.string()
  })
});


const Form: React.FC = () => {
  const { user, specialist,  updateUser } = useAuth();
  const [image, setImage] = useState('');
  const [nameImage, setnNameImage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const name = user.name;

  const newData = parseISO(user.birthday);
  const day = getDate(newData);
  const month = getMonth(newData) + 1;
  const year = getYear(newData);
  const parseMonth = String(month).padStart(2, '0');
  const parseDay = String(day).padStart(2, '0');

  const birthday = parseDay + '/' + parseMonth + '/' + year;


  const navigation  = useNavigation();
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  console.log(user);

  const handleUpdateAvatar = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();


      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const arrayImage = result.uri.split('/');
        const nameImage = arrayImage[arrayImage.length - 1];
        console.log('Nome imagem', nameImage, result.uri);

        setnNameImage(nameImage)
        setImage(result.uri);
      }

      console.log(image, nameImage);

      if(image !== '' && nameImage !== '') {
        const data = new FormData();

        user.append('file', {
          type: 'image/jpeg',
          name: `${nameImage}`,
          uri: image,
        });

        console.log('Foto data', data);

        api.patch(`/users/avatar/${user.id}`, data).then((apiResponse) => {
          updateUser(apiResponse.data);
        });
      }else {
        Alert.alert('Erro ao atualizar sua foto de perfil');

      }

      if (status !== 'granted') {
        Alert.alert('Precisamos de permissões de rolo da câmera para fazer isso funcionar!');
      }
    }

  }, [user.id, updateUser]);

  const handleProfile = useCallback(
    async (data: FormData) => {
      try {
        console.log(data);
        await schema.validate(data, {
          abortEarly: false,
        });

        const splitData = data.birthday.split('/');
        const newDate = new Date(parseInt(splitData[2]), parseInt(splitData[1]), parseInt(splitData[0]));

        const day = getDate(newDate);
        const month = getMonth(newDate);
        const year = getYear(newDate);

        const parseMonth = String(month).padStart(2, '0');
        const parseDay = String(day).padStart(2, '0');

        const dateEua = year + '-' + parseMonth + '-' +  parseDay;

        const formData = {
          name: data.name,
          email: data.email,
          birthday: dateEua,
          ...(data.oldPassword
            ? {
                oldPassword: data.oldPassword,
                password: data.newPassword,
              }
            : {}),
        };

        console.log(formData);

        const response = await api.put(`/users/profile/${user.id}`, formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

      } catch (err) {
        Alert.alert(
          'Erro na atualização do perfil',
          `${err.response.data.message}`,
        );
      }
    },
    [updateUser],
  );

  useEffect(() => {
    register('name')
    register('cpf')
    register('email')
    register('birthday')
    register('oldPassword')
    register('newPassword')
    register('crm')
  },[register])

  return (
    <View>
      <User>
        <UserAvatar
          source={{
            uri:
              user.avatar ||
              `https://ui-avatars.com/api/?name=${name.replace(' ', '%20')}&background=fa7592&color=fff&size=128`,
          }}
        />
        <ChangePhoto onPress={handleUpdateAvatar}>
          <ChangePhotoText>Alterar foto</ChangePhotoText>
        </ChangePhoto>
      </User>
       <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'Nome'}
            onBlur={onBlur}
            error={errors?.name}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon={'edit-2'}
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue={user.name}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMaskComponent
            label={'CPF'}
            type='cpf'
            onBlur={onBlur}
            error={errors?.cpf}
            value={value}
            keyboardType="numeric"
            editable={false}
          />

        )}
        name="cpf"
        rules={{ required: true }}
        defaultValue={user.cpf}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'E-mail'}
            autoCapitalize="none"
            onBlur={onBlur}
            error={errors?.email}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon={'edit-2'}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue={user.email}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMaskComponent
            label={'Data de aniversário'}
            type="datetime"
            onBlur={onBlur}
            error={errors?.birthday}
            keyboardType="numeric"
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon={'edit-2'}
          />
        )}
        name="birthday"
        rules={{ required: true }}
        defaultValue={birthday}
      />
      {user.role === 'SPECIALIST' ?
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label={'CRM'}
              onBlur={onBlur}
              error={errors?.crm}
              onChangeText={(value: any) => onChange(value)}
              value={value}
              editable={false}
            />
          )}
          name="crm"
          rules={{ required: true }}
          defaultValue={specialist.crm}
        />
      : null}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'Senha atual'}
            onBlur={onBlur}
            error={errors?.oldPassword}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon={'eye-off'}
          />
        )}
        name="oldPassword"
        rules={{ required: true }}
        defaultValue={oldPassword}
      />
       <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={'Nova Senha'}
            onBlur={onBlur}
            error={errors?.newPassword}
            onChangeText={(value: any) => onChange(value)}
            value={value}
            icon={'eye-off'}
          />
        )}
        name="newPassword"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        onPress={
          handleSubmit(handleProfile)
        }
      >
        Salvar
      </Button>
    </View>
  )
}

export default Form;
