import styled from 'styled-components/native';

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

export const Title = styled.Text`
  font-size: 20;
  line-height:26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  margin-top: 24;
  margin-left: 24;
  margin-right: 24;
`;

export const DaysOfWeek = styled.View`
  margin-top: 16;
  margin-left: 50;
  height: 100;
`;

export const Day = styled.View`
  height: 40;
  width: 250;
  border-radius: 8;
  align-items: center;
  justify-content: center;
  margin-left: 8;
  background: #b9b9d9;
  margin-bottom: 16;
`;

export const DayText = styled.Text`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_700Bold';
  color: #fff;
`;

export const ContainerButton = styled.View`
  margin-top: 320;
  margin-left: 24;
  margin-right: 24;
  margin-bottom: 28.1;
`;
