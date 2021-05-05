import React, { useCallback } from 'react';
import { Text } from 'react-native';

import { Content, Container, Title, SubTitle, HeaderTable, BackButton, Header } from './styles';

import theme from '../../assets/styles/theme';
import Form from './Form';
import { RadioButton } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
const { goBack, navigate } = useNavigation();
const navigateBack = useCallback(() => {
  goBack();
}, [goBack]);

  return (
    <Content>
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#fa7592" />
          </BackButton>
        </Header>
          <HeaderTable>
           <Title>Que bom ter você por aqui! {'\n'}</Title>
           <SubTitle>Cadastre-se e inicie essa jornada conosco ;)</SubTitle>
           <Form/>
          </HeaderTable>
      </Container>
    </Content>
  );
}

export default SignUp;
