import styled from 'styled-components/native';

export const Content = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.View`
  flex:1;
  height: 300;
  width: 360;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
  margin-top: 250;
`;

export const HeaderTable = styled.View`
  padding-top: 16;
  padding-right: 16;
  padding-left: 16;
  padding-bottom: 16;
  background: #fff;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height:26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

export const TitleNotScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  padding-top: 8;
  padding-left: 16;
`;

export const AlignScheduling = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 8;
`;

export const BoxScheduling = styled.View`
  height: 72;
  width: 312;
  border-radius: 8;
  background-color: #d6f4f6;
  margin-top: 16;
`;

export const Calendar = styled.View`
  flex-direction: row;
  padding-top: 16;
  padding-right: 280;
  padding-left: 16;
  padding-bottom: 8;
`;

export const DateScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
`;

export const Clock = styled.View`
  flex-direction: row;
  padding-top: 16;
  padding-right: 160;
  padding-left: 136;
  padding-bottom: 8;
`;

export const Edit = styled.View`
  padding-top: 8;
  padding-right: 8;
  padding-left: 288;
  padding-bottom: 50;
`;

export const AlingButton = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 16;
`;

export const ButtonHelpFriend = styled.View`
  height: 136;
  width: 144;
  border-radius: 8;
  background-color: #7776b6;
  margin-right: 16; 
`;

export const TextHelp = styled.Text`
  font-size: 16;
  line-height:20.8;
  font-family: 'Lato_400Regular';
  color: #fff;
  padding-top: 80;
  padding-right: 40;
  padding-left: 8;
  padding-bottom: 8;
`;

export const ButtonHelpMe = styled.View`
  height: 136;
  width: 144;
  border-radius: 8;
  background-color: #7776b6;
`;

export const ContainerImage = styled.View`
  flex:1;
  height: 74;
  width: 144;
  flex-direction: row-reverse;
`;

export const TextMoreScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #fa7592;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 16;
  padding-bottom: 16;
  padding-right: 16;
  padding-left: 280;
  `;
