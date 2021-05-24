import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 24;
  padding-top: 72;
`;

export const Content = styled.ScrollView`
`;

export const Question = styled.Text`
  font-size: 20;
  line-height:26;
  padding-left: 24;
  padding-right: 24;
  padding-top: 16;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

export const SelectButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 8;
  padding-left: 16;
`;

export const AlignQuestions = styled.View`
  flex-direction: column;
`;

export const AlignButton = styled.View`
  align-items: center;
  padding-top: 16;
`;

export const TextAnswers = styled.Text`
  font-size: 16;
  line-height:20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

