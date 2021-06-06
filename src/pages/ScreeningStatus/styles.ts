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
  margin-left: ${(props) => (props.height > 725 ? 24 : 0)};
`;

export const ContainerImage = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 32;
`;

export const Buttons = styled.View<HeightAndWidth>`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: ${(props) => (props.height > 725 ? 250 : 150)};
`;

export const ButtonOptions = styled.TouchableOpacity`
  height: 64;
  width: 144;
  border-radius: 8;
  background-color: ${(props) =>
    props.disabled === false ? '#7776b6' : '#b9b9d9'};
  margin-right: 16;
`;

export const TextOptions = styled.Text`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_400Regular';
  color: #fff;
  padding-top: 10;
  padding-left: 25;
  padding-bottom: 10;
`;
