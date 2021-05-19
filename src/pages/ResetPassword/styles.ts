import styled from 'styled-components/native';

export const Keyboard = styled.KeyboardAvoidingView`
flex: 1;
`;

export const Content = styled.ScrollView`
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContainerImage = styled.View`
  flex:1;
`;

export const Table = styled.View`
  flex:1;
  height: 290;
  width: 360;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
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
  line-height:26;
  font-family: 'Lato_700Bold';
  color: #2cc7cf;
`;

export const SubTitle = styled.Text`
  font-size: 16;
  line-height:20;
  font-family: 'Lato_700Bold';
  color: #b4b5b6;
`;

export const FormTable = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const Header = styled.View`
  padding-top: 32;
  flex-direction: row;
  padding-left: 16;
`;
