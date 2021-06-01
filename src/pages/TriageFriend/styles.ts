import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding-bottom: 24;
  padding-top: 16;
`;

export const Header = styled.View`
  background-color: #ffff;
  height: 47.9;
  margin-top: 20;
  flex-direction: row;
`;

export const MenuButton = styled.TouchableOpacity`
  margin-top: 15;
  margin-left: 16;
  margin-right: 100;
`;

export const LogoImage = styled.View`
  margin-top: 10;
  height: 31;
  width: 87.9;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.ScrollView``;

export const Question = styled.Text`
  font-size: 20;
  line-height: 26;
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
  line-height: 20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;
