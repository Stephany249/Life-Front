import styled from 'styled-components/native';

interface Heightable {
  height: number;
}

export const Keyboard = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContainerImage = styled.View`
  flex: 1;
  margin-top: 24;
`;

export const LogoImage = styled.View`
  height: 31;
  width: 87.9;
  justify-content: center;
  align-items: center;
  margin-right: 50;
  flex: 0.65;
`;

export const Table = styled.View<Heightable>`
  flex: 1;
  height: 260;
  width: 100%;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
  margin-top: ${(props) => (props.height > 726 ? 130 : 0)};
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

export const BackButton = styled.TouchableOpacity``;

export const Header = styled.View`
  padding-top: 32;
  flex-direction: row;
  padding-left: 16;
`;
