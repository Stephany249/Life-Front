/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import { RadioButton, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';

import logoImg from '../../assets/Logo/group_2.png';

import {
  AlignButton,
  AlignQuestions,
  Container,
  Content,
  Header,
  LogoImage,
  MenuButton,
  Question,
  SelectButton,
  TextAnswers,
} from './styles';

interface QuestionAndAnswer {
  question: string;
  answers: [Answer];
}

interface Answer {
  id: number;
  answer: string;
  score: number;
}
interface QuestionsResponse {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: [number];
  question7: number;
  question8: number | null;
  question9: [number];
  question10: number | null;
}

const TriageFriend: React.FC = ({ route }) => {
  const { user } = useAuth();
  const navigate = useNavigation();

  const navigateBack = useCallback(() => {
    navigate.navigate('FirstTriage');
  }, [navigate]);

  const [triageFriend, setTriageFriend] = useState<QuestionAndAnswer[]>([
    {
      answers: [],
      question: '',
    },
  ]);


  const [loading, setLoading] = useState(true);


  const [questionsResponse, setQuestionsResponse] = useState<QuestionsResponse>(
    {
      question1: -1,
      question2: -1,
      question3: -1,
      question4: -1,
      question5: -1,
      question6: [71],
      question7: 75,
      question8: null,
      question9: [85],
      question10: null,
    },
  );

  const setResponseRadio = (questionID: any, value: number): void => {
    setQuestionsResponse({
      ...questionsResponse,
      [questionID]: value,
    });
  };

  const setResponseCheckbox = (questionID: any, value: number): void => {
    if (questionsResponse[questionID].includes(value)) {
      const newValue = questionsResponse[questionID].filter(
        (qValue) => qValue !== value,
      );

      setQuestionsResponse({
        ...questionsResponse,
        [questionID]: newValue,
      });
    } else {
      setQuestionsResponse({
        ...questionsResponse,
        [questionID]: [...questionsResponse[questionID], value],
      });
    }
  };

  const removeLastComma = (answers: [number]): any => {
    const number = answers.join();

    return number;
  };

  const questionsAndAnswers = useCallback(async () => {
    api
      .get('questions/answers/friend')
      .then((response) => setTriageFriend(response.data));
  }, [navigate]);


  useEffect(() => {
    questionsAndAnswers();
    if (!triageFriend || triageFriend.length < 10) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [triageFriend]);

  const handleSubmitTriage = async (): Promise<any> => {
    let response: any;
    try {
      const question6 = removeLastComma(questionsResponse.question6);
      const question9 = removeLastComma(questionsResponse.question9);

      const answer = {
        question1: questionsResponse.question1,
        question2: questionsResponse.question2,
        question3: questionsResponse.question3,
        question4: questionsResponse.question4,
        question5: questionsResponse.question5,
        question6: question6.concat(','),
        question7: questionsResponse.question7,
        question8: questionsResponse.question8,
        question9: question9.concat(','),
        question10: questionsResponse.question10,
      };


      response = await api.post(`medical-record/friend/${user.id}`, answer);

      const details = response.data;

      navigate.navigate('ScreeningStatus', {
        details,
      });
    } catch (err) {
      Alert.alert('Erro ao salvar', err.response.data.message);
    }
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator size="large" color="#fa7592" />
    </View>
  ) : (
    <Content>
      <Header>
        <MenuButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#fa7592" />
        </MenuButton>
        <LogoImage>
          <Image source={logoImg} />
        </LogoImage>
      </Header>
      <Container>
        <Question>{triageFriend[0].question}</Question>
        {triageFriend[0].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question1 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question1', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[1].question}</Question>
        {triageFriend[1].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question2 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question2', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[2].question}</Question>
        {triageFriend[2].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question3 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question3', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[3].question}</Question>
        {triageFriend[3].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question4 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question4', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[4].question}</Question>
        {triageFriend[4].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question5 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question5', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[5].question}</Question>
        {triageFriend[5].answers.map((answer) => (
          <SelectButton>
            <Checkbox
              color="#fa7592"
              status={
                questionsResponse.question6.includes(answer.id)
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseCheckbox('question6', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageFriend[6].question}</Question>
        {triageFriend[6].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="#fa7592"
              status={
                questionsResponse.question7 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseRadio('question7', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        {questionsResponse.question7 !== 75 ? (
          <>
            <Question>{triageFriend[7].question}</Question>
            {triageFriend[7].answers.map((answer) => (
              <SelectButton>
                <RadioButton
                  value={`${answer.id}`}
                  color="#fa7592"
                  status={
                    questionsResponse.question8 === answer.id
                      ? 'checked'
                      : 'unchecked'
                  }
                  uncheckedColor="#fa7592"
                  onPress={() => setResponseRadio('question8', answer.id)}
                />
                <TextAnswers>{answer.answer}</TextAnswers>
              </SelectButton>
            ))}
          </>
        ) : null}

        <Question>{triageFriend[8].question}</Question>
        {triageFriend[8].answers.map((answer) => (
          <SelectButton>
            <Checkbox
              color="#fa7592"
              status={
                questionsResponse.question9.includes(answer.id)
                  ? 'checked'
                  : 'unchecked'
              }
              uncheckedColor="#fa7592"
              onPress={() => setResponseCheckbox('question9', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        {!questionsResponse.question9.includes(85) &&
        questionsResponse.question9.length > 0 ? (
          <>
            <Question>{triageFriend[9].question}</Question>
            {triageFriend[9].answers.map((answer) => (
              <SelectButton>
                <RadioButton
                  value={`${answer.id}`}
                  color="#fa7592"
                  status={
                    questionsResponse.question10 === answer.id
                      ? 'checked'
                      : 'unchecked'
                  }
                  uncheckedColor="#fa7592"
                  onPress={() => setResponseRadio('question10', answer.id)}
                />
                <TextAnswers>{answer.answer}</TextAnswers>
              </SelectButton>
            ))}
          </>
        ) : null}
        <AlignButton>
          <Button onPress={() => handleSubmitTriage()}>Próximo</Button>
        </AlignButton>
      </Container>
    </Content>
  );
};

export default TriageFriend;
