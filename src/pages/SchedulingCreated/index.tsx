/* eslint-disable no-use-before-define */
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import { Container, Title, Description, OKButton } from './styles';

interface RouteParams {
  date: number;
  status: string;
}

const SchedulingCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "eeee', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams]);

  return (
    <Container>
      <Icon name="check" size={80} color="#b9b9d9" />

      <Title>Agendamento {routeParams.status}</Title>
      <Description>{formattedDate}</Description>

      <OKButton>
        <Button onPress={handleOkPressed}>OK</Button>
      </OKButton>
    </Container>
  );
};

export default SchedulingCreated;
