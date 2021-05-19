import React, { useState } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { TextInputMask } from 'react-native-masked-text';

import { Container, TextError } from './styles';

const TextInputMaskComponent: React.FC<any> = ({ error, icon, label, ...inputProps }) => {
  const [passwordShown, setPasswordShown] = useState(true);
  const [iconPasswordShow, setIconPasswordShow] = useState(icon)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    if(passwordShown === true) {
      setIconPasswordShow('eye');
    }else {
      setIconPasswordShow(icon);
    }
  };

  return(
    <>
      <Text>{label}</Text>
      <Container isErrored={!!error}>
          <TextInputMask style={{flex:1, color: '#000', fontSize:14, fontFamily: 'Lato_700Bold' }}
          {...inputProps}
          />

        {!!error && <TextError>{error.message}</TextError>}
          <Icon name={iconPasswordShow} size={24} color="#fa7592" />


      </Container>
    </>
  );
};

export default TextInputMaskComponent;
