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

export const Title = styled.Text`
  font-family: 'Lato_700Bold';
  color: #090b0d;
  font-size: 20;
  margin-left: 24;
  margin-top: 24;
  margin-bottom: 16.1;
`;

export const AlignScheduling = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 8;
`;

export const BoxScheduling = styled.View`
  height: 72;
  width: 312;
  border-radius: 8;
  background-color: #d6f4f6;
  margin-bottom: 16;
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

export const NameScheduling = styled.Text`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  margin-left: 16;
`;

export const ButtonStartNow = styled.TouchableOpacity`
  background-color: #2cc7cf;
  width: 128;
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

export const Edit = styled.TouchableOpacity`
  margin-right: 8;
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
