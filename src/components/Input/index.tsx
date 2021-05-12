import React from 'react';
import { Text } from 'react-native';

import { Container, TextInput, TextError } from './styles';

const TextField:React.FC<any> = ({ error, label, ...inputProps }) => (
  <>
    <Text>{label}</Text>
    <Container isErrored={!!error}>
      <TextInput
        {...inputProps}
      />
      {!!error && <TextError>{error.message}</TextError>}
    </Container>
  </>
)

export default TextField
