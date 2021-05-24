/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, TextInput, TextError, ClickIcon } from './styles';

const TextField: React.FC<any> = ({ error, icon, label, ...inputProps }) => {
  const [passwordShown, setPasswordShown] = useState(true);
  const [iconPasswordShow, setIconPasswordShow] = useState(icon);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
    if (passwordShown === true) {
      setIconPasswordShow('eye');
    } else {
      setIconPasswordShow(icon);
    }
  };

  return (
    <>
      <Text>{label}</Text>
      <Container isErrored={!!error}>
        {iconPasswordShow === 'eye-off' || iconPasswordShow === 'eye' ? (
          <TextInput {...inputProps} secureTextEntry={passwordShown} />
        ) : (
          <TextInput {...inputProps} />
        )}

        {!!error && <TextError>{error.message}</TextError>}
        {iconPasswordShow === 'eye-off' || iconPasswordShow === 'eye' ? (
          <ClickIcon onPress={togglePasswordVisiblity}>
            <Icon name={iconPasswordShow} size={24} color="#fa7592" />
          </ClickIcon>
        ) : (
          <Icon name={iconPasswordShow} size={24} color="#fa7592" />
        )}
      </Container>
    </>
  );
};

export default TextField;
