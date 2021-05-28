/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import { RadioButton, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

const TriageClient: React.FC = ({ route }) => {
  const { triageClient } = route.params;
  const { user } = useAuth();
  const navigate = useNavigation();

  const navigateBack = useCallback(() => {
    navigate.navigate('FirstTriage');
  }, [navigate]);

  const [triageClients, setTriageClients] = useState<QuestionAndAnswer[]>(
    triageClient,
  );

  const [questionsResponse, setQuestionsResponse] = useState<QuestionsResponse>(
    {
      question1: -1,
      question2: -1,
      question3: -1,
      question4: -1,
      question5: -1,
      question6: [26],
      question7: 30,
      question8: null,
      question9: [40],
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
    console.log(answers.join());

    const number = answers.join();

    return number;
  };

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

      response = await api.post(`medical-record/client/${user.id}`, answer);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        <Question>{triageClients[0].question}</Question>
        {triageClients[0].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question1 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question1', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[1].question}</Question>
        {triageClients[1].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question2 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question2', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[2].question}</Question>
        {triageClients[2].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question3 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question3', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[3].question}</Question>
        {triageClients[3].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question4 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question4', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[4].question}</Question>
        {triageClients[4].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question5 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question5', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[5].question}</Question>
        {triageClients[5].answers.map((answer) => (
          <SelectButton>
            <Checkbox
              color="pink"
              status={
                questionsResponse.question6.includes(answer.id)
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseCheckbox('question6', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        <Question>{triageClients[6].question}</Question>
        {triageClients[6].answers.map((answer) => (
          <SelectButton>
            <RadioButton
              value={`${answer.id}`}
              color="pink"
              status={
                questionsResponse.question7 === answer.id
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseRadio('question7', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        {questionsResponse.question7 !== 30 ? (
          <>
            <Question>{triageClients[7].question}</Question>
            {triageClients[7].answers.map((answer) => (
              <SelectButton>
                <RadioButton
                  value={`${answer.id}`}
                  color="pink"
                  status={
                    questionsResponse.question8 === answer.id
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => setResponseRadio('question8', answer.id)}
                />
                <TextAnswers>{answer.answer}</TextAnswers>
              </SelectButton>
            ))}
          </>
        ) : null}

        <Question>{triageClients[8].question}</Question>
        {triageClients[8].answers.map((answer) => (
          <SelectButton>
            <Checkbox
              color="pink"
              status={
                questionsResponse.question9.includes(answer.id)
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => setResponseCheckbox('question9', answer.id)}
            />
            <TextAnswers>{answer.answer}</TextAnswers>
          </SelectButton>
        ))}

        {!questionsResponse.question9.includes(40) ? (
          <>
            <Question>{triageClients[9].question}</Question>
            {triageClients[9].answers.map((answer) => (
              <SelectButton>
                <RadioButton
                  value={`${answer.id}`}
                  color="pink"
                  status={
                    questionsResponse.question10 === answer.id
                      ? 'checked'
                      : 'unchecked'
                  }
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

export default TriageClient;
