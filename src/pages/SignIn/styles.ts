import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView``;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 40;
`;

export const LogoImage = styled.View`
  height: 31;
  width: 87.9;
  justify-content: center;
  align-items: center;
  margin-left: 95;
  flex: 0.65;
`;

export const ContainerText = styled.TouchableOpacity`
  margin-bottom: 5;
  justify-content: flex-end;
  align-items: flex-start;
  width: 87.9;
  flex: 0.35;
`;

export const Register = styled.Text`
  font-family: 'Lato_400Regular';
  font-size: 14px;
  color: #fa7592;
  text-decoration: underline;
`;

export const ContainerImage = styled.View`
  flex: 1;
`;

export const Table = styled.View`
  flex: 1;
  height: 440;
  width: 100%;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
`;

export const HeaderTable = styled.View`
  padding-top: 16;
  padding-right: 16;
  padding-left: 16;
  padding-bottom: 16;
  background: #fff;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height: 26;
  font-family: 'Lato_700Bold';
  color: #2cc7cf;
`;

export const SubTitle = styled.Text`
  font-size: 16;
  line-height: 20;
  font-family: 'Lato_700Bold';
  color: #b4b5b6;
`;

export const FormTable = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ContainerTextForgot = styled.TouchableOpacity`
  padding-top: 16;
  justify-content: center;
  align-items: center;
  border-radius: 8;
  margin-top: 8;
`;
