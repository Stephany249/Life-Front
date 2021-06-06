import styled from 'styled-components/native';

interface HeightAndWidth {
  height: number;
  width: number;
}

export const Content = styled.ScrollView``;

export const Container = styled.View<HeightAndWidth>`
  flex: 1;
  background: #fff;
  width: ${(props) => (props.width ? props.width : 400)};
`;

export const Header = styled.View`
  margin-top: 40;
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

export const HeaderTable = styled.View<HeightAndWidth>`
  padding: 16px;
  background: #fff;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  flex-direction: column;
  margin-left: ${(props) => (props.height > 726 ? 24 : 0)};
`;

export const Title = styled.Text`
  font-size: 20;
  line-height: 26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

