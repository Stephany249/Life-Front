import React from 'react';
import { Text } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import { Content } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Content>
      <Button onPress={() => signOut()}>Sair</Button>
    </Content>
  );
}

export default Dashboard;
