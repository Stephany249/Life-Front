/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface DayWeekContainerProps {
  selected: string;
}

interface DayWeekNameProps {
  selected: string;
}

interface HourContainerProps {
  selected: string;
}

interface HourNameProps {
  selected: string;
}

const handleClassType = (state: string) => {
  switch (state) {
    case 'active':
      return '#7776b6';
    case 'have-value':
      return '#b9b9d9';
    default:
      return '#d6f4f6';
  }
};

const handleColorType = (state: string) => {
  switch (state) {
    case 'active':
    case 'have-value':
      return '#fff';
    default:
      return '#090b0d';
  }
};

export const Container = styled.View`
  flex: 1;
  background: #fff;
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
  line-height: 26;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  margin-top: 24;
  margin-left: 24;
  margin-right: 24;
`;

export const DaysOfWeek = styled.ScrollView`
  margin-top: 8;
  margin-left: 8;
  height: 75;
`;

export const Day = styled(RectButton)<DayWeekContainerProps>`
  height: 32;
  width: 84;
  border-radius: 8;
  align-items: center;
  justify-content: center;
  margin-left: 8;
  background: ${(props) => handleClassType(props.selected)};
`;

export const DayText = styled.Text<DayWeekNameProps>`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  color: ${(props) => handleColorType(props.selected)};
`;

export const SubTitle = styled.Text`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_400Regular';
  color: #090b0d;
  margin-top: 8;
  margin-left: 24;
  margin-right: 272;
`;

export const HourOfDay = styled.ScrollView`
  margin-top: 6;
  margin-left: 8;
  height: 75;
`;

export const Hour = styled(RectButton)<HourContainerProps>`
  height: 32;
  width: 84;
  border-radius: 8;
  align-items: center;
  justify-content: center;
  margin-left: 8;
  background: ${(props) => handleClassType(props.selected)};
`;

export const HourText = styled.Text<HourNameProps>`
  font-size: 16;
  line-height: 20.8;
  font-family: 'Lato_700Bold';
  color: #090b0d;
  color: ${(props) => handleColorType(props.selected)};
`;

export const ContainerButton = styled.View`
  margin-top: 180;
  margin-left: 24;
  margin-right: 24;
  margin-bottom: 28.1;
`;
