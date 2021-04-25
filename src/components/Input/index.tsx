import React from 'react';
import { Text} from 'react-native';

import { Container, TextInput } from './styles';

const TextField:React.FC<any> = ({ label, placeholder, ...inputProps }) => (
  <>
    <Text>{label}</Text>
    <Container>
      <TextInput
        {...inputProps}
      />
    </Container>
  </>
)

export default TextField
