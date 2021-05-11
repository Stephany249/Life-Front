import React from 'react';
import { Text } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import { Content, HeaderTable, Table, Title, } from './styles';

import {LinearGradient} from 'expo-linear-gradient';
import theme from '../../assets/styles/theme';

const Dashboard: React.FC = () => {
const { signOut, user } = useAuth();

  return (
    <LinearGradient
      colors={[theme.duck_egg_blue, theme.cloudy_blue]}
      locations={[0, 0.5]}
      style={{flex:1}}
    >
      <Content>
       <Button onPress={() => signOut()}>Sair</Button>

        { user.role === 'SPECIALIST' ? 
          <Table>
            <HeaderTable>
              <Title>Meus agendamentos{'\n'}</Title>
            </HeaderTable>
          </Table>
      
         : (null)}


     </Content>
    </LinearGradient>
  );
}

export default Dashboard;
