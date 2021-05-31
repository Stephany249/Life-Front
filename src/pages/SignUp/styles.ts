import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  background: #fff;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height: 26;
  font-family: 'Lato_700Bold';
  margin-left: 24;
  margin-right: 24;
  color: #2cc7cf;
`;

export const Content = styled.ScrollView``;

export const BackButton = styled.TouchableOpacity``;

export const Header = styled.View`
  margin-left: 15;
  margin-right: 24;
  padding-top: 40;
  flex-direction: row;
  padding-left: 16;
`;

export const LogoImage = styled.View`
  height: 31;
  width: 87.9;
  justify-content: center;
  align-items: center;
  margin-left: 70;
  flex: 0.65;
`;

export const SubTitle = styled.Text`
  padding-bottom: 16;
  font-size: 16;
  line-height: 20;
  font-family: 'Lato_700Bold';
  color: #b4b5b6;
  margin-left: 24;
  margin-right: 24;
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
