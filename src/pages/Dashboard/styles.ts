import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Content = styled.ScrollView`
`;


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

export const Container = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const TableClient = styled.View`
  flex:1;
  height: 410;
  width: 360;
  border-top-left-radius: 24;
  border-top-right-radius: 24;
  background-color: #ffff;
  margin-top: 250;
`;

export const Table = styled.View`
  flex:1;
  height: 390;
  width: 360;
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
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TopBoxScheduling = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8;
`;

export const BottomBoxScheduling = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 16;
  margin-bottom: 8;
`;

export const Title = styled.Text`
  font-size: 20;
  line-height:26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
`;

export const NameScheduling = styled.Text`
  font-size: 16;
  line-height:20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  margin-left: 16;
`;

export const TitleNotScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  padding-top: 28;
  padding-left: 30;
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
  margin-left: 16;
  flex-direction: row;
`;

export const DateScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  margin-left: 8;
  width: 75;
`;

export const Clock = styled.View`
  margin-left: 16;
  flex-direction: row;

`;

export const HourScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  margin-left: 8;
  width: 70;
`;

export const Clipboard = styled.TouchableOpacity`
  flex-direction: row;
`;

export const ClipboardScheduling = styled.Text`
  font-size: 14;
  line-height: 18.2;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  margin-left: 8;
  width: 80;
  text-decoration: underline;
`;

export const Edit = styled.TouchableOpacity`
  margin-right: 8;
`;

export const AlingButton = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 16;
`;

export const ButtonHelpFriend = styled.TouchableOpacity`
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

export const ButtonHelpMe = styled.TouchableOpacity`
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

export const TextMoreSchedulingButton = styled.TouchableOpacity``;

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


export const ButtonStartNow = styled.TouchableOpacity`
  background-color: #2cc7cf;
  width:128;
  height: 40;
  border-radius: 8;
  justify-content: center;
  align-items: center;
  margin-top: -8;
`;

export const TextStartNow = styled.Text`
  color: #fefefe;
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_700Bold';
`;

export const CalendarView = styled.View`
  margin-top: 120;
  justify-content: center;
  align-items: center;
  margin-bottom: 120;
`;

export const OpenDatePickerButton = styled(RectButton)`
  margin-top: 25;
  height: 50;
  width: 200;
  background: #b9b9d1;
  border-radius: 8;
  align-items: center;
  justify-content: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'Lato_700Bold';
  font-size: 16px;
  color: #090b0d;
`;
