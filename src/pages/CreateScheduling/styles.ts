import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Specialists } from './index';

interface HeightAndWidth {
  height: number;
  width: number;
}

interface SpecialistContainerProps {
  selected: boolean;
}

interface SpecialistNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
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

export const SpecialistListContainer = styled.View`
  height: 112;
`;

export const SpecialistList = styled(
  FlatList as new () => FlatList<Specialists>,
)`
  padding-top: 32;
  padding-right: 24;
  padding-left: 24;
  padding-bottom: 32;
`;
export const SpecialistContainer = styled(RectButton)<SpecialistContainerProps>`
  background: ${(props) => (props.selected ? '#7776b6' : '#d6f4f6')};
  flex-direction: row;
  align-items: center;
  padding-top: 8;
  padding-right: 12;
  padding-bottom: 8;
  padding-left: 12;
  margin-right: 16;

  border-radius: 10;
`;

export const SpecialistAvatar = styled.Image`
  width: 32;
  height: 32;
  border-radius: 16;
`;

export const SpecialistName = styled.Text<SpecialistNameProps>`
  margin-left: 8;
  font-family: 'Lato_700Bold';
  font-size: 16;
  color: ${(props) => (props.selected ? '#ffffff' : '#090b0d')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'Lato_700Bold';
  color: #090b0d;
  font-size: 20;
  margin-left: 24;
  margin-top: 24;
  margin-bottom: 8;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46;
  width: 312;
  background: #b9b9d9;
  border-radius: 10;
  align-items: center;
  justify-content: center;
  margin-left: 24;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'Lato_700Bold';
  font-size: 16;
  color: #232129;
`;

export const Schedule = styled.View`
  padding-top: 24;
  padding-bottom: 16;
`;

export const Section = styled.View`
  margin-bottom: 24;
`;

export const SectionTitle = styled.Text`
  font-size: 16;
  color: #090b0d;
  font-family: 'Lato_400Regular';
  margin-top: 8;
  margin-left: 24;
  margin-bottom: 8;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding-top: 12;
  padding-left: 12;
  padding-bottom: 12;
  padding-right: 12;
  background: ${(props) => (props.selected ? '#7776b6' : ' #d6f4f6')};
  border-radius: 10;
  margin-right: 8;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#ffffff' : '#090b0d')};
  font-family: 'Lato_700Bold';
  font-size: 16;
`;

export const CreateSchedulingButton = styled.View`
  align-items: center;
  justify-content: center;
`;
