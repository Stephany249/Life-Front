import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #FFF;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height:26;
  font-family: 'Lato_700Bold';
  color: #2cc7cf;
`;

export const Content = styled.ScrollView`
`;

export const BackButton = styled.TouchableOpacity``;

export const Header = styled.View`
  padding-top: 32;
  flex-direction: row;
  padding-left: 16;
`;

export const SubTitle = styled.Text`
  padding-bottom: 16;
  font-size: 16;
  line-height:20;
  font-family: 'Lato_700Bold';
  color: #b4b5b6;
`;

export const TextQuestion = styled.Text`
  padding-top: 16;
  padding-bottom: 8;
  font-size: 16;
  line-height:20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

export const TextAnswers = styled.Text`
  font-size: 16;
  line-height:20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

export const SelectButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 24;
`;

export const HeaderTable = styled.View`
  padding: 16px;
  background: #fff;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  flex-direction: column;
`;

