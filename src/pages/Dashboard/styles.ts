import styled from 'styled-components/native';

export const  Header = styled.View`
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


export const Content = styled.View`
  flex:1;
`;

export const Table = styled.View`
  flex:3;
  height: 300;
  width: 360;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
  margin-top: 349;
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
  color: #090b0d;
`;

