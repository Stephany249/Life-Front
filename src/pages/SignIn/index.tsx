import React from 'react';
import { Image} from 'react-native';

import collaborateImg from '../../assets/SignIn/collaborate.png';

import { Container, ContainerText, Register, ContainerImage, Table, HeaderTable, Title, SubTitle } from './styles';
//import { useNavigation } from '@react-navigation/native';
//import Input from '../../components/Input';

const SignIn: React.FC = () => {
  return (
      <Container>
      <ContainerText onPress={() => {
        console.log('Levar para a tela de cadastro');
      }}>
        <Register>Cadastrar-se</Register>
      </ContainerText>
      <ContainerImage>
        <Image source={collaborateImg} />
      </ContainerImage>
      <Table>
        <HeaderTable>
          <Title>Bem-vindo,{'\n'}</Title>
          <SubTitle>Faça o login para continuar!</SubTitle>
        </HeaderTable>

      </Table>
    </Container>
  );
}

export default SignIn;
