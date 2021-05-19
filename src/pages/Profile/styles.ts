import styled from 'styled-components/native';

export const Content = styled.ScrollView`
`;

export const Container = styled.View`
  flex: 1;
  background: #FFF;
`;

export const Header = styled.View`
  padding-top: 32;
  flex-direction: row;
  padding-left: 9;
`;

export const BackButton = styled.TouchableOpacity``;

export const LogoImage = styled.View`
  height: 31;
  width: 87.9;
  justify-content: center;
  align-items: center;
  margin-left: 70;
  flex: 0.65;
`;

export const HeaderTable = styled.View`
  padding: 16px;
  background: #fff;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height: 26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;
